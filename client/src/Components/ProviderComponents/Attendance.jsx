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
  Button,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function Attendance({ open, handleClose, date, time }) {
  const handleAttendance = (attended) => {
    // handle attendance logic here
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Control de asistencia
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
                <CalendarTodayIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Fecha" secondary={date} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccessTimeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Hora" secondary={time} />
          </ListItem>
        </List>
        <Box sx={{ display: "flex" }}>
          <Button color="success" onClick={() => handleAttendance(true)}>
            Asistió
          </Button>
          <Button color="error" onClick={() => handleAttendance(false)}>
            No asistió
          </Button>
        </Box>
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
