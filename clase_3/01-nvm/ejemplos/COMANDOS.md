# NVM — Comandos habituales

## Instalación

| SO | Comando / enlace |
|----|------------------|
| macOS / Linux | `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh \| bash` |
| Windows | [nvm-windows](https://github.com/coreybutler/nvm-windows) |

## Comandos esenciales

```bash
nvm --version              # versión de nvm
nvm ls                   # versiones instaladas (* = activa)
nvm ls-remote            # versiones disponibles para instalar
nvm install 22           # instala Node 22
nvm install              # instala la versión del .nvmrc (en carpeta del proyecto)
nvm use 22               # cambia a Node 22 en esta shell
nvm use                  # usa versión del .nvmrc
nvm current              # muestra versión activa
nvm alias default 22     # versión por defecto al abrir terminal
nvm which node           # ruta del binario node activo
nvm run 18 --version     # ejecuta comando con Node 18 sin cambiar shell
```

## Flujo con `.nvmrc`

En la raíz del proyecto:

```
22
```

```bash
cd mi-proyecto
nvm use          # lee .nvmrc y activa Node 22
node -v
```

## Casos de uso

1. **Proyecto legacy:** `.nvmrc` con `18`, equipo nuevo con `22` global → `nvm use` al entrar.
2. **CI:** misma versión que `.nvmrc` (ej. `node-version: 22` en GitHub Actions).
3. **Probar upgrade:** `nvm install 22 && npm test` sin tocar la versión default.
4. **Proyecto con `engines` estricto:** ver [proyecto-requiere-node-22/README.md](../proyecto-requiere-node-22/README.md) — `npm install` falla en Node 18 con `engine-strict=true`.

```bash
cd proyecto-requiere-node-22
nvm use 18 && npm install    # debe fallar (EBADENGINE)
nvm use && npm install && npm start   # debe funcionar
```

## Alternativas

- **fnm** — rápido, Rust, multiplataforma.
- **Volta** — fija versión en `package.json` (`volta`).
