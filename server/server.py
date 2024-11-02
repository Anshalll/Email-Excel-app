from flask import Flask, jsonify , request
import sendmaindata
import json
import uploadtoexcel 
from flask_cors import CORS
serverapp = Flask(__name__)


CORS(serverapp)
@serverapp.route('/', methods=['POST'])
def Index():
    try: 
        if request.method == "POST":
            limit = json.loads(request.data)
            data = sendmaindata.funcsendmaindata(limit)
            return jsonify(data)
    except Exception as e:
        return jsonify({ "error": e })
       


@serverapp.route('/uploadexcel' , methods=['POST'])
def Uploadtoexcel():
    
    if(request.method == "POST"): 
        try: 
            rcvd_data = json.loads(request.data)  
            uploadtoexcel.UploadtoExcel(rcvd_data['data'])
                                    
            data = sendmaindata.funcsendmaindata(rcvd_data['limit'])
            return jsonify(data)
        except Exception as e:
            return jsonify({ 'error': e })

serverapp.run(debug=True)



