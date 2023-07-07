import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import EditUSer from "./EditUser";
import Cookies from "js-cookie";
import { adminService } from "../../Services/Api/adminService";

export default function UsersTable() {
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura y cierre de la ventana modal
  const [selectedUser, setSelectedUser] = useState(null); // Estado para almacenar el usuario seleccionado

  useEffect(() => {
    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    // axios
    //   .get("http://localhost:3000/admin/userslist", {headers})
    //   .then((response) => {
    //     setUserData(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error.response.data.message);
    //   });
    adminService
      .getUsers()
      .then((users) => {
        setUserData(users);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  return (
    <Box
      flex={7}
      p={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "150vh",
        overflow: "auto",
      }}
    >
      <div>
        <h1 style={{ marginBottom: "50px" }}>
          Usuarios registrados en el sistema
        </h1>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {" "}
                <b>Usuario</b>{" "}
              </TableCell>
              <TableCell>
                {" "}
                <b>Rol</b>{" "}
              </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.user.rol}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {openModal && (
        <EditUSer user={selectedUser} handleClose={() => setOpenModal(false)} />
      )}
    </Box>
  );
}
