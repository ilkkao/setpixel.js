FROM node:9-alpine

LABEL maintainer="Ilkka Oksanen <iao@iki.fi>"

COPY ["main.js", "package.json", "package-lock.json", "/app/"]

WORKDIR /app/
RUN npm install

COPY demos /app/demos/
COPY common /app/common/
COPY engine /app/engine/
COPY lib /app/lib/
COPY server /app/server/
COPY bin /app/bin/

RUN mkdir /app/dist
RUN ./bin/server --build

CMD ./bin/server
