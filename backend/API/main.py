from tensorflow.keras.models import load_model
from pydantic import BaseModel, Field, validator
from fastapi import FastAPI, HTTPException, Query
from typing import List, Optional
import numpy as np
import joblib
import matplotlib.pyplot as plt
import io
import base64
import tensorflow as tf



model = tf.keras.models.load_model(r'./models/my_model.keras')
scaler = joblib.load(r"./models/scaler.pkl")

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
    "http://localhost:3000", 
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",     
    allow_credentials=True,
    allow_methods=["*"],       
    allow_headers=["*"],     
)
class Data(BaseModel):
    last_100: List[float] = Field(..., description="Last 100 closing prices of the stock")
    n_days: int = Field(30, description="Number of future days to predict", ge=1, le=180)

    @validator("last_100")
    def check_length(cls, v):
        if len(v) < 100:
            raise ValueError(f"Need minimum 100 values")
        return v[-100:] 


class prediction_output(BaseModel):
    predictions: List[float]
    plot: Optional[str] = None 


def predict_future_prices(last_100_prices, n_days):
    # last 100 prices
    last_100 = np.array(last_100_prices[-100:]).reshape(-1, 1)
    scaled_input = scaler.transform(last_100).flatten().tolist()

    predictions = []
    time_step = 100

    for _ in range(n_days):
        x_input = np.array(scaled_input[-time_step:]).reshape(1, time_step, 1)
        yhat = model.predict(x_input, verbose=0)[0, 0]
        scaled_input.append(yhat)
        predictions.append(yhat)

    predictions = np.array(predictions).reshape(-1, 1)
    return scaler.inverse_transform(predictions).flatten().tolist()


def make_prediction_plot(last_100, predictions):
    days_past = np.arange(1, 101)
    days_future = np.arange(101, 101 + len(predictions))

    plt.figure(figsize=(10, 5))
    plt.plot(days_past, last_100, label='Last 100 days (actual)', marker='.')
    plt.plot(days_future, predictions, label=f'Next {len(predictions)} days (predicted)', marker='o', linestyle='--')
    plt.xlabel('Days from now')
    plt.ylabel('Stock Price (USD)')
    plt.title('Stock Price Prediction')
    plt.legend()
    plt.grid(True)

    # Save plot to a bytes buffer
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    plt.close()

    # Encode to base64
    image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    return image_base64


@app.get("/")
def home():
    return {"message": "Stock Price Prediction API is running. visit /docs to get documentation"}


@app.post("/predict", response_model=prediction_output)
def predict(request: Data, return_plot: bool = Query(False, description="Include a base64 plot in the response")):
    try:
        predictions = predict_future_prices(request.last_100, request.n_days)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

    response = {"predictions": predictions}

    if return_plot:
        try:
            plot_b64 = make_prediction_plot(request.last_100, predictions)
            response["plot"] = plot_b64
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Plot generation failed: {str(e)}")

    return response

