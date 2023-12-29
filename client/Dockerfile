FROM node:20.10.0-alpine as base

WORKDIR /app/client

ARG REACT_APP_SERVER_URL
ARG REACT_APP_CONNECTION_TEST_INTERVAL
ARG PORT

ENV REACT_APP_SERVER_URL=$REACT_APP_SERVER_URL
ENV REACT_APP_CONNECTION_TEST_INTERVAL=$REACT_APP_CONNECTION_TEST_INTERVAL
ENV PORT=$PORT

COPY patches /app/client/patches

COPY package.json yarn.lock /app/client/

RUN yarn install

COPY . /app/client

FROM base as development
CMD ["yarn", "start"]

FROM base as production
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-s", "build"]