FROM node:14-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install && npm install tsc -g
COPY . .
