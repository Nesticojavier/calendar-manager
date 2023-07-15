const { sq } = require("../db/db");
const { DataTypes } = require("sequelize");
const { Postulation } = require("./Postulation");

// Tracking Table
const Tracking = sq.define("tracking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  hour: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  attendance: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  postulation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "postulations",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

// Tracking.belongsTo(Postulation, { foreignKey: "postulation_id" });

module.exports = { Tracking };
