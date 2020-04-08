## Multi-stage build so that NPM_TOKEN doesn't get stored in image build history!

# First stage
FROM node:12-alpine AS build

WORKDIR /usr/src/app

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc

COPY package.json .
COPY package-lock.json .

# From: https://github.com/nodejs/docker-node/issues/384#issuecomment-305208112
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g && \
  npm install --quiet --production && \
  apk del native-deps

COPY . .
RUN rm -f .npmrc

# Second stage
FROM node:12-alpine

WORKDIR /usr/src/app

# in case we need a shell
RUN apk add --no-cache bash

COPY --from=build /usr/src/app /usr/src/app

EXPOSE 50025
ENTRYPOINT [ "/usr/local/bin/npm", "start" ]


