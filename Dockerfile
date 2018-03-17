FROM node:9-alpine
WORKDIR /app/

COPY ["main.js", "package.json", "package-lock.json", "/app/"]
COPY demos /app/demos/
COPY common /app/common/
COPY engine /app/engine/
COPY lib /app/lib/
COPY server /app/server/
COPY bin /app/bin/
RUN npm install
RUN ./bin/server --build

# Make the final image smaller
RUN rm -fr node_modules
RUN npm install --production

# Select what to have in the final image
RUN mkdir /app/transfer
RUN mv /app/dist /app/server /app/bin/ /app/node_modules /app/package.json /app/transfer

FROM node:9-alpine
LABEL maintainer="Ilkka Oksanen <iao@iki.fi>"
COPY --from=0 /app/transfer /app/
CMD /app/bin/server
