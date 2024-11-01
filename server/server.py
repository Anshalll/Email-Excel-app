from flask import Flask, jsonify , request
import app
from flask_cors import CORS
serverapp = Flask(__name__)


CORS(serverapp)

@serverapp.route('/' , methods=['GET'])
def Index():

    if(request.method == "GET"):

        data = app.main()
   
        return jsonify({ 'data': data})



@serverapp.route('/uploadexcel' , methods=['POST'])
def Uploadtoexcel():
    if(request.method == "POST"): 
        print(request.data)    
        return jsonify({ "msg": "Data updated!" })

serverapp.run(debug=True)
