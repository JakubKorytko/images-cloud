FROM node:20.10.0-alpine

WORKDIR /app/server

COPY package*.json /app/server

RUN yarn install

COPY . /app/server

CMD ["yarn dev"]
