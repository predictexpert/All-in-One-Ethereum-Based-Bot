from flask import Flask, jsonify, request
import time

app = Flask(__name__)

def use_character(id):
    # Simulating an API call or database query
    characters = {
        "1": {
            "name": "Rick Sanchez",
            "status": "Alive",
            "species": "Human",
            "gender": "Male",
            "created": "2017-11-04T18:50:21.651Z",
            "episode": ["Episode 1", "Episode 2"]
        },
        "2": {
            "name": "Morty Smith",
            "status": "Alive",
            "species": "Human",
            "gender": "Male",
            "created": "2017-11-04T18:50:21.651Z",
            "episode": ["Episode 1", "Episode 3"]
        }
    }
    return characters.get(id, None)

@app.route("/character/<id>")
def character_summary(id):
    data = use_character(id)
    if not data:
        return jsonify({"error": "Error loading the character, retry later."}), 404
    
    response = {
        "character": {
            "id": id,
            "image": data["image"],
            "name": data["name"],
            "status": data["status"],
            "species": data["species"],
            "created": data["created"],
            "gender": data["gender"],
            "episodes": data["episode"]
        },
        "navigation": {
            "back": "/graphql"
        }
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
