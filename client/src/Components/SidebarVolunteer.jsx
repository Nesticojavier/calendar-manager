import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SummarizeIcon from "@mui/icons-material/Summarize";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SidebarVolunteer() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (event, index) => {
    // event.preventDefault();
    setSelectedIndex(index);
  };

  return (
    <Box
      flex={1}
      p={1}
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      borderRight={1}
      borderColor="divider"
    >
      <List sx={{ marginTop: "20px" }}>
        <ListItem disablePadding>
          <ListItemButton
            // component="a"
            // href="/dashboard"
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
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Ver calendario" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            // component="a"
            to="myprofile"
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
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            // component="a"
            // href="/WorkList"
            component={NavLink}
            to="myworks"
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
            <ListItemText primary="Mis trabajos" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
