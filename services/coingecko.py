import requests

def fetch_contract_details(contract, id='binance-smart-chain'):
    try:
        url = f"https://api.coingecko.com/api/v3/coins/{id}/contract/{contract}"
        response = requests.get(url)
        response.raise_for_status()  # Raise HTTPError for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        raise RuntimeError("Unable to get token details") from e
