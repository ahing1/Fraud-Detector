from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__) # create a Flask app; __name__: Refers to the current Python module. Flask uses this to determine the root path of your application.

CORS(app)

model = joblib.load('./models/creditcard_model.pkl')
scaler = joblib.load('./models/scaler.pkl')

@app.route('/predict', methods=['POST']) # create a route for the endpoint /predict which handles POST requests
def predict():
    try:
        data = request.get_json() # receive json data from the request
        df = pd.DataFrame([data])# convert json to dataframe for model input; input format for most ML models
       
        # Scale the Amount column
        df['scaled_amount'] = scaler.transform(df[['Amount']])
        df.drop('Amount', axis=1, inplace=True)  # Drop the original Amount column
        prediction = model.predict(df)[0] # make prediction
        print("Prediction: ", prediction)
        return jsonify({'prediction': int(prediction)}) # return prediction as json

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(port=8000, debug=True), 500