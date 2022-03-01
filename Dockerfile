FROM python:3.9

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt --no-cache-dir

# Only copy what is needed for Django to work
#COPY apps /app/apps
COPY diabetes /app/diabetes
COPY manage.py /app/manage.py

WORKDIR /app