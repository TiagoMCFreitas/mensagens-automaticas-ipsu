FROM node:20.18.0
WORKDIR /app
COPY package.json .
COPY src .
RUN npm install
RUN npm i sharp
RUN npm run build
CMD ["node", "./dist/app.js"]