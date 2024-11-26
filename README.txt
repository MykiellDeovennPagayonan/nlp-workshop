# Natural Language Processing (NLP) Workshop
## Getting Started
Make sure to carefully follow the steps below in order!

## Setting up the Python Virtual Environment

1. **Create a virtual environment**:
	Run the following command to create a Python virtual environment:

	```bash
	python -m venv .venv
	```

2. **Activate the virtual environment**:
	- For Windows:
	```bash
	.\.venv\Scripts\activate
	```
	- For Mac:
	 ```bash
	source .venv/bin/activate
	 ```

3. **Install Python dependencies**:
	Use pip to install the required dependencies:
 ```bash
pip install -r requirements.txt
 ```

## Setting up the NextJS Frontend

1. **Change directory to client**:
	Run the following command to change directory:

	```bash
	cd client
	```

2. **Install the dependencies**:
	```bash
	npm install
	```

## Running the Application

1. **Run the server**:
	Run the following command to run the python server:

	```bash
	cd server
	python server.py
	```

2. **Run the client**:
	Open a new terminal and run the following command to run the NextJS frontend:
	```bash
	cd client
	npm run dev
	```