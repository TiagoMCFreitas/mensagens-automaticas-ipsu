FROM node:18.19.1
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
RUN npm i sharp
CMD ["npm","start"]