FROM node:alpine

WORKDIR /frontend

COPY frontend/package.json .
COPY frontend/package-lock.json .

RUN npm install

COPY frontend .