const { sq } = require("../db/db");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt"); //To encrypt passwords

// Admin Table
const Admin = sq.define("admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const createOrFindAdmin = async (username, password) => {

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error almacenando los datos de autenticacion" });
    }

    try {
      Admin.findOrCreate({
        where: { username },
        defaults: { username, password : hash },
      });
    } catch (error) {
      console.log("Error al registrar usuario");
    }
  });
};

module.exports = { Admin, createOrFindAdmin };
