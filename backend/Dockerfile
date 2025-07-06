# Use Python 3.13 base image
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Environment variables to make Python nicer
ENV PYTHONDONTWRITEBYTECODE=1 \
  PYTHONUNBUFFERED=1

# Install build tools only if you need (sqlite is already supported)
RUN apt-get update && apt-get install -y build-essential \
  && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy app source code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]