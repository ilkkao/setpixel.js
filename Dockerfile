FROM node:9-alpine
WORKDIR /app/
COPY ["main.js", "package.json", "package-lock.json", "/app/"]
RUN npm install
COPY demos /app/demos/
COPY common /app/common/
COPY engine /app/engine/
COPY lib /app/lib/
COPY server /app/server/
COPY bin /app/bin/
RUN mkdir /app/dist
RUN ./bin/server --build

# Make the final image smaller
RUN rm -fr demos common engine lib main.js package-lock.json

FROM node:9-alpine
LABEL maintainer="Ilkka Oksanen <iao@iki.fi>"
COPY --from=0 /app /app/
WORKDIR /app/
CMD ./bin/server
