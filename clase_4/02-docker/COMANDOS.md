# Comandos Docker — clase 4

## Levantar la aplicacion completa + db con docker compose

npm run docker:up es el equivalente a docker compose up 

```bash
cd 02-docker
npm install
npm run docker:up 

curl http://localhost:3000/health/db
curl http://localhost:3000/
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Ana","role":"user"}'
curl http://localhost:3000/api/users

npm run docker:down
```
## DockerHub (opcional por si quieren subir la imagen a dockerhub)

```bash
docker tag clase4-servidor:multistage <dockerid>/clase4-servidor:1.0.0
docker login
docker push <dockerid>/clase4-servidor:1.0.0

```
Si la imagen es publica usar docker pull <dockerid>/clase4-servidor:1.0.0
