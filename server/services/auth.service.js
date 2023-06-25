const bcrypt = require("bcrypt"); //To encrypt passwords
const jwt = require("jsonwebtoken"); //Json Web Token Generator
const { Credential, Users } = require("../Models/Users"); //import database connectiou
const serverErrors = require("../error/error");

const authService = {
  // Signup
  signup: async (user) => {
    const { username, password, rol, fullName, birthDate, institutionalId } =
      user;

    // Check if the user is already registered
    const consult = await Credential.findOne({
      where: {
        username,
      },
    });

    if (consult !== null) {
      throw serverErrors.errorUserExists;
    }

    // If the user does not exist, we encrypt his password and save it in the database
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        throw serverErrors.error500;
      }

      try {
        Users.create({
          fullName,
          birthDate,
          institutionalId,
          rol,
        }).then((user) => {
          Credential.create({
            username,
            password: hash,
            users_id: user.id,
          });
        });
      } catch (error) {
        throw error;
      }
    });
  },

  login: async (username, password) => {
    // check if the user is already registered
    const consult = await Credential.findOne({
      where: {
        username,
      },
    });

    if (consult === null) {
      throw serverErrors.errorInvalidCredentials;
    }

    const password_hash = consult.password;
    const id = consult.users_id;

    // Validate password
    const passwordMatch = await bcrypt.compare(password, password_hash);

    if (!passwordMatch) {
      throw serverErrors.errorInvalidCredentials;
    }

    try {
      const profile = await Users.findOne({
        where: {
          id,
        },
      });
      const token = await jwt.sign(
        { username, ...profile.dataValues },
        process.env.USERS_ENCRYPT
      );
      return token;
    } catch (error) {
      throw error;
    }
  },
  verifyToken: async (token, key) => {
    try {
      return jwt.verify(token, key);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = authService;
