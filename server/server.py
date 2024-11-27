from flask import Flask, request, jsonify
import joblib
import tensorflow as tf
import pandas as pd
from flask_cors import CORS

spam_model = tf.keras.models.load_model('server/models/spam_model.keras')
spam_vectorizer = joblib.load('server/models/tfidf_spam_vectorizer.pkl')

sentiment_model = tf.keras.models.load_model('server/models/sentiment_model.keras')
sentiment_vectorizer = joblib.load('server/models/tfidf_sentiment_vectorizer.pkl')
sentiment_label_encoder = joblib.load('server/models/sentiment_label_encoder.pkl')

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/predict/spam', methods=['POST'])
def predict_spam():
    data = request.get_json()

    text = pd.DataFrame({'text': [data['text']]})
    text['text'] = text['text'].str.lower()

    text_tfidf = spam_vectorizer.transform(text['text']).toarray()
    predictions = spam_model.predict(text_tfidf)
    predicted_value = round(predictions[0][0])
    
    isSpam = "spam" if predicted_value == 1 else "not spam"
    
    print(isSpam)
    
    return jsonify({'isSpam': isSpam})

@app.route('/predict/sentiment', methods=['POST'])
def predict_sentiment():
    data = request.get_json()

    text = pd.DataFrame({'text': [data['text']]})
    text['text'] = text['text'].str.lower()

    text_tfidf = sentiment_vectorizer.transform(text['text']).toarray()
    predictions = sentiment_model.predict(text_tfidf)
    predicted_class = predictions.argmax(axis=1)
    predicted_sentiment = sentiment_label_encoder.inverse_transform(predicted_class)[0]

    return jsonify({'emotion': predicted_sentiment})

if __name__ == '__main__':
    app.run(debug=True)