const { sq } = require("../db/db");
const { DataTypes } = require("sequelize");
const { Work } = require("./Work");
const { Users } = require("./Users");

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
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dateInit: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dateEnd: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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

Postulation.belongsTo(Work, { foreignKey: "works_id" });
Postulation.belongsTo(Users, { foreignKey: "users_id" });

module.exports = { Postulation };
