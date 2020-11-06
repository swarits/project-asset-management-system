from flask import Flask, request, Response
from pymongo import MongoClient

import json

app = Flask(__name__)

#mongodb connection properties
db_username = 'admin'
db_password = 'IsHBtWZl5N6EcWFu'
url = f'mongodb+srv://{db_username}:{db_password}@cluster0-dezor.mongodb.net/test?retryWrites=true&w=majority'
client = MongoClient(url)
db = client.ams_db

@app.route('/ams/signup', methods=['POST'])
def add_user():
    """add a new user"""
    req_data = request.get_json(force=True)
    print(req_data)
    data = {
        'email': req_data.get('email'),
        'firstname': req_data.get('firstname'),
        'lastname': req_data.get('lastname'),
        'password': req_data.get('user_password')
    }

    resp_data = {}
    if db.users.count_documents({'email': req_data.get('email')}) == 0:
        result = db.users.insert_one(data)
        if result.acknowledged:
            resp_data = {'message': 'User Signed up'}
        else:
            resp_data = {'message': 'Error Occurred adding user to database'}
    else:
        resp_data = {'message': 'User exists with given email'}

    response = Response(
        mimetype="application/json",
        response=json.dumps(resp_data),
        status=200
    )
    return response

@app.route('/ams/login', methods=['POST'])
def login():
    """login new user"""
    req_data = request.get_json(force=True)
    print(req_data)
    data = {
        'email': req_data.get('email'),
        'password': req_data.get('user_password')
    }

    resp_data = {}
    if db.users.count_documents({'email': req_data.get('email')}) == 0:
        resp_data = {'message': 'User doesn\'t exist, Please SignUp to continue..'}
    elif db.users.count_documents({'email': req_data.get('email'), 'password': req_data.get('user_password')}) >= 1:
        resp_data = {'message': 'Logged in successfully'}
    else:
        resp_data = {'message': 'Password Incorrect!, Please try again'}

    response = Response(
        mimetype="application/json",
        response=json.dumps(resp_data),
        status=200
    )
    return response

if __name__=='__main__':
    app.run()
