FROM python:3.7-alpine
COPY ../dapi /app
WORKDIR /app
RUN pip install .
CMD ["python", "manage.py", "runserver"]