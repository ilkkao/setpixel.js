FROM node:9

MAINTAINER Ilkka Oksanen <iao@iki.fi>

COPY package.json yarn.lock /app/

WORKDIR /app/

RUN yarn

COPY server.js /app/

WORKDIR /app/

CMD node server.js
