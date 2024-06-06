# Xpert Group - The Cat API Test


### Pre-requisitos 📋

Node version: 20.14.0
npm version: 10.7.0
Docker version: 24.0.7

_Para instalar todas las dependencias que necesita el proyecto, colocar el siguiente comando_

```
npm install
```

_Crear imagen para MongoDB 

```
cd <root-dir>
docker compose up -d
```

### Instalación 🔧

_Para compilar el proyecto escribimos el siguiente comando_

```
npm run serve
```
_Para compilar el proyecto a producción_

```
npm run build
```

## Ejecutando las pruebas ⚙️

_Iniciar las pruebas_

```
npm run tests
```

## Test cases:

- POST - Register a User
- POST - Login with User
- GET - List the Breeds
- GET - Return breed by id
- GET - SearchByBreedQuerys
- GET - Return Images by Breed Id

