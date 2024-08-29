FROM node:20-alpine as base

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json ./
COPY prisma/ ./
RUN npm ci --only=production

COPY src ./src
COPY tsconfig.json ./
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package*.json ./


CMD ["npm", "run", "start:docker"]
