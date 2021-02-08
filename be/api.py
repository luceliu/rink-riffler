import flask
import json
from flask import request, jsonify
import efun
import persist
import sys


app = flask.Flask(__name__)

#Local Testing Code
#app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "<h1>Rink-Riffler</h1><p>Let's Riffle!</p>"

@app.route('/LoadAllBookings', methods=['GET'])
def loadAll():
    bookings = efun.getAllBookings()
    return json.dumps([booking.__dict__ for booking in bookings])

@app.route('/LoadRinks', methods=['GET'])
def loadRinks():
    rinks = persist.getRinks()
    response = jsonify([rink.__dict__ for rink in rinks]);
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/LoadBookings', methods=['GET', 'POST'])
def loadByFacility():
    print("GOT REQUEST")
    response = jsonify()
    response.headers.add("Access-Control-Allow-Origin", "*")
    if request.method == 'GET':
        if 'id' in request.args:
            complexId = int(request.args['id'])
        else:
            return "Error: No id field provided. Please specify an id.", 400
        bookings = persist.getBookings([complexId], None, None, None, None)
        response.set_data(json.dumps([booking.__dict__ for booking in bookings]))
        return response
    if request.method == 'POST':
        requestData = request.form
        rinks = json.loads(requestData.get('ids')) #List of IDs for rinks
        days = json.loads(requestData.get('days')) #Days of the week
        startTime = requestData.get('startTime')
        endTime = requestData.get('endTime')
        minSpots = json.loads(requestData.get('minSpots'))

        if rinks and len(rinks) > 0:
            bookings = persist.getBookings(rinks, days, startTime, endTime, minSpots)
            response.set_data(json.dumps([booking.__dict__ for booking in bookings]))
            return response
        else:
            return "Error: must specify at least one rink.", 400
if __name__ == '__main__':
    app.run(threaded=True, port=5000)
