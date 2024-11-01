from flask import Flask, jsonify , request
import app
import json
import uploadtoexcel 
from flask_cors import CORS
serverapp = Flask(__name__)


CORS(serverapp)
@serverapp.route('/', methods=['GET'])
def Index():
    if request.method == "GET":
        data = app.main()
        load_exceldata = None
        unmatched = []

        exceldata = uploadtoexcel.GetExceldata()

        if exceldata:
            load_exceldata = json.loads(exceldata)

      
        def remove_key(d, key="Messageid"):
            return {k: v for k, v in d.items() if k != key}

        if load_exceldata and len(load_exceldata) > 0:
            for i in load_exceldata:
                
                match_found = False

                for vals in data:

                    vals_filtered = remove_key(vals)  
                    
                 
                    if json.dumps(vals_filtered) != json.dumps(i):
                        unmatched.append(vals)
        
        # Fixing bug with multiple data append in unmatched array

            return jsonify({'data': unmatched, 'exceldata': exceldata})
        else:
            return jsonify({'data': data, 'exceldata': []})


                




@serverapp.route('/uploadexcel' , methods=['POST'])
def Uploadtoexcel():
    
    if(request.method == "POST"): 
        try: 
            rcvd_data = json.loads(request.data)  
            uploadtoexcel.UploadtoExcel(rcvd_data['data'])
                                    
            return jsonify({ "msg": "Data updated!" })
        except Exception as e:
            return jsonify({ 'error': e })

serverapp.run(debug=True)



