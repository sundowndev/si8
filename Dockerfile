FROM node:8

WORKDIR /api

COPY . .

# RUN apt-get update && apt-get -y install build-essential

# Build
RUN npm install --prefix /api
RUN npm run build

EXPOSE 3000
