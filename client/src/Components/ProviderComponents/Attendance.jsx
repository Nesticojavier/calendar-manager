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
import axios from "axios";
import Cookies from "js-cookie";

export default function Attendance({
  open,
  handleClose,
  date,
  hour,
  postulation_id,
  setRefresh
}) {
  // to get token for api authentication
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };
  const handleAttendance = (attended) => {
    const register = {
      date,
      hour,
      attendance: attended,
    };
    console.log(register)
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/provider/tracking/${postulation_id}`,
        register,
        {
          headers,
        }
      )
      .then((response) => {
        // Handle request response successful
        swal({
          title: "Asistencia asignada",
          icon: "success",
        }).then(() => {
          handleClose();
          setRefresh(true)
        });
      })
      .catch((error) => {
        // Handle request error
        console.error(error.response.data.data.error);
      });
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
            <ListItemText primary="Hora" secondary={hour} />
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
