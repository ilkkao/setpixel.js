FROM node:9

LABEL maintainer="Ilkka Oksanen <iao@iki.fi>"

COPY ["main.js", "package.json", "yarn.lock", "/app/"]

WORKDIR /app/
RUN yarn install

COPY demos /app/demos/
COPY common /app/common/
COPY engine /app/engine/
COPY lib /app/lib/
COPY server /app/server/

RUN yarn run build

COPY server /app/server/

CMD node server/main.js
