FROM node:20.10.0-alpine as base

WORKDIR /app/server

COPY package.json /app/server

COPY yarn.lock /app/server

RUN yarn install

COPY . /app/server

# just to make sure that the linebreaks are correct
RUN yarn add --dev eslint-filtered-fix
RUN yarn eslint-filtered-fix src --ext .js,.jsx,.ts,.tsx --rule linebreak-style
RUN yarn eslint-filtered-fix test --ext .js,.jsx,.ts,.tsx --rule linebreak-style

FROM base as development
ENV NODE_ENV=development
CMD ["yarn", "dev"]

FROM base as production
RUN yarn build
ENV NODE_ENV=production
CMD ["yarn", "start"]