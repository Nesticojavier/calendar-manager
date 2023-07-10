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
  Divider,
} from "@mui/material";
import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { volunteerService } from "../../Services/Api/volunteerService";
import Swal from "sweetalert2";

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

  const [isRemoved, setIsRemoved] = useState(false)

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
        setIsRemoved(false)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage, statusConfirmed, isRemoved]);

  // When change status view, the page number should be reset to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [statusConfirmed]);

  //   handle for show providers follow
  const handleFollow = () => {
    alert("Se debe implementar la funcion para hacerle seguimiento al trabajo");
  };

  // handle for remove or leave work and delete from the list
  const handleRemoveWork = (workId) => {
    if (statusConfirmed) {
      alert(
        "Se debe abandonar el trabajo y eliminarlo de la lista de trabajos"
      );
    } else {
      volunteerService
        .cancelPostulation(workId)
        .then((response) => {
          setIsRemoved(true)
          Swal.fire({
            icon: "success",
            title: "Postulacion cancelada",
          });
        })
        .catch((error) => {
          console.error(error);
        });
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

