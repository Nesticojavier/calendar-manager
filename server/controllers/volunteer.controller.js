const { sq } = require("../db/db");
const error = require("../error/error")

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
                       ( EXTRACT(YEAR FROM wo."dateInit") = :YEAR OR EXTRACT(YEAR FROM wo."dateInit") = :YEAR )`,
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

const editProfile = (req, res) => {
  res.send("Test routesuu");
};

const showProfile = (req, res) => {
  console.log(req.userData)
  const { id } = req.userData.profile;
  sq.query(
    `SELECT *
    FROM tags t, "userTags" u
    WHERE t.id = u.tags_id AND u.id = :id `,
    {
      replacements: { id },
      type: sq.QueryTypes.SELECT,
    }
  )
    .then((results) => {
      req.userData.profile.tags = results
      console.log(results)
      res.json(req.userData);
    })
    .catch(() => {
      res.status(500).json(error.error500);
    });
};

module.exports = {
  getAllJobs,
  getOneJob, 
  getJobByMonth,
  editProfile,
  showProfile,
};
