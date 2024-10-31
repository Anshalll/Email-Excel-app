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



serverapp.run(debug=True)
