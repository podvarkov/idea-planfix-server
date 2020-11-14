FROM node:12.16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=dev
COPY . .
RUN npm run build

FROM node:12.16-alpine AS app
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=prod
COPY --from=builder /app/lib ./lib
CMD ["npm", "start"]
