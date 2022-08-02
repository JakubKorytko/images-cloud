FROM node:16.16.0-alpine

WORKDIR /app/server

COPY package*.json /app/server

RUN npm install

COPY . /app/server

CMD ["npm run dev"]