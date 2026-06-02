# Comandos Kubernetes — clase 4

Requisitos: Docker, [kubectl](https://kubernetes.io/docs/tasks/tools/), [Minikube](https://minikube.sigs.k8s.io/docs/start/).

## Minikube + imagen local

La app usa `imagePullPolicy: Never` — la imagen debe existir **dentro** del Docker de Minikube.

**Linux / macOS**

```bash
cd 03-kubernetes
minikube start
eval $(minikube -p minikube docker-env --shell bash) 
docker build -t kubeusers:local .
```

Si `eval $(minikube docker-env)` falla en tu shell, exportá manualmente:

```bash
eval "$(minikube -p minikube docker-env --shell bash)"
```

Eval funciona como un puente entre nuestro servicio de docker en nuestra maquina hacia la VM que crea minikube. Es necesario tambien que la opcion imagePullPolicy tenga el valor never, para que minikube on intente traerse imagenes de la red y ocupe las locales)  
Ver: [https://minikube.sigs.k8s.io/docs/handbook/pushing/](https://minikube.sigs.k8s.io/docs/handbook/pushing/)

**Windows (PowerShell)**

```powershell
cd 03-kubernetes
minikube start
minikube docker-env | Invoke-Expression
docker build -t kubeusers:local .
```

## Deploy

```bash
kubectl apply -f k8s/mongo.yaml
kubectl apply -f k8s/kubeusers.yaml

kubectl get deployments,pods,services
kubectl describe pvc mongo-pvc
```

Esperar a que mongo y los 3 pods de kubeusers estén `Running`.

Si se realizan cambios en los manifiestos, volver a ocupar kubectl apply

## Acceder al servicio

Con minikube service kubeservice --url podemos saber que url usar para ocupar nuestra aplicacion

```bash
minikube service list
minikube service kubeservice --url
```

Probar (reemplazar URL) y correr en la terminal:

```bash
curl <URL>/health/db
curl <URL>/operacion-sencilla
curl -X POST <URL>/api/users -H "Content-Type: application/json" -d '{"name":"Ana","role":"admin"}'
curl <URL>/api/users
```

## Otros comandos

```

kubectl get deployments 

kubectl get pods 

```

## Diagnóstico

```bash
kubectl cluster-info
kubectl get pods -w
kubectl logs deployment/kubeusers
kubectl logs deployment/mongo
```

## Limpiar

```bash
kubectl delete -f k8s/kubeusers.yaml
kubectl delete -f k8s/mongo.yaml
minikube stop
```

## Persistencia — paralelo con Docker


| Docker                                   | Kubernetes                        |
| ---------------------------------------- | --------------------------------- |
| `docker volume create clase4-mongo-data` | `PersistentVolumeClaim mongo-pvc` |
| `-v clase4-mongo-data:/data/db`          | `volumeMounts` en `/data/db`      |
| `docker volume inspect`                  | `kubectl describe pvc mongo-pvc`  |


