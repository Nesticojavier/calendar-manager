import React, { useState, useEffect } from "react";
import { Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";

import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import BadgeIcon from "@mui/icons-material/Badge";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { volunteerService } from "../../Services/Api/volunteerService";

export default function ProfileVolunteer() {
  // extract user from context
  const { profile } = useContext(UserContext);
  const values = profile;

  // To navigate to the edit profile page
  const navigate = useNavigate();
  const handleEdit = (user) => {
    navigate(`/volunteer/editprofile/${values.id}`, { state: { user } });
  };

  // to get the tags and hours preferences of the volunteer
  const [tagsPref, setTagsPref] = useState([]);
  const [hoursPref, setHoursPref] = useState([]);

  useEffect(() => {
    volunteerService
      .showProfile()
      .then((response) => {
        setTagsPref(response.tags);
        setHoursPref(response.blocks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box
      flex={7}
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "100vh",
        overflow: "auto",
        alignItems: "center",
        // textAlign: "center",
      }}
    >
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgb(1, 20, 128)",
              width: "80px",
              height: "80px",
              fontSize: "40px",
            }}
          >
            {values.fullName[0]}
          </Avatar>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
            }}
          >
            <h1>{values.fullName}</h1>
            <p>@{values.username}</p>
          </div>
        </div>

        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BadgeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Tipo de cuenta"
                secondary={`Cuenta de ${values.rol}`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CalendarTodayIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Fecha de nacimiento"
                secondary={values.birthDate}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SchoolIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Id instucional"
                secondary={values.institucinalId}
              />
            </ListItem>
          </List>
          <Divider variant="middle" />

          <Box name="preferences" sx={{ m: 2 }}>
            <Typography gutterBottom variant="h5" component="div">
              Preferencias
            </Typography>
            <Box name="tags">
              <Typography gutterBottom variant="body1">
                Etiquetas:
              </Typography>
              <Stack direction="row" spacing={1}>
                {tagsPref.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{ bgcolor: import.meta.env.VITE_COLOR_SECUNDARY }}
                  />
                ))}
              </Stack>
            </Box>
            <Box sx={{ mt: 2 }} name="blocks">
              <Typography gutterBottom variant="body1">
                Bloques de horario:
              </Typography>
              <Stack direction="row" spacing={1}>
                {hoursPref.map((hour) => (
                  <Chip key={hour} label={hour} />
                ))}
              </Stack>
            </Box>
          </Box>
          <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
            <Button onClick={() => handleEdit(values)}>
              Editar preferencias
            </Button>
          </Box>
        </Box>
      </>
    </Box>
  );
}
