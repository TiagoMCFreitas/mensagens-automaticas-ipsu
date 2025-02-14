FROM node:18.19.1
WORKDIR /app
COPY package.json .
COPY src .
RUN npm install
RUN npm i sharp
RUN npm run build
CMD ["node", "./dist/app.js"]