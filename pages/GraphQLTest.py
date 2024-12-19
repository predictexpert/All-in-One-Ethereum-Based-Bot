from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

GRAPHQL_API_URL = "https://rickandmortyapi.com/graphql"

def use_characters():
    query = """
    query {
      characters(page: 1) {
        results {
          id
          name
          status
          species
          gender
          image
        }
      }
    }
    """
    try:
        response = requests.post(GRAPHQL_API_URL, json={"query": query})
        response.raise_for_status()
        return response.json().get("data", {}).get("characters", {}).get("results", [])
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

@app.route("/")
def graphql_test():
    characters = use_characters()
    if "error" in characters:
        return jsonify({"error": "Something went wrong, please try again..."})
    return jsonify({"characters": characters})

@app.route("/character/<id>")
def character_detail(id):
    query = f"""
    query {{
      character(id: "{id}") {{
        id
        name
        status
        species
        gender
        image
        episode {{
          name
        }}
      }}
    }}
    """
    try:
        response = requests.post(GRAPHQL_API_URL, json={"query": query})
        response.raise_for_status()
        character = response.json().get("data", {}).get("character", {})
        if not character:
            return jsonify({"error": "Character not found"}), 404
        return jsonify(character)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
