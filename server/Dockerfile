FROM node:20.10.0-alpine as base

WORKDIR /app/server

ARG PORT
ARG SERVER_URL
ARG APP_SECRET
ARG JWT_EXPIRATION

ENV PORT=$PORT
ENV SERVER_URL=$SERVER_URL
ENV APP_SECRET=$APP_SECRET
ENV JWT_EXPIRATION=$JWT_EXPIRATION

COPY package.json yarn.lock /app/server/

RUN yarn install

COPY . /app/server

FROM base as development
ENV NODE_ENV=development
CMD ["yarn", "dev"]

FROM base as production
RUN yarn build
ENV NODE_ENV=production
CMD ["yarn", "start"]