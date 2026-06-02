# Clase 4 — Contenedores y escalabilidad

Materiales prácticos para la Unidad 4: cluster nativo de Node.js, Docker y orquestación con Kubernetes (Minikube).

Continúa la línea de [`clase_3/04-artillery`](../clase_3/04-artillery/): la operación compleja satura un solo proceso; estos bloques muestran respuestas progresivas.

## Prerequisitos

- Node.js 18+ (`.nvmrc` → 22)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (bloques 2 y 3)
- [kubectl](https://kubernetes.io/docs/tasks/tools/) + [Minikube](https://minikube.sigs.k8s.io/docs/start/) (bloque 3)

Instalación previa de Docker recomendada (virtualización en BIOS si aplica).

## Bloques

| Orden | Carpeta | Tema |
|-------|---------|------|
| 1 | [`01-cluster/`](01-cluster/) | Módulo `cluster` — N workers, Artillery |
| 2 | [`02-docker/`](02-docker/) | Dockerfile, Compose app+Mongo, `sharp`/libvips, persistencia |
| 3 | [`03-kubernetes/`](03-kubernetes/) | Minikube, Deployment, Service, PVC, kubeusers + Mongo |

## Guión de clase

Ver [`GUION.md`](GUION.md) — timeline, demos, preguntas y comandos Linux/Windows.

## Puertos

| Bloque | Puerto |
|--------|--------|
| 01-cluster | 3002 |
| 02-docker | 3000 |
| 03-kubernetes (local) | 3000 |
| Mongo (docker run) | 27017 |

## Orden sugerido en clase

1. Recap Artillery (clase 3) → saturación
2. `01-cluster` — cluster + Artillery antes/después
3. Break
4. `02-docker` — Compose, imagen, dependencia SO, Mongo con volumen
5. Puente conceptual — cluster vs orquestación
6. `03-kubernetes` — apply, pods, service, persistencia
