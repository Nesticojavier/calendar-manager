const { sq } = require("../db/db");
const error = require("../error/error");
const { updateUserTag } = require("../controllers/utils");
const { Blocks, UserBlocks } = require("../Models/Blocks");

const getAllJobs = (req, res) => {
  sq.query(
    `SELECT wo.*, wo.title, string_agg(t.title, ',') as Tags 
        FROM works wo 
        LEFT JOIN "workTags" w ON wo.id = w.works_id 
        LEFT JOIN tags t ON t.id = w.tags_id
        GROUP BY wo.id`,
    {
      type: sq.QueryTypes.SELECT,
    }
  )
    .then((results) => {
      results.map((e) => {
        e.tags = e.tags?.split(",");
        e.blocks = JSON.parse(e.blocks);
        return e;
      });
      res.json(results);
    })
    .catch((error) => {
      res.status(500).json(error.error500);
    });
};

const getOneJob = (req, res) => {
  const { id } = req.params;
  sq.query(
    `SELECT wo.*, wo.title, string_agg(t.title, ',') as Tags 
            FROM works wo 
            LEFT JOIN "workTags" w ON wo.id = w.works_id 
            LEFT JOIN tags t ON t.id = w.tags_id
            WHERE wo.id = :ID
            GROUP BY wo.id`,
    {
      replacements: { ID: id },
      type: sq.QueryTypes.SELECT,
    }
  )
    .then((results) => {
      results.map((e) => {
        e.tags = e.tags?.split(",");
        e.blocks = JSON.parse(e.blocks);
        return e;
      });
      res.json(results);
    })
    .catch((error) => {
      res.status(500).json(error.error500);
    });
};

const getJobByMonth = (req, res) => {
  const { month, year } = req.params;
  sq.query(
    `SELECT wo.*, wo.title, string_agg(t.title, ',') as Tags 
                FROM works wo 
                LEFT JOIN "workTags" w ON wo.id = w.works_id 
                LEFT JOIN tags t ON t.id = w.tags_id
                GROUP BY wo.id
                HAVING ( EXTRACT(MONTH FROM wo."dateInit") = :MONTH OR EXTRACT(MONTH FROM wo."dateEnd") = :MONTH ) AND 
                       ( EXTRACT(YEAR FROM wo."dateInit") = :YEAR OR EXTRACT(YEAR FROM wo."dateEnd") = :YEAR )`,
    {
      replacements: { MONTH: month, YEAR: year },
      type: sq.QueryTypes.SELECT,
    }
  )
    .then((results) => {
      results.map((e) => {
        e.tags = e.tags?.split(",");
        e.blocks = JSON.parse(e.blocks);
        return e;
      });
      res.json(results);
    })
    .catch((error) => {
      res.status(500).json(error.error500);
    });
};

const editProfile = async (req, res) => {
  const { id: users_id } = req.userData.profile;
  const { tags, blocks } = req.body;

  if (!tags || !blocks) {
    return res.status(400).json(error.errorMissingData);
  }

  UserBlocks.destroy({
    where: {
      users_id,
    },
  });

  UserBlocks.bulkCreate(
    blocks.map((e) => {
      return { users_id, hour: e };
    })
  );

  console.log(tags);
  updateUserTag(users_id, tags);
  return res.json(error.successUpdate);
};

const showProfile = async (req, res) => {
  const { id } = req.userData.profile;
  await sq.query(
    `SELECT t.title
    FROM tags t, "userTags" u
    WHERE t.id = u.tags_id AND u.users_id = :id `,
    {
      replacements: { id },
      type: sq.QueryTypes.SELECT,
    }
  )
    .then((results) => {
      console.log(results);
      req.userData.profile.tags = results.map((e) => e.title);
    })
    .catch(() => {
      res.status(500).json(error.error500);
    });

   await sq.query(
      `SELECT b.hour
      FROM userblocks b
      WHERE b.users_id = :id `,
      {
        replacements: { id },
        type: sq.QueryTypes.SELECT,
      }
    )
      .then((results) => {
        console.log(results);
        req.userData.profile.blocks = results.map((e) => e.hour);
      })
      .catch(() => {
        res.status(500).json(error.error500);
      });

      res.json(req.userData.profile)
};

module.exports = {
  getAllJobs,
  getOneJob,
  getJobByMonth,
  editProfile,
  showProfile,
};
