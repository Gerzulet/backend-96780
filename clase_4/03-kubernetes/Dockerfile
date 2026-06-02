FROM node:22 AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y libvips-dev && rm -rf /var/lib/apt/lists/*

COPY servidor/package*.json ./
RUN npm ci
COPY servidor/src ./src

FROM node:22-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache vips

COPY servidor/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src

EXPOSE 3000
ENV MONGO_URL=mongodb://mongo:27017/clase4
CMD ["node", "src/app.js"]
