# Use lightweight Python image
FROM python:3.13-slim

#Preveneting to be created .pyc files 
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /API

# Install system dependencies (needed for numpy, matplotlib, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first (better docker caching)
COPY requirements.txt .

# Install python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# API port
EXPOSE 8000

# Running Application 
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]