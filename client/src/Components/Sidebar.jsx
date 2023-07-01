import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SummarizeIcon from "@mui/icons-material/Summarize";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

export default function Sidebar() {
  const { profile } = useContext(UserContext);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (event, index) => {
    // event.preventDefault();
    setSelectedIndex(index);
  };

  return (
    <Box
      flex={1}
      p={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "30vh",
      }}
      borderRight={1}
      borderColor="divider"
    >
      <List sx={{ marginTop: "20px" }}>

        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="calendar"
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgb(180, 190, 247)",
                color: "black",
                "&:hover": { backgroundColor: "rgb(127, 145, 248)" },
              },
            }}
          >
            <ListItemIcon>
              <AccountCircleIcon sx={{ fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText primary={profile?.fullName} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            // component="a"
            to="workcreation"
            // href="/WorkCreation"
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgb(180, 190, 247)",
                color: "black",
                "&:hover": { backgroundColor: "rgb(127, 145, 248)" },
              },
            }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Crear trabajo voluntario" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            // component="a"
            // href="/WorkList"
            component={NavLink}
            to="worklist"
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgb(180, 190, 247)",
                color: "black",
                "&:hover": { backgroundColor: "rgb(127, 145, 248)" },
              },
            }}
          >
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary="Ver trabajos existentes" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="workinprogress"
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgb(180, 190, 247)",
                color: "black",
                "&:hover": { backgroundColor: "rgb(127, 145, 248)" },
              },
            }}
          >
            <ListItemIcon>
              <EventRepeatIcon />
            </ListItemIcon>
            <ListItemText primary="Trabajos en curso" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            // component="a"
            // href="/dashboard"
            component={NavLink}
            to="calendar"
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgb(180, 190, 247)",
                color: "black",
                "&:hover": { backgroundColor: "rgb(127, 145, 248)" },
              },
            }}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Ver calendario" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
