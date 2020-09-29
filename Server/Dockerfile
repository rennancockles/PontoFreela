FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 4000
CMD ["node", "-r", "sucrase/register", "src/server.js", "--ignore", "__tests__"]
