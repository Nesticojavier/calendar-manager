import { useEffect, useState } from "react";
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
import EditUSer from "./EditUser";
import { adminService } from "../../Services/Api/adminService";

export default function UsersTable() {
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura y cierre de la ventana modal
  const [selectedUser, setSelectedUser] = useState(null); // Estado para almacenar el usuario seleccionado

  useEffect(() => {
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
