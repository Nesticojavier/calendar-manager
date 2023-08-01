# Backend of the Application developed in Node.js + Express.js

## Execution

### Install Dependencies
```
npm install
```

### Run Node Project

This Express.js project uses PostgreSQL as the database and, by default, connects to a PostgreSQL database with the username "postgres" and the password received through an environment variable ($DATABASE_PWD). If you want to run this project on your computer without a PostgreSQL container, you need to set the environment variable as follows:

For Linux / MacOS
```
export DATABASE_PWD=contraseña123
```

For Windows (CMD)
```
set DATABASE_PWD=contraseña123
```

For Windows (PowerShell)
```
$env:DATABASE_PWD = "contraseña123"
```

Finally, you can run the Node.js API connected to the default PostgreSQL database as follows:
```
npm run serverstart
```

## Environment Variables Used

If you want to run this project on your computer without a docker container, you need to set the following environment variables in your operating system or by adding a `.env` file to the root of the server:

- `DATABASE_HOST` Indicates the database host
- `DATABASE_PWD` Indicates the database password
- `ADMIN_USER` Indicates the admin user of the calendar
- `ADMIN_PWD` Indicates the password for the admin profile of the calendar
- `ADMIN_ENCRYPT`  Indicates the encryption key to encrypt the admin's jwt token
- `USERS_ENCRYPT` Indicates the encryption key to encrypt the jwt tokens of the users