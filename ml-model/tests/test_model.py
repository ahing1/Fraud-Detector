import unittest
import pandas as pd
import joblib
import numpy as np

class TestModel(unittest.TestCase):
    
    def setUp(self):
        self.model = joblib.load('../models/creditcard_model.pkl')
        self.scaler = joblib.load('../models/scaler.pkl')
    
    def test_prediction(self):
        sample_data = {
            'Time': 100,
            'V1': -1.3598, 'V2': 1.1919, 'V3': -1.3583, 'V4': -0.0728,
            'V5': 2.5363, 'V6': 1.3781, 'V7': -0.3383, 'V8': 0.4624,
            'V9': 0.2396, 'V10': -0.0987, 'V11': 0.3638, 'V12': 0.09,
            'V13': -0.5516, 'V14': -0.6178, 'V15': -0.9914, 'V16': -0.3112,
            'V17': 1.4682, 'V18': -0.4704, 'V19': 0.2079, 'V20': 0.0258,
            'V21': 0.4036, 'V22': 0.2514, 'V23': -0.0183, 'V24': 0.2778,
            'V25': -0.1104, 'V26': 0.0669, 'V27': 0.128, 'V28': -0.1891,
            'Amount': 100, 'accountAge': 200, 'isVerified': 1
        }
        
        df = pd.DataFrame([sample_data])
        df[['scaled_amount', 'scaled_accountAge']] = self.scaler.transform(df[['Amount', 'accountAge']])
        df.drop(['Amount', 'accountAge'], axis=1, inplace=True)
        
        prediction = self.model.predict(df)[0]
        self.assertIn(prediction, [0, 1])
    

if __name__ == '__main__':
    unittest.main()