# Calendar Manager for Volunteer Work

## Aplicación React con Nodejs en el backend y uso de la base de datos postgres
Estructura del proyecto:
```
.
├── README.md
├── client
│   ├── Dockerfile
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── Components
│   │   │   └── UsersList.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── vite.config.js
│   └── ...
├── ...
├── docker-compose.yml
└── server
    ├── ...
    ├── Dockerfile
    ├── app.js
    ├── bin
    │   └── www
    ├── controllers
    │   └── users.controllers.js
    ├── db
    │   └── db.js
    ├── package-lock.json
    ├── package.json
    ├── public
    │   └── stylesheets
    │       └── style.css
    ├── routes
    │   ├── api-test.js
    │   ├── index.js
    │   └── users.js
    └── views
        ├── error.pug
        ├── index.pug
        └── layout.pug
```

## Uso con entorno de desarrollo de Docker

### Ejecutar con docker compose

```
$ docker compose up
```

#### Para ejecutar en segundo plano:
```
$ docker compose up -d
```

### Darle de baja a los contenedores

```
$ docker compose down -v
```