FROM python:3.12-slim

WORKDIR /app

# Install git and curl
RUN apt-get update && apt-get install -y git curl

# Install uv
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

# Copy project files
COPY pyproject.toml .
COPY middleware.py .

# Install dependencies using uv
RUN uv pip install git+https://github.com/tradingbootcamp/platform.git#subdirectory=python-client
RUN uv pip sync

# Run using gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "middleware:app"]