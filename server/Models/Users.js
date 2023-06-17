const { sq } = require("../db/db");
const { DataTypes } = require("sequelize");

// Credential Table
const Credential = sq.define("credential", {
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
  users_id: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
    onDelete: 'CASCADE',
  },
});

// Users Table
const Users = sq.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  institucionalId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Credential.belongsTo(Users, { foreignKey: 'users_id' });

module.exports = { Users, Credential };
