// conectar con la base de datos
const { Pool } = require('pg');

const pool = new Pool({
  user: 'nestorjavier',
  host: 'localhost',
  database: 'express-react-project',
  password: 'nestico123',
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