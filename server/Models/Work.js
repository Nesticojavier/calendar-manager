const { sq } = require("../db/db");
const { DataTypes } = require("sequelize");

// Work Table
const Work = sq.define("work", {
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
    onDelete: 'CASCADE',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  volunteerCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  volunteerCountMax: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  blocks: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateInit: {
    type: DataTypes.DATEONLY,
  },
  dateEnd: {
    type: DataTypes.DATEONLY,
  },
});

module.exports = { Work };
