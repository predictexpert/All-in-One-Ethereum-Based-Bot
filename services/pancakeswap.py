import requests
import json
import os

local_storage_file = "token_database.json"
token_database_key = "tokenDatabaseKey13"

def fetch_token_details(contract):
    data = get_token_database()
    token_data = next((token for token in data if token.get("contract") == contract), None)

    if token_data:
        return token_data

    try:
        url = f"https://api.pancakeswap.info/api/v2/tokens/{contract}"
        response = requests.get(url)
        response.raise_for_status()
        result = response.json()
        token_data = result.get("data", {})
        token_data["contract"] = contract
        data.append(token_data)
        update_token_database(data)
        return token_data
    except requests.exceptions.RequestException as e:
        raise RuntimeError("Failed to get token details") from e

def find_token_by_symbol(symbol):
    data = get_token_database()
    return next((token for token in data if token.get("symbol") == symbol), None)

def find_token_by_name(name):
    data = get_token_database()
    return next((token for token in data if token.get("name") == name), None)

def find_token_by_name_or_symbol(search_key):
    data = get_token_database()
    return next((token for token in data if token.get("name") == search_key or token.get("symbol") == search_key), None)

def find_token_by_address(address):
    data = get_token_database()
    return next((token for token in data if token.get("contract") == address), None)

def get_token_database():
    if not os.path.exists(local_storage_file):
        return []
    with open(local_storage_file, "r") as file:
        return json.load(file).get(token_database_key, [])

def update_token_database(new_database):
    with open(local_storage_file, "w") as file:
        json.dump({token_database_key: new_database}, file, indent=4)
