FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends libvips42 \
  && rm -rf /var/lib/apt/lists/*  
  # esta ultima linea es para limpiar los paquetes instalados que no son necesarios, es algo opcional
  

COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src

EXPOSE 3000
CMD ["node", "src/app.js"]
