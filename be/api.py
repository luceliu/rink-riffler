import flask
import json
from flask import request, jsonify
import efun

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "<h1>Test</h1><p>OK<p>"

@app.route('/LoadAll', methods=['GET'])
def loadAll():
    efun.main()
    return jsonify(ALL_BOOKINGS)

@app.route('/LoadRinks', methods=['GET'])
def loadRinks():
    rinks = efun.getRinkInfo()
    return json.dumps([rink.__dict__ for rink in rinks])

@app.route('/LoadBookings', methods=['GET'])
def loadByFacility():
    if 'id' in request.args:
        complexId = int(request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id."
    bookings = efun.getResultsByComplex(complexId)
    return json.dumps([booking.__dict__ for booking in bookings])


app.run()
