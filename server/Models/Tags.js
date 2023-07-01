const { sq } = require("../db/db");
const { DataTypes } = require("sequelize");

// Tags Table
const Tags = sq.define("tags", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
});

// Work Tags
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
      onDelete: 'CASCADE',
    },
    tags_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tags",
        key: "id",
      },
      onDelete: 'CASCADE',
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

const UserTags = sq.define(
  "userTag",
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
      onDelete: 'CASCADE',
    },
    tags_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tags",
        key: "id",
      },
      onDelete: 'CASCADE',
    },
  },
  {
    indexes: [
        { 
            unique: true, 
            fields: ["users_id", "tags_id"] 
        }
    ],
  }
);


module.exports = { Tags, WorkTags, UserTags };
