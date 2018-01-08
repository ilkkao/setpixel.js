FROM node:9

LABEL maintainer="Ilkka Oksanen <iao@iki.fi>"

COPY ["package.json", "yarn.lock", "webpack.config.js", "/app/"]

WORKDIR /app/
RUN yarn


COPY demos /app/demos
COPY engine /app/engine
COPY lib /app/lib/
RUN yarn run prod

COPY server.js /app/

CMD node server.js
