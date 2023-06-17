const { sq } = require("../db/db");

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
                HAVING EXTRACT(MONTH FROM wo."dateInit") = :MONTH AND EXTRACT(YEAR FROM wo."dateInit") = :YEAR `,
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

module.exports = {
  getAllJobs,
  getOneJob,
  getJobByMonth,
};
