FROM node:current-alpine3.12
RUN apk update && apk upgrade
RUN apk add ffmpeg ffmpeg-dev
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD npm start
