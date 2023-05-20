const knex = require("knex");
pool = knex({
  client: "postgres",
  connection: {
    host: process.env.DATABASE_HOST || "localhost",
    user: "postgres",
    password: process.env.DATABASE_PWD || "nestico123",
    database: "postgres",
  },
});

// const { Pool } = require('pg');
// const pool = new Pool({
//   user: 'postgres',
//   database: 'postgres',
//   host: process.env.DATABASE_HOST || "localhost",
//   password: process.env.DATABASE_PWD || 'nestico123',
//   port: 5432,
// });

// (async () => {
//   try {
//     const rows = await pool.select("*").from("users");
//     console.log(rows);
//     process.exit(0);
//   } catch (err) {
//     console.error("Error al realizar la consulta:", err);
//     process.exit(1);
//   } finally {
//     pool.destroy(); // Cerrar la conexión al finalizar
//   }
// })();

// (async () => {
//   try {
//     const result = await pool.raw("SELECT 1"); // Ejemplo de consulta
//     console.log("Conexión exitosa");
//     // process.exit(0);
//   } catch (err) {
//     console.error("Error al conectar a la base de datos:", err);
//     process.exit(1);
//   } finally {
//     // pool.destroy(); // Cerrar la conexión al finalizar
//   }
// })();

module.exports = pool;
