FROM --platform=$TARGETPLATFORM python:3.11.6-slim

COPY ./api /code/api
COPY ./.env /code

WORKDIR /code

COPY ./requirements.txt requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]