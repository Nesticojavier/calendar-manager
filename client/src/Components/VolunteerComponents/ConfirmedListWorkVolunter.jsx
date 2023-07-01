import React, { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Button,
  Pagination,
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import Cookies from "js-cookie";

export default function ConfirmedListWorkVolunter({ statusConfirmed }) {
  // needed by axios for auth
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  // constant to store the number of rows to display
  const NUMBER_ROW = 4;

  // State for store data from the fetch
  const [workData, setWorkData] = useState([]);

  //state for set current page in the pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State for set total pages to display in the pagination
  const [totalPages, setTotalPages] = useState(0);

  // handle for change page number page value
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Fecth data when change current page and the status bar
  useEffect(() => {
    console.log(currentPage);
    console.log(`se debe realizar una consulta a con`);
    console.log(`start: ${(currentPage - 1) * NUMBER_ROW}`);
    console.log(`limit: ${NUMBER_ROW}`);
    console.log(`confirmed: ${statusConfirmed}`);

    axios
      .get(`${import.meta.env.VITE_API_URL}/volunteer/jobs-in-progress`, {
        params: {
          start: (currentPage - 1) * NUMBER_ROW,
          limit: NUMBER_ROW,
          confirmed: statusConfirmed,
        },
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.rows);
        setWorkData(response.data.rows);
        setTotalPages(Math.ceil(response.data.count / NUMBER_ROW));
      })
      .catch((error) => {
        console.error(error.response.data.data.error);
      });
  }, [currentPage, statusConfirmed]);

  // When change status view, the page number should be reset to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [statusConfirmed]);

  //   handle for show providers follow
  const handleFollow = () => {
    alert("Se debe implementar la funcion para hacerle seguimiento al trabajo");
  };

  // handle for remove or leave work and delete from the list
  const handleRemoveWork = () => {
    if (statusConfirmed) {
      alert(
        "Se debe abandonar el trabajo y eliminarlo de la lista de trabajos"
      );
    } else {
      alert(
        "Se debe cancelar la solicitud de trabajo y eliminarlo de la lista de trabajo"
      );
    }
  };

  return (

    // show message when work data is empty
    <div>
      <div>
        {statusConfirmed && workData.length === 0 && (
          <p>No tiene trabajos confirmados aún</p>
        )}
        {!statusConfirmed && workData.length === 0 && (
          <p>No ha hecho ninguna solicitud de trabajos aún</p>
        )}
      </div>
      {workData.map((row, index) => (
        <Card
          key={index}
          sx={{ marginBottom: "20px", border: "1px solid black" }}
        >
          <CardHeader
            action={
              !statusConfirmed ? null : (
                <Button
                  onClick={() => handleFollow()}
                  type="button"
                  variant="outlined"
                  color="primary"
                  startIcon={<VisibilityIcon />}
                >
                  Ver seguimiento
                </Button>
              )
            }
            title={row.work.title}
            subheader={`Trabajo ${
              row.work.type === 1 ? "recurrente" : "de sesión"
            }`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {row.work.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Button
              onClick={() => handleRemoveWork()}
              type="button"
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
            >
              {statusConfirmed ? "Abandonar tabajo" : "Cancelar solicitud"}
            </Button>
          </CardActions>
        </Card>
      ))}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          onChange={handlePageChange}
          page={currentPage}
          count={totalPages}
          variant="outlined"
          color="primary"
        />
      </Box>
    </div>
  );
}

// test data
const workDataConfirmed = [
  {
    id: 1,
    type: 1,
    title: "Trabajo de prueba 1",
    description:
      "Este es un trabajo para probar la renderización de la tarjeta",
    tags: ["tag1", "tag2", "tag3"],
    status: "confirmed",
  },
  {
    id: 2,
    type: 1,
    title: "Trabajo de prueba 2",
    description:
      "Este es un trabajo para probar la renderización de la tarjeta",
    tags: ["tag1", "tag2", "tag3"],
    status: "confirmed",
  },
  {
    id: 3,
    type: 1,
    title: "Trabajo de prueba 3",
    description:
      "Este es un trabajo para probar la renderización de la tarjeta",
    tags: ["tag1", "tag2", "tag3"],
    status: "confirmed",
  },
];
const workDataUnconfirmed = [
  {
    id: 1,
    type: 1,
    title: "Trabajo de prueba 3",
    description:
      "Este es un trabajo para probar la renderización de la tarjeta",
    tags: ["tag1", "tag2", "tag3"],
    status: "unconfirmed",
  },
  {
    id: 2,
    type: 1,
    title: "Trabajo de prueba 4",
    description:
      "Este es un trabajo para probar la renderización de la tarjeta",
    tags: ["tag1", "tag2", "tag3"],
    status: "unconfirmed",
  },
  {
    id: 3,
    type: 1,
    title: "Trabajo de prueba 5",
    description:
      "Este es un trabajo para probar la renderización de la tarjeta",
    tags: ["tag1", "tag2", "tag3"],
    status: "unconfirmed",
  },
];
