# Natural Language Processing (NLP) Workshop

## Getting Started
Make sure to follow the steps below in order!

### 1. **Setting up the NextJS Frontend**

1. **Install Client Dependencies**:
    - Change directory to the `client` folder:
      ```bash
      cd client
      ```

    - Install the required npm dependencies:
      ```bash
      npm install
      ```

### 2. **Setting up the Machine Learning Models**

To use the machine learning models for email spam detection and sentiment analysis, follow these steps:

1. **Download the Models**:
    - **Email Spam Detection**: Open the following link in Google Colab to train and download the spam detection model:
      [Email Spam Detection Model](https://colab.research.google.com/drive/1Cef0vHQDONMYaXG_-JGkTh2ujGi097CJ?usp=sharing)
    
    - **Sentiment Analysis**: Open the following link in Google Colab to train and download the sentiment analysis model:
      [Sentiment Analysis Model](https://colab.research.google.com/drive/1OBQA4g4VgMzBdyVaorRn1ATfyrCm9T6z?usp=sharing)

2. **Save the Models**:
    - After training, download the models from Colab and move them to the `server/models` directory.

### 3. **Setting up the Python Virtual Environment**

1. **Create a virtual environment**:
    Run the following command to create a Python virtual environment:
    ```bash
    python -m venv .venv
    ```

2. **Activate the virtual environment**:
    - For **Windows**:
      ```bash
      .\.venv\Scripts\activate
      ```
    - For **Mac**:
      ```bash
      source .venv/bin/activate
      ```

3. **Install the Python dependencies**:
    Use `pip` to install the required dependencies from `requirements.txt`:
    ```bash
    pip install -r requirements.txt
    ```

### 4. **Running the Application**

1. **Start the Python server**:
    Run the following command to start the Python server:
    ```bash
    python server/server.py
    ```

2. **Run the NextJS Client**:
    - Open a new terminal and change directory to the `client` folder:
      ```bash
      cd client
      ```

    - Run the NextJS frontend:
      ```bash
      npm run dev
      ```

---

Follow these steps carefully, and you'll have the application running with both the Python backend and the NextJS frontend. Happy coding!