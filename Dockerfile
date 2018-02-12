FROM node:8-alpine

WORKDIR /usr/src/app

COPY package.json clear_users.js fetch_users.js clear_users.js ./

RUN npm install
