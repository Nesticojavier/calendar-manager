const { sq } = require("../db/db");
const { DataTypes } = require("sequelize");

// Credential Table
const Tags = sq.define("tags", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
  },
});

// Users Table
const WorkTags = sq.define(
  "workTag",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    works_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "works",
        key: "id",
      },
    },
    tags_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tags",
        key: "id",
      },
    },
  },
  {
    indexes: [
        { 
            unique: true, 
            fields: ["works_id", "tags_id"] 
        }
    ],
  }
);

module.exports = { Tags, WorkTags };
