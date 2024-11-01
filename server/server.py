from flask import Flask, jsonify , request
import app
import json
import uploadtoexcel
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

        rcvd_data = json.loads(request.data)  
        uploadtoexcel.UploadtoExcel(rcvd_data['data'])
                                
        return jsonify({ "msg": "Data updated!" })

serverapp.run(debug=True)
