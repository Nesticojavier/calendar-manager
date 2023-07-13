const { sq } = require("../db/db");
const { Op } = require("sequelize");
const { Work } = require("../Models/Work");
const { Tags, WorkTags } = require("../Models/Tags");
const { Users } = require("../Models/Users");
const { Credential } = require("../Models/Users");
const { Postulation } = require("../Models/Postulation");
const { Tracking } = require("../Models/Tracking");

const serverErrors = require("../error/error");
const { error } = require("console");

const reportService = {
  getReportProvider: async (provider_id) => {
    try {
      const jobs = await sq.query(
        `SELECT wo.*, wo.title, string_agg(t.title, ',') as Tags 
          FROM works wo 
          LEFT JOIN "workTags" w ON wo.id = w.works_id 
          LEFT JOIN tags t ON t.id = w.tags_id
          WHERE wo.users_id = :USERID
          GROUP BY wo.id`,
        {
          replacements: { USERID: provider_id },
          type: sq.QueryTypes.SELECT,
        }
      );
      const promise = jobs.map((e) => {
        e.tags = e.tags?.split(",");
        e.blocks = JSON.parse(e.blocks);
        return e;
      });
      await Promise.all(promise);
      return promise;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = reportService;
