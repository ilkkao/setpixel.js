FROM node:9

LABEL maintainer="Ilkka Oksanen <iao@iki.fi>"

COPY package.json yarn.lock /app/
COPY server.js /app/

WORKDIR /app/

RUN yarn
RUN yarn run prod

COPY dist/ /app/

CMD node server.js
