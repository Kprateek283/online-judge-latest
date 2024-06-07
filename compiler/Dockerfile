FROM node:20.13.1-alpine

RUN apk update && \
    apk add --no-cache g++ \
                       gcc \
                       python3 \
                       python3-dev \
                       openjdk8

WORKDIR /compiler

COPY package.json .
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
