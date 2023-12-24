FROM node:20.10.0-alpine

WORKDIR /app/client

COPY package*.json /app/client

COPY ./patches /app/client/patches

RUN yarn install

COPY . /app/client

CMD ["yarn start"]
