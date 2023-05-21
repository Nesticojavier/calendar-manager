const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("postgres", "postgres", process.env.DATABASE_PWD || "nestico123", {
  host: process.env.DATABASE_HOST || "localhost",
  dialect: "postgres",
  port: "5432"
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sq: sequelize, testDbConnection };
