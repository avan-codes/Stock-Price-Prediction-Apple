# 📈 Apple Stock Price Prediction — Stock Sight

A full-stack Machine Learning web application that predicts future Apple stock prices using deep learning models and provides an interactive UI for visualization.

This project combines **Machine Learning, FastAPI backend, and a modern React frontend** to create an end-to-end stock prediction system.

The model analyzes historical stock data and predicts future trends based on the last 100 closing prices.

---

# Deployment

Frontend => https://stock-sight-main.vercel.app/

Backend => https://prediction-of-stocks-app-latest.onrender.com/

Backend Documentation => https://prediction-of-stocks-app-latest.onrender.com/docs

Docker Image of Backend (Used for Deployment) => https://hub.docker.com/repository/docker/avanxploit/prediction-of-stocks-app


# Dataset

Download => http://rudra-xploits.netlify.app/files/apple_stocks.csv




# 🚀 Demo

🎥 Project Demo Video  

<video controls src="https://github.com/avan-codes/Stock-Price-Prediction-Apple/blob/main/demo/Project%20Presentation.mp4" title="──"></video>



Demo Video Link 
(https://rudra-xploits.netlify.app/trash_but_imp/Project_Presentation.mp4)


---

# 🧠 Problem Statement

Stock markets are highly dynamic and difficult to predict.

This project attempts to solve the problem by:

• Training a deep learning model on historical Apple stock data  
• Using time-series forecasting techniques  
• Providing a web interface where users can request predictions

The system takes the **last 100 closing prices** and predicts **future stock values**.

---

# 🏗️ System Architecture

```
User → React Frontend → FastAPI Backend → ML Model → Prediction → Visualization
```

### Workflow

1. User enters number of days to predict
2. React frontend sends request to FastAPI API
3. FastAPI loads trained model
4. Model processes last 100 closing prices
5. Prediction is generated
6. Results returned as JSON + Plot

---

# 🛠️ Tech Stack

### Frontend
- React
- Vite
- TailwindCSS

### Backend
- FastAPI
- Python

### Machine Learning (Deep Learning)
- TensorFlow / Keras
- Scikit-learn
- Pandas
- NumPy
- Matplotlib

---



# 📂 Project Structure

```
Apple Stock Prediction
│
├── backend
│   ├── API
│   │   ├── models
│   │   │   ├── my_model.keras
│   │   │   └── scaler.pkl
│   │   ├── main.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│
├── datasets
│   └── apple_stocks.csv
│
├── training_notebook
│   └── model_building.ipynb
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PredictionChart.jsx
│   │   │   ├── RequestSender.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

# 📊 Deep Learning Model

The model is trained using **historical Apple stock closing prices**.

### Key Steps

1. Data preprocessing
2. Feature scaling
3. Creating time-series sequences
4. Training deep learning model
5. Saving model and scaler
6. Deploying model via API

### Input

```
Last 100 closing prices
```

### Output

```
Predicted future stock values
```

---

# ⚙️ API Endpoint

### POST /predict

Predict future stock prices.

### Request Example

```json
{
  "last_100": [132.045,130.28,...........,131.78,130.28],
  "days": 10
}
```

### Response

```json
{
  "prediction": [134.2,135.1,136.4],
  "plot": "base64-image "
}
```

---

# 🖥️ Running Locally

### Clone Repository

```
git clone https://github.com/avan-codes/Stock-Price-Prediction-Apple
```

---

### Backend Setup

```
cd backend/API

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

### Frontend Setup

```
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📈 Features

✔ Deep Learning based stock prediction  
✔ FastAPI high performance backend  
✔ Interactive React dashboard  
✔ Prediction visualization chart  
✔ REST API architecture  

---

# 👨‍💻 Author

Pranjal Saini

Machine Learning Enthusiast | Machine Learning | Deep Learning | Python | AI Learner

---

# ⭐ If you like this project

Give the repository a star on GitHub ⭐