from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS
import logging

app = Flask(__name__) # create a Flask app; __name__: Refers to the current Python module. Flask uses this to determine the root path of your application.

CORS(app)
logging.basicConfig(level=logging.INFO)

model = joblib.load('./models/creditcard_model.pkl')
scaler = joblib.load('./models/scaler.pkl')

@app.before_request
def log_request_info():
    logging.info(f"Request: {request.method} {request.url} -Data {request.json}") # log request method, url and data


@app.route('/predict', methods=['POST']) # create a route for the endpoint /predict which handles POST requests
def predict():
    try:
        data = request.get_json() # receive json data from the request
        df = pd.DataFrame([data])# convert json to dataframe for model input; input format for most ML models
       
        # Scale the Amount column
        df[['scaled_amount', 'scaled_accountAge']] = scaler.transform(df[['Amount', 'accountAge']])
        df.drop(['Amount', 'accountAge'], axis=1, inplace=True)  # Drop the original Amount column
           
        prediction = model.predict(df)[0] # make prediction
        return jsonify({'prediction': int(prediction)}) # return prediction as json

    except Exception as e:
        logging.error(f"Error logging: {str(e)}")
        return jsonify({'Error in flask': str(e)}), 400

@app.errorhandler(500)
def internal_error(e):
    return jsonify({'error': 'An internal server error occurred'}), 500

if __name__ == '__main__':
    app.run(port=8000, debug=True)