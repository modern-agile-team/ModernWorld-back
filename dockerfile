FROM node:20-apline

WORKDIR /app

COPY package.json ./

RUN npm ci

COPY ./ ./

CMD ["nest", "start"]