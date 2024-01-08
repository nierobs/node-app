FROM node:20.10-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev
USER node
COPY . ./
EXPOSE 8080
CMD node app.js
