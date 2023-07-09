import React, { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Pagination,
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { volunteerService } from "../../Services/Api/volunteerService";

export default function ConfirmedListWorkVolunter({ statusConfirmed }) {
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
    const start = (currentPage - 1) * NUMBER_ROW;
    const limit = NUMBER_ROW;
    const confirmed = statusConfirmed;
    volunteerService
      .jobsInProgress(start, limit, confirmed)
      .then((response) => {
        setWorkData(response.rows);
        setTotalPages(Math.ceil(response.count / NUMBER_ROW));
      })
      .catch((error) => {
        console.error(error);
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
              Descripción: {row.work.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fecha de inicio: {row.work.dateInit}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fecha de fin: {row.work.dateEnd}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bloques: <br/>
              {row.work.blocks &&
                JSON.parse(row.work.blocks).map((block, index) => (
                  <span key={block}>
                    Día: {block.day} Hora: {block.hour}
                    {index < JSON.parse(row.work.blocks).length - 1 && ", "} <br/>
                  </span>
                ))}
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
              {statusConfirmed ? "Abandonar trabajo" : "Cancelar solicitud"}
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