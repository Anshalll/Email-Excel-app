from flask import Flask, jsonify , request
import app
serverapp = Flask(__name__)



@serverapp.route('/' , methods=['GET'])
def Index():
    
    if(request.method == "GET"):

        data = app.main()
   
        return jsonify({ 'data': data})



serverapp.run(debug=True)
