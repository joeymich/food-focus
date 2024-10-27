FROM node:18

WORKDIR /frontend

COPY frontend/package.json .
COPY frontend/package-lock.json .

RUN npm install

COPY frontend .