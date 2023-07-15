// require enviroments variables file
require("dotenv").config();

const { users, works } = require("./dataTest");
const authService = require("../services/auth.service");
const providerService = require("../services/provider.service");
const volunteerService = require("../services/volunteer.service");

const { Users, Credential } = require("../Models/Users");
const { Work } = require("../Models/Work");
const { Tags, WorkTags, UserTags } = require("../Models/Tags");
const { UserBlocks } = require("../Models/Blocks");
const { Postulation } = require("../Models/Postulation");
const { Tracking } = require("../Models/Tracking");

const insertData = async () => {
  try {
    // Limpia las tablas existentes si es necesario
    await Users.sync({ force: true });
    await Credential.sync({ force: true });
    await Work.sync({ force: true });
    await Tags.sync({ force: true });
    await WorkTags.sync({ force: true });
    await UserTags.sync({ force: true });
    await UserBlocks.sync({ force: true });
    await Postulation.sync({ force: true });
    await Tracking.sync({ force: true });

    // Inserta los usuarios en la base de datos
    for (const user of users) {
      await authService.signup(user);
      console.log(`Usuario ${user.username} insertado`);
    }
    
    // Inserta los trabajos en la base de datos
    for (const { user, work } of works) {
        await providerService.createJob(work, user);
        console.log(
        `Trabajo "${work.title}" insertado para el usuario ${user.username}`
      );
    }

    await volunteerService.postulate({id : 3, rol: "voluntario"}, 3,"2023-06-01","2023-08-04")
    await volunteerService.postulate({id : 3, rol: "voluntario"}, 4,"2023-06-10","2023-08-04")
    await volunteerService.postulate({id : 3, rol: "voluntario"}, 5,"2023-06-05","2023-08-04")


    console.log("Inserción de datos completada.");
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
};

insertData();
