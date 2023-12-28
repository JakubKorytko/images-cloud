FROM node:20.10.0-alpine as base

WORKDIR /app/client

COPY package.json /app/client

COPY yarn.lock /app/client

COPY ./patches /app/client/patches

RUN yarn install

COPY . /app/client

# just to make sure that the linebreaks are correct
RUN yarn add --dev eslint-filtered-fix
RUN yarn eslint-filtered-fix src --ext .js,.jsx,.ts,.tsx --rule linebreak-style

FROM base as development
CMD ["yarn", "start"]

FROM base as production
RUN yarn build
RUN yarn global add serve
CMD ["serve", "-s", "build"]