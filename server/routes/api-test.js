var express = require('express');
var router = express.Router();
const pool = require('../db/db'); //importar conexion a la base de datos

/* GET doctors. */
router.get('/', (req, res) => {
  pool.query('SELECT * FROM users', (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result.rows)
  });
});

module.exports = router;