STEPS IN TRAINING THE MODEL

0. Create a virtual environment either with conda or venv. 

1. First load the creditcard.csv dataset. This is a dataset showing if a tranasaction was fradualent or not. Class 0 is not fraud and Class 1 is Fraud. The dataset is highly inbalanced since in real life, most transactions are non fradualent. Most of the columns represent the principle component of the dataset to hide the actual sensitive information

2. Print out some basic information about the dataset to get a better understanding with what you are working with. I printed out the class counts to see that the majority of the data belongs to class 0 (non-fraud).

3. Check for missing values just in case. Then drop the missing values or handle another way.

4. (Optional) Visualize the data

5. Standardize the data since it is inbalanced. Created a new column in the dataset for the scaled amount then dropped the original amount.

6. Split the data into training and testing

7. Train a logistic regression model for a simple baseline model. This model outputs probabilites between 0 and 1 so it makes it easy to classify

8. Evaluate the model with accuracy, confusion matrix and classification report. Logistic Regression had an accuracy of 96.3%.

9. Train a Random Forest model to capture mode complex patterns in the data. Handles larger datasets, feature complexity, and imbalanced data better.

10. Evaluate the model with accuracy, confusion matrix and classification report. Random Forest had an accuracy of 99.9%.

11. Save the model for future use in other parts of the project

NOTES
* When inputting data into the model from frontend/backend, inputs have to match the features of the dataset (Time, V1-28, Amount). When amount is inputted it gets changed to scaled amount