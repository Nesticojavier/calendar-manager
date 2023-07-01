import React from "react";
import { Box, Grid} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Calendar({
  days,
  monthNames,
  currentMonth,
  currentYear,
  handlePrevMonthClick,
  handleNextMonthClick,
  firstDay,
  daysInMonth,
  workData,
  isWorkOnDay,
  sortWorksByTag = () => {},
  userPrefHour = null,
  userPrefTag = [],
  handleWorkClick,
}) {
  return (
    <Box>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ArrowBackIosNewIcon
          sx={{ cursor: "pointer" }}
          onClick={handlePrevMonthClick}
        />
        <h1 style={{ color: "rgb(127, 145, 248)" }}>
          {monthNames[currentMonth]} {currentYear}
        </h1>
        <ArrowForwardIosIcon
          sx={{ cursor: "pointer", marginRight: "65px" }}
          onClick={handleNextMonthClick}
        />
      </div>
      {/* To display the calendar */}
      <Grid
        container
        spacing={2}
        sx={{
          margin: "0px",
          minWidth: "100%",
          "--Grid-borderWidth": "1px",
          borderLeft: "var(--Grid-borderWidth) solid",
          borderColor: "black",
          "& > div": {
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderTop: "var(--Grid-borderWidth) solid",
            borderColor: "black",
          },
        }}
      >
        {/* To display the days of the week */}
        {days.map((day) => (
          <Grid key={day} item xs={1.6} minHeight={70} sx={{ display: "flex" }}>
            <h3 style={{ margin: 0 }}>{day}</h3>
          </Grid>
        ))}

        {/* To display the first day of the month on the corresponding day of the week */}
        {[...Array(firstDay)].map((_, index) => (
          <Grid key={index} item xs={1.6} minHeight={100} />
        ))}

        {/* To display the days of the month */}
        {[...Array(daysInMonth)].map((_, index) => {
          // To check if a tag should be added to this day
          let worksOnDay = workData.filter((work) => {
            const result = isWorkOnDay(work, index + 1, userPrefHour);
            return result;
          });

          // To order the works by the selected tag
          sortWorksByTag(worksOnDay, userPrefTag);

          return (
            <Grid
              key={index}
              item
              xs={1.6}
              minHeight={100}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div> {index + 1} </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {worksOnDay.map((work) => (
                  <span
                    key={work.id}
                    style={{
                      display: "inline-block",
                      padding: "2px 6px",
                      backgroundColor:
                        work.type === 1 ? "lightblue" : "lightgreen",
                      borderRadius: "4px",
                      fontSize: "12px",
                      margin: "2px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleWorkClick(work)}
                  >
                    {work.title}
                  </span>
                ))}
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
