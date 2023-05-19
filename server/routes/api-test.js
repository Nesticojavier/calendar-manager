var express = require("express");
var router = express.Router();
const pool = require("../db/db"); //importar conexion a la base de datos

/* GET doctors. */
router.get("/", (req, res) => {
  // pool.query('SELECT * FROM users', (error, result) => {
  //   if (error) {
  //     throw error;
  //   }
  //   res.json(result.rows)
  // });

  res.json([
    {
      id : "1",
      name: "sujeto1",
      last_name: "apellido1",
      correo: "@gmail.com"
    },
    {
      id : "2",
      name: "sujeto2",
      last_name: "apellido2",
      correo: "@gmail.com"
    },
    {
      id : "3",
      name: "sujeto3",
      last_name: "apellido3",
      correo: "@gmail.com"
    },
    {
      id : "4",
      name: "sujeto4",
      last_name: "apellido4",
      correo: "@gmail.com"
    }
  ]);
});

module.exports = router;