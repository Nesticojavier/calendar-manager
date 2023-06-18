const { sq } = require("../db/db");
const { DataTypes } = require("sequelize");

// Credential Table
const Blocks = sq.define(
  "blocks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    day: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    hour: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["day", "hour"],
      },
    ],
  }
);

const UserBlocks = sq.define(
  "userblocks",
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
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["users_id", "hour"],
      },
    ],
  }
);
module.exports = { Blocks, UserBlocks };
