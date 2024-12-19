from flask import Flask, request, jsonify, render_template
from web3 import Web3
import os

app = Flask(__name__)

# Ethereum Blockchain bağlantısı
INFURA_URL = os.getenv("INFURA_URL")  # Infura veya benzeri bir hizmet URL'si
web3 = Web3(Web3.HTTPProvider(INFURA_URL))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/swap', methods=['POST'])
def swap():
    data = request.json
    send_token = data.get('send_token')
    get_token = data.get('get_token')
    amount = data.get('amount')
    slippage = data.get('slippage')
    
    if not (send_token and get_token and amount):
        return jsonify({'error': 'Eksik bilgiler'}), 400
    
    try:
        # Örnek işlem detayları
        tx = {
            "from": web3.eth.default_account,
            "to": send_token['contract'],  # Bu kontrat adresi
            "value": web3.toWei(amount, 'ether'),  # Gönderilecek miktar
            "gas": 2000000,  # Tahmini Gas
            "gasPrice": web3.toWei('50', 'gwei')  # Gas Fiyatı
        }
        
        # İşlemi imzalama ve gönderme (sadece örnek)
        signed_tx = web3.eth.account.signTransaction(tx, private_key=os.getenv('PRIVATE_KEY'))
        tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
        
        return jsonify({'tx_hash': tx_hash.hex()}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
