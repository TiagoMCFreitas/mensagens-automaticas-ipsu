FROM node:18.19.1
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
RUN npm i sharp
RUN npm run build
RUN npm install -g typescript ts-node
CMD ["ts-node", "app.js"]