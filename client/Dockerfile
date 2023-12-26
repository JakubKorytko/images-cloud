FROM node:20.10.0-alpine as base

WORKDIR /app/client

COPY package.json /app/client

COPY yarn.lock /app/client

COPY ./patches /app/client/patches

RUN yarn install

COPY . /app/client

FROM base as development
CMD ["yarn", "start"]

FROM base as production
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-s", "build"]