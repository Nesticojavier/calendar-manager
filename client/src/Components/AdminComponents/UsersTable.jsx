import React from 'react'
import { Box } from "@mui/material"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  IconButton 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom';

export default function UsersTable() {

  // completar pedir users al be.
  const users = [
    { id: 1, name: 'Usuario 1', role: 'Rol 1' },
    { id: 2, name: 'Usuario 2', role: 'Rol 2' },
    { id: 3, name: 'Usuario 3', role: 'Rol 3' },
  ];

  const navigate = useNavigate();

  const handleEdit = (user) => {
      navigate(`/admin/edituser/${user.id}`, { state: { user } });
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
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.role}</TableCell>
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

      </Box>

    
  )
}
