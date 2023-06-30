/**
 * Component to display volunteer information
 * This component displays the information of a volunteer applying
 * for a job in a modal window.
 *
 * This information is shown to the provider to whom the application
 * request is being made.
 */

import React from "react";
import {
  Modal,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SchoolIcon from "@mui/icons-material/School";

export default function ShowVolunteerInfo({ user, handleClose }) {
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Información del voluntario postulado
        </Typography>
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
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Nombre completo" secondary={user.fullName} />
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
              secondary={user.birthDate}
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
              secondary={user.institucinalId}
            />
          </ListItem>
        </List>
      </Box>
    </Modal>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};
