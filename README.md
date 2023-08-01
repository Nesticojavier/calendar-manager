# Calendar Manager for Volunteer Work

This project aimed to develop an application with three user roles: admin, provider, and volunteer. Providers have the ability to create jobs, and volunteers can apply for these jobs. The applications submitted by volunteers undergo a review process for acceptance or rejection by the job provider. The jobs are displayed on a calendar with search and filtering capabilities, allowing users to find jobs related to their interests and skills. Providers can track each volunteer's progress and generate reports for their records. The application facilitates seamless coordination between providers and volunteers for effective volunteer work management.

## React Application with Node.js Backend and PostgreSQL Database Usage

Project Structure:
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

## Usage with Docker Development Environment

### Run with Docker Compose

```
$ docker compose up
```

If it's not the first time running this project, execute `./restart-docker.sh` to remove old images before `docker compose up`.

#### To run in the background:
```
$ docker compose up -d
```

### Shut Down the Containers

```
$ docker compose down -v
```