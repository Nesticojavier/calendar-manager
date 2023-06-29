import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getDaysInMonth, isSameDay, addDays } from "date-fns";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import Cookies from "js-cookie";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(tag, userTag, theme) {
  return {
    fontWeight:
      userTag.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CalendarVolunteer({ setIsLoggedIn }) {
  const theme = useTheme();

  // days of the week
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  // months of the year
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // to know the current month
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  // to know the current year
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // to know the days in the current month
  const daysInMonth = getDaysInMonth(new Date(currentYear, currentMonth));

  // to know the first day of the month
  const firstDay = new Date(currentYear, currentMonth).getDay();

  // to change to the previuos month
  const handlePrevMonthClick = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // to change to the next month
  const handleNextMonthClick = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // to get the work data
  const [workData, setWorkData] = useState([]);
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/volunteer/jobs/`, { headers })
      .then((response) => {
        setWorkData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
        } else {
          console.error(error.message);
        }
      });
  }, []);

  // const handleAddWorks = (currentYear, currentMonth) => {
  //   axios
  //     .get(
  //       `http://localhost:3000/volunteer/jobs/${currentYear}/${currentMonth+1}`,
  //       { headers }
  //     )
  //     .then((response) => {
  //       setWorkData(response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.error(error.response.data.message);
  //       } else {
  //         console.error(error.message);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   handleAddWorks(currentYear, currentMonth);
  // }, [currentYear, currentMonth]);

  // Function to show the works in the calendar
  const isWorkOnDay = (work, day, selectedHour) => {
    // Add 1 day to the end date and the start date because the date-fns library
    const dateInit = addDays(new Date(work.dateInit), 1);
    const dateEnd = addDays(new Date(work.dateEnd), 1);

    // Convert the day number to a Date object
    const date = new Date(currentYear, currentMonth, day);

    // Get the name in Spanish of the day
    const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });

    // Check if the work has a block that matches the day
    const hasBlock = work.blocks.some(
      (block) =>
        block.day &&
        block.day.toLowerCase() === dayName &&
        (selectedHour === null || block.hour === selectedHour)
    );

    // Check if the work is within the start and end range
    const isInRange =
      (date >= dateInit && date <= dateEnd) ||
      isSameDay(date, dateInit) ||
      isSameDay(date, dateEnd);

    // Return true if both conditions are true, and false otherwise
    return hasBlock && isInRange;
  };

  // to show a dialog with the work information
  const [selectedWork, setSelectedWork] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleWorkClick = (work) => {
    setDialogOpen(true);
    setSelectedWork(work);
  };

  const handleDialogClose = (event) => {
    setDialogOpen(false);
  };

  // To select one hour preference of the volunteer and show the works that match with the preference
  const [hours, setHours] = useState([]);
  const [userPrefHour, setUserPrefHour] = useState(null);
  const handleHourChange = (e) => {
    setUserPrefHour(e.target.value === "" ? null : e.target.value);
  };

  // To select one tag of the volunteer and show the works that match with it
  const [userTags, setUserTags] = useState([]);
  const [userPrefTag, setUserPrefTag] = useState([]);
  const handleTagChange = (e) => {
    const {
      target: { value },
    } = e;
    setUserPrefTag(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/volunteer/profile`, { headers })
      .then((response) => {
        const block = response.data.profile.blocks;
        const userTag = response.data.profile.tags;
        setHours(block);
        setUserTags(userTag);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }, []);

  // Function to order the works by the selected tag of the volunteer
  const sortWorksByTag = (works, selectedTags) => {
    //Function to compare the tags of the works with the selected tag
    const compare = (a, b) => {
      // If both works have the selected tags or none of them have them, it doesn't change the order
      const aHasAllTags = selectedTags.every((tag) => a.tags.includes(tag));
      const bHasAllTags = selectedTags.every((tag) => b.tags.includes(tag));

      if (aHasAllTags && bHasAllTags) {
        // Compare how many tags each work has
        // Works with fewer tags (exact matches) go first
        if (a.tags.length !== b.tags.length) {
          return a.tags.length - b.tags.length;
        } else {
          // If both works have the same number of tags, it compares the titles
          return a.title.localeCompare(b.title);
        }
      }

      // If only the first work has all the selected tags, it goes first
      if (aHasAllTags) {
        return -1;
      }
      // If only the second work has all the selected tags, it goes first
      if (bHasAllTags) {
        return 1;
      }

      // Check if both works have at least one of the selected tags
      const aHasSomeTags = selectedTags.some((tag) => a.tags.includes(tag));
      const bHasSomeTags = selectedTags.some((tag) => b.tags.includes(tag));

      // If both works have at least one of the selected tags, or if neither work has any of the selected tags,
      // compare how many tags each work has and their titles
      if ((aHasSomeTags && bHasSomeTags) || (!aHasSomeTags && !bHasSomeTags)) {
        if (a.tags.length !== b.tags.length) {
          return b.tags.length - a.tags.length;
        } else {
          return a.title.localeCompare(b.title);
        }
      }

      // If only one of the works has at least one of the selected tags, it should come first
      if (aHasSomeTags) {
        return -1;
      }
      if (bHasSomeTags) {
        return 1;
      }
    };
    // Order the works by the compare function
    works.sort(compare);
  };

  return (
    <Box
      flex={7}
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "auto",
        minWidth: "auto",
        overflow: "auto",
      }}
    >
      {/* To filter the works by hour preference or order them by tags */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "150px",
          }}
        >
          <label>
            <h3 style={{ color: "rgb(127, 145, 248)" }}>Filtrar por</h3>
          </label>
          <FormControl sx={{ m: 2, minWidth: 120, marginTop: "0px" }}>
            <InputLabel
              id=""
              style={{
                margin: "auto",
              }}
            >
              Horas
            </InputLabel>
            <Select
              labelId=""
              id=""
              value={userPrefHour}
              label="Hour"
              onChange={handleHourChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {hours.map((hour, index) => (
                <MenuItem key={index} value={hour}>
                  {hour}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "auto",
            marginRight: "80px",
          }}
        >
          <label>
            <h3 style={{ color: "rgb(127, 145, 248)" }}>Ordenar por</h3>
          </label>
          <FormControl sx={{ m: 2, width: "auto", marginTop: "0px" }}>
            <InputLabel
              id=""
              style={{
                margin: "auto",
              }}
            >
              Tags
            </InputLabel>
            <Select
              labelId=""
              id=""
              multiple
              value={userPrefTag}
              onChange={handleTagChange}
              input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {userTags.map((tags) => (
                <MenuItem
                  key={tags}
                  value={tags}
                  style={getStyles(tags, userPrefTag, theme)}
                >
                  {tags}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "16px",
                backgroundColor: "lightgreen",
                borderRadius: "50%",
                marginRight: "15px",
                marginBottom: "10px",
              }}
            />
            <span
              style={{
                marginRight: "80px",
                marginBottom: "10px",
              }}
            >
              Trabajo por sesión
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "16px",
                backgroundColor: "lightblue",
                borderRadius: "50%",
                marginRight: "15px",
              }}
            />
            <span
              style={{
                marginRight: "80px",
              }}
            >Trabajo recurrente</span>
          </div>
        </Box>
      </Box>

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

        {/* To display the dialog with the work information */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Información del trabajo</DialogTitle>
          <DialogContent>
            {selectedWork && (
              <div>
                <p>Título: {selectedWork.title} </p>
                <p>Descripción: {selectedWork.description} </p>
                <p>
                  Tipo:{" "}
                  {`Trabajo ${
                    selectedWork.type === 1 ? "recurrente" : "de sesión"
                  }`}{" "}
                </p>
                <p>Fecha de inicio: {selectedWork.dateInit} </p>
                <p>Fecha de fin: {selectedWork.dateEnd} </p>
                <p>Bloques:</p>
                <ul>
                  {selectedWork.blocks.map((block) => (
                    <li key={block.id}>
                      <p>Dia: {block.day}</p>
                      <p>Hora: {block.hour}</p>
                    </li>
                  ))}
                </ul>
                <p>Etiquetas:</p>
                <ul>
                  {selectedWork.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Grid>
    </Box>
  );
}
