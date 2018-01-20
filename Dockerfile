FROM node:9

LABEL maintainer="Ilkka Oksanen <iao@iki.fi>"

COPY ["main.js", "package.json", "yarn.lock", "webpack.config.js", "/app/"]

WORKDIR /app/
RUN yarn


COPY demos /app/demos/
COPY engine /app/engine/
COPY lib /app/lib/
RUN yarn run prod

COPY server /app/server/

CMD node server/main.js
