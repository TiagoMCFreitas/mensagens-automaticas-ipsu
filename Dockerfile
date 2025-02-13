FROM node:20.18.0
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install -g ts-node nodemon typescript
RUN npm install
RUN npm i sharp
CMD ["npm","run","start"]
