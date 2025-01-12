# Use Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt /app/

RUN apt-get update && apt-get install -y libpq-dev build-essential

RUN pip install --no-cache-dir -r requirements.txt

# Copy all ML model files
COPY . .

# Expose Flask port
EXPOSE 8000

# Start Flask server
CMD ["python", "app.py"]
