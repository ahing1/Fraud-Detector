from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__) # create a Flask app; __name__: Refers to the current Python module. Flask uses this to determine the root path of your application.

model = joblib.load('./models/creditcard_model.pkl')
print("Loaded model type:", type(model))

@app.route('/predict', methods=['POST']) # create a route for the endpoint /predict which handles POST requests
def predict():
    try:
        data = request.get_json() # receive json data from the request
        df = pd.DataFrame(data, index=[0]) # convert json to dataframe for model input; input format for most ML models
        prediction = model.predict(df)[0] # make prediction
        return jsonify({'prediction': int(prediction)}) # return prediction as json

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=8000, debug=True)