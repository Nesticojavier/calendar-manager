import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import EditIcon from "@mui/icons-material/Edit";
import EditUSer from "./EditUser";
import { adminService } from "../../Services/Api/adminService";
import GenerateReport from "../GenerateReport";

export default function UsersTable() {
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura y cierre de la ventana modal
  const [selectedUser, setSelectedUser] = useState(null); // Estado para almacenar el usuario seleccionado

  // States used to crontrol the windows modal with volunteer info
  const [openGenerateReport, setOpenGenerateReport] = useState(false);

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

  const handleOpenGenerateReport = (user) => {
    setSelectedUser(user);
    setOpenGenerateReport(true);
  };

  return (
    <Box
      flex={7}
      p={4}
      px={40}
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
              <TableCell>
                {" "}
                <b>Accion</b>{" "}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.user.rol}</TableCell>
                <TableCell>
                  <Tooltip title="Editar contraseña de usuario">
                    <IconButton onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  {user.user.rol === "proveedor" && (
                    <Tooltip title="Generar reportes del proveedor">
                      <IconButton
                        onClick={() => handleOpenGenerateReport(user)}
                      >
                        <AssessmentOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {openModal && (
        <EditUSer user={selectedUser} handleClose={() => setOpenModal(false)} />
      )}
      {openGenerateReport && (
        <GenerateReport
          handleClose={() => setOpenGenerateReport(false)}
          user_id={selectedUser.id}
          role={"proveedor"}
          admin={true}
        />
      )}
    </Box>
  );
}
