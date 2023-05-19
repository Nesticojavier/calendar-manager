// conectar con la base de datos
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  database: 'postgres',
  host: process.env.DATABASE_HOST || "localhost",
  password: process.env.DATABASE_PWD || 'nestico123',
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log('Conectado a la base de datos de PostgreSQL');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos de PostgreSQL', error);
  });

module.exports = pool;