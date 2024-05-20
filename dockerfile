FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma/ ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]