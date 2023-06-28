const { sq } = require("../db/db");
const { DataTypes } = require("sequelize");

// Postulation Table
const Postulation = sq.define(
  "postulation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    users_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    works_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "works",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    confirmed: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "unconfirmed",
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["works_id", "users_id"],
      },
    ],
  }
);

module.exports = { Postulation };
