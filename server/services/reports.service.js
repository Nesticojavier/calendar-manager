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
  getReportProviderTracking: async (provider_id) => {
    try {
      
      const jobs = await Postulation.findAll({
        include: [
          { model: Users, include: [{ model: Credential }] },
          { model: Work },
          {model: Tracking, required:false}
        ],
      });

      const result = [];
      jobs.forEach((element) => {
        const date = new Date(element.dateInit);
        const dateEnd = new Date(element.dateEnd);
        const dayOfAttendance = element.tracking ? new Date(element.tracking.date): null
        console.log("Para el trabajo la postulacion: ", element.id);
        console.log("Dia de asistencia:",dayOfAttendance)
        const blocks = JSON.parse(element.work.blocks);
        console.log("Blocks: ", blocks);

        const row = [
          element.id,
          element.work.title,
          element.work.type,
          element.user.credential.username,
          element.user.fullName,
          element.user.institutionalId]
        while (date <= dateEnd) {
          console.log( date, ">>>>>>>>>>>>>>>>>>>> Hasta: ", dateEnd);
          const currentDay = getSpanishDayOfWeek(date);
          blocks.forEach(block => {
            if (currentDay == block.day) {
              

              if(dayOfAttendance &&  dayOfAttendance.getTime() == date.getTime() && element.tracking.attendance) {
                result.push([...row, true]) 
                console.log("\t\tAsistio:", block.hour)

              }
              else {
                result.push([...row, false]) 

                console.log("\t\t No Asistio:", block.hour)

              }
            }

            
          })

          date.setDate(date.getDate() + 1);
        }

        // for (let index = 0; index < array.length; index++) {
        //   const element = array[index];

        // }
        // result.push()
        // return [
        // element.work.title,
        // element.work.type,
        // element.user.credential.username,
        // element.user.fullName,
        // element.user.institutionalId,
        // // item.date,
        // // item.hour,
        // // item.attendance
        // ]
      });
      // console.log(result);

      return jobs;
    } catch (error) {
      throw error;
    }
  },

 
};

const getSpanishDayOfWeek = (date) => {
  // Create an array with the names of the days of the week in Spanish
  var daysOfWeek = [ 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Get the day of the week number (0-6)
  var dayOfWeekNum = date.getDay();

  // Return the name of the day of the week in Spanish
  return daysOfWeek[dayOfWeekNum];
}
module.exports = reportService;
