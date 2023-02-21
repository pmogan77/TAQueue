FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENV MY_ENV_FILE=.env

EXPOSE 5000

CMD [ "node", "server.js" ]