## Multi-stage build so that NPM_TOKEN doesn't get stored in image build history!

# First stage
FROM node:12-alpine AS build

ARG NPM_TOKEN

WORKDIR /usr/src/app
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc
COPY package.json .
RUN npm install --production
RUN rm -f .npmrc
COPY . .

# Second stage
FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app /usr/src/app

EXPOSE 50025
CMD [ "npm", "start" ]


