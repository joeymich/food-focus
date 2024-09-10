FROM python:3.12.4-bookworm

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Requirements are installed here to ensure they will be cached.
RUN pip install --upgrade pip

COPY backend/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

COPY compose/dev/backend/start.sh /start.sh
RUN sed -i 's/\r$//g' /start.sh
RUN chmod +x /start.sh

WORKDIR /app
