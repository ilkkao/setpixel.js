FROM node:9

LABEL maintainer="Ilkka Oksanen <iao@iki.fi>"

COPY package.json yarn.lock webpack.config.js /app/
COPY demos/ engine/ lib/ player/ /app/
COPY server.js /app/

WORKDIR /app/

RUN yarn
RUN yarn run prod

COPY dist/ /app/

CMD node server.js
