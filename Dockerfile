FROM node:8-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY test /usr/src/app/test

RUN npm install
