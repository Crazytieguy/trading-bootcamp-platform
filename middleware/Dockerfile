FROM python:3.12-slim

WORKDIR /app

# Install git and curl
RUN apt-get update && apt-get install -y git

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install -r requirements.txt

# Install the python-client package directly from GitHub
RUN pip install git+https://github.com/tradingbootcamp/platform.git#subdirectory=python-client

# Copy project files
COPY pyproject.toml .
COPY middleware.py .

# Run using gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "middleware:app"]