FROM node:16.16.0-alpine

WORKDIR /app/client

COPY package*.json /app/client

COPY ./patches /app/client/patches

RUN npm install

RUN npm run postinstall

COPY . /app/client

CMD ["npm start"]