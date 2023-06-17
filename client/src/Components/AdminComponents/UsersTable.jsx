import { useEffect, useState } from 'react'
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom';
import EditUSer from "./EditUser";

export default function UsersTable() {
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura y cierre de la ventana modal
  const [selectedUser, setSelectedUser] = useState(null); // Estado para almacenar el usuario seleccionado

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/userslist")
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.log("por aquiiii")
        console.error(error.response.data.message);
      });
  }, []);

  const users = [
    { id: 1, name: 'Usuario 1', role: 'Rol 1' },
    { id: 2, name: 'Usuario 2', role: 'Rol 2' },
    { id: 3, name: 'Usuario 3', role: 'Rol 3' },
  ];

  const navigate = useNavigate();

  // const handleEdit = (user) => {
  //   navigate(`/admin/edituser/${user.id}`, { state: { user } });
  // };

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

        <h1 style={{ marginBottom: '50px' }}>
          Usuarios registrados en el sistema
        </h1>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell> <b>Usuario</b> </TableCell>
              <TableCell> <b>Rol</b> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map(user => (
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
        <EditUSer
          user={selectedUser}
          handleClose={() => setOpenModal(false)}
        />
      )}

    </Box>


  )
}
