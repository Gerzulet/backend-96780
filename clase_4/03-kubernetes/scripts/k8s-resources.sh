#!/usr/bin/env bash
set -euo pipefail

echo "=== kubeusers — recursos del contenedor ==="
kubectl describe deployment kubeusers | sed -n '/Containers:/,/Conditions:/p' | head -20

echo ""
echo "=== mongo — recursos del contenedor ==="
kubectl describe deployment mongo | sed -n '/Containers:/,/Conditions:/p' | head -20

echo ""
echo "=== Pods (tabla) ==="
kubectl get pods -l 'app in (kubeusers,mongo)' \
  -o custom-columns=\
POD:.metadata.name,\
CPU_REQ:.spec.containers[0].resources.requests.cpu,\
CPU_LIM:.spec.containers[0].resources.limits.cpu,\
MEM_REQ:.spec.containers[0].resources.requests.memory,\
MEM_LIM:.spec.containers[0].resources.limits.memory
