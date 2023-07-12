// require enviroments variables file
require("dotenv").config();

const { users, works } = require("./dataTest");
const authService = require("../services/auth.service");
const providerService = require("../services/provider.service");

const { Users, Credential } = require("../Models/Users");
const { Work } = require("../Models/Work");
const { Tags, WorkTags, UserTags } = require("../Models/Tags");
const { UserBlocks } = require("../Models/Blocks");
const { Postulation } = require("../Models/Postulation");
const { Tracking } = require("../Models/Tracking");

// users.map(async (user) => await authService.signup(user));
const insertUsers = async () => {
  try {
    // users.map(async (user) => await authService.signup(user));
    // console.log("Datos insertados exitosamente");
    for (const user of users) {
      authService.signup(user);
      console.log("Usuario insertado:", user);
    }
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
};

const insertWorks = async () => {
  try {
    // works.map(
    //   async (work) => await providerService.createJob(work.work, work.user)
    // );
    for (const work of works) {
      await providerService.createJob(work.work, work.user);
      console.log("Trabajos insertados exitosamente: ", work.work.title);
    }

  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
};

(async () => {
  await Users.sync({ force: true }).then(() => {
    console.log("Users Model synced 2");
  });
  await Credential.sync({ force: true }).then(() => {
    console.log("Credential Model synced 2");
  });

  await Work.sync({ force: true }).then(() => {
    console.log("Work Model synced 2");
  });

  await Tags.sync({ force: true }).then(() => {
    console.log("Tags Model synced 2");
  });

  await WorkTags.sync({ force: true }).then(() => {
    console.log("WorkTags Model synced 2");
  });

  await UserTags.sync({ force: true }).then(() => {
    console.log("UserTags Model synced 2");
  });

  await UserBlocks.sync({ force: true }).then(() => {
    console.log("UserBlocks Model synced 2");
  });
  await Postulation.sync({ force: true }).then(() => {
    console.log("Postulation Model synced 2");
  });

  await Tracking.sync({ force: true }).then(() => {
    console.log("Tracking Model synced 2");
  });

  await insertUsers();

  await insertWorks();
})();

// Ejecuta la función para insertar los datos

// insertUsers();
// insertWorks();
