FROM node:18.19.1
RUN apt-get update && apt-get install -y chromium

# Define o caminho do Chromium para o Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
RUN npm i sharp
RUN npm run build
RUN npm install -g typescript ts-node
CMD ["ts-node", "src/app.ts"]
