from flask import Flask, render_template
from flask_graphql import GraphQLView
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Simulate Blockchain, Erc20, and Uniswap contexts
class BlockchainContext:
    def __init__(self):
        self.name = "Blockchain Context Initialized"

class Erc20Context:
    def __init__(self):
        self.name = "ERC20 Context Initialized"

class UniswapContext:
    def __init__(self):
        self.name = "Uniswap Context Initialized"

blockchain_context = BlockchainContext()
erc20_context = Erc20Context()
uniswap_context = UniswapContext()

# GraphQL example query (using Rick and Morty API as a placeholder)
GRAPHQL_API_URL = "https://rickandmortyapi.com/graphql"

@app.route("/")
def home():
    return "Welcome to the Flask App"

@app.route("/graphql_query")
def graphql_query():
    query = """
    query {
      characters(page: 1) {
        results {
          id
          name
          status
        }
      }
    }
    """
    response = requests.post(
        GRAPHQL_API_URL, json={"query": query}
    )
    return response.json()

@app.route("/contexts")
def contexts():
    return {
        "blockchain_context": blockchain_context.name,
        "erc20_context": erc20_context.name,
        "uniswap_context": uniswap_context.name,
    }

if __name__ == "__main__":
    app.run(debug=True)
