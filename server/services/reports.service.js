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
  getReportProviderTracking: async (user, provider_id, startDate, endDate) => {
    const { rol, id } = user;

    // Verify if the user is an admin or a provider
    if (rol !== "proveedor" && rol !== "admin") {
      throw serverErrors.errorUnauthorizedRole;
    }

    // If it's a provider, then verify if their ID is equal to the ID in the request
    if (rol === "proveedor" && provider_id != id) {
      throw serverErrors.errorUnauthorized;
    }

    // Range to filter the search
    const range = [
      startDate ? new Date(startDate) : null,
      endDate ? new Date(endDate) : null,
    ];

    const today = new Date();

    // Validate the range
    if (range[0] && range[0] > today) {
      throw serverErrors.errorDateInitFuture;
    }

    if (range[1] && range[1] > today) {
      throw serverErrors.errorDateEndFuture;
    }

    if (range[0] && range[1] && range[0] > range[1]) {
      throw serverErrors.errorDates;
    }

    try {
      const [jobs] = await sq.query(
        `
        WITH
          trackInfo AS (
            SELECT
              postulation_id,
              date,
              hour,
              attendance
            FROM
              trackings
        )
        SELECT
          p.id AS postulation_id,
          p."dateInit" AS dateInit,
          p."dateEnd" AS dateEnd,          
          w.title,
          case when w.type = '1' then 'Recurrente' else 'Sesion' end as type,
          w.blocks,
          c.username,
          u."fullName",
          u."institucionalId",
          JSON_AGG(t.*) AS tracking
        FROM
          postulations p
          JOIN works w ON w.id = p.works_id
          JOIN users u ON u.id = p.users_id
          JOIN credentials c ON c.users_id = u.id
          LEFT JOIN trackInfo t ON t.postulation_id = p.id
        GROUP BY
          p.id, w.id, c.id, u.id   
        HAVING
          w.users_id = :ID
        ORDER BY
          p.id, p."dateInit"
      `,
        { replacements: { ID: provider_id } }
      );
      const result = [];

      jobs.forEach((element) => {
        // Cast the dates
        const dateInit = new Date(element.dateinit);
        const dateEnd = new Date(element.dateend);
        // Use the date within the specified range, if it exists
        let dateInitIterator =
          range[0] && dateInit < range[0] ? range[0] : dateInit;
        let dateEndIterator =
          range[1] && range[1] < dateEnd ? range[1] : dateEnd;

        // If the dateEnd is after today, then use today as the end date
        dateEndIterator = dateEndIterator > today ? today : dateEndIterator;

        const tracking = element.tracking;
        const blocks = JSON.parse(element.blocks);

        let mapOfAttendance = {};
        for (let i = 0; tracking[i] && i < tracking.length; i++) {
          if (tracking[i].attendance) {
            mapOfAttendance[tracking[i].date] = tracking[i].hour;
          }
        }

        const row = [
          element.postulation_id,
          element.dateinit,
          element.dateend,
          element.title,
          element.type,
          element.username,
          element.fullName,
          element.institutionalId,
        ];
        while (dateInitIterator <= dateEndIterator) {
          const currentDay = getSpanishDayOfWeek(dateInitIterator);
          blocks.forEach((block) => {
            if (currentDay == block.day) {
              const dateFormated = dateInitIterator.toISOString().split("T")[0];
              if (
                mapOfAttendance[dateFormated] &&
                mapOfAttendance[dateFormated] == block.hour
              ) {
                const rowToPush = [...row, dateFormated, block.hour, 1];
                result.push(rowToPush);
              } else {
                result.push([...row, dateFormated, block.hour, 0]);
              }
            }
          });

          dateInitIterator.setDate(dateInitIterator.getDate() + 1);
        }
      });

      return result;
    } catch (error) {
      throw error;
    }
  },
};

const getSpanishDayOfWeek = (date) => {
  // Create an array with the names of the days of the week in Spanish
  var daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  // Get the day of the week number (0-6)
  var dayOfWeekNum = date.getDay();

  // Return the name of the day of the week in Spanish
  return daysOfWeek[dayOfWeekNum];
};
module.exports = reportService;
