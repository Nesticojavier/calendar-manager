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
import { format, addDays } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { volunteerService } from "../../Services/Api/volunteerService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function ConfirmedListWorkVolunter({ statusConfirmed }) {
  const { profile } = useContext(UserContext);

  // Hook used for navigation to diferent pages
  const navigate = useNavigate();

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

  const [isRemoved, setIsRemoved] = useState(false);

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
        setIsRemoved(false);
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
  const handleWorkTracking = (workInstance) => {
    workInstance.work.blocks = JSON.parse(workInstance.work.blocks);
    workInstance.user = profile;
    navigate(`/volunteer/work-instance-tracking/${workInstance.id}`, {
      state: { workInstance, editMode: false },
    });
  };

  // handle for remove work and delete from the list
  const handleRemoveWork = (workId) => {
    volunteerService
      .cancelPostulation(workId)
      .then((response) => {
        setIsRemoved(true);
        Swal.fire({
          icon: "success",
          title: "Postulacion cancelada",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // handle for leave work and delete from the list
  const handleLeaveWork = (postulationId) => {
    volunteerService
      .leavePostulation(postulationId)
      .then((response) => {
        setIsRemoved(true);
        Swal.fire({
          icon: "success",
          title: "Trabajo abandonado",
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {workData.map((row, index) => (
          <Card
            key={index}
            sx={{
              marginBottom: "20px",
              border: "1px solid black",
              minWidth: 800,
            }}
          >
            <CardHeader
              action={
                !statusConfirmed ? null : (
                  <Button
                    onClick={() => handleWorkTracking(row)}
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
              <Divider sx={{ mb: 2 }} />
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Descripción:</strong> {row.work.description}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Fecha de inicio:</strong>{" "}
                  {format(
                    addDays(new Date(row.work.dateInit), 1),
                    "dd-MM-yyyy"
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Fecha de fin:</strong>{" "}
                  {format(addDays(new Date(row.work.dateEnd), 1), "dd-MM-yyyy")}
                </Typography>
                <Typography
                  component={"div"}
                  variant="body2"
                  color="text.secondary"
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <strong>Fecha de la propuesta:</strong>{" "}
                    {format(addDays(new Date(row.dateInit), 1), "dd-MM-yyyy")}
                    <Typography variant="body1">&nbsp;-&nbsp;</Typography>
                    {format(addDays(new Date(row.dateEnd), 1), "dd-MM-yyyy")}
                  </Box>
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box mb={2}>
                <Typography
                  component={"div"}
                  variant="body2"
                  color="text.secondary"
                >
                  <Box mb={0}>
                    <strong>Bloques:</strong>{" "}
                  </Box>{" "}
                  <br />
                  {row.work.blocks &&
                    JSON.parse(row.work.blocks).map((block, index) => (
                      <span key={index}>
                        <strong>Día:</strong> {block.day}
                        <Box component="span" mx={2} />
                        <strong>Hora:</strong> {block.hour}
                        {index < JSON.parse(row.work.blocks).length - 1 &&
                          ", "}{" "}
                        <br />
                      </span>
                    ))}
                </Typography>
              </Box>
            </CardContent>
            <CardActions disableSpacing>
              <Button
                onClick={() => {statusConfirmed ? handleLeaveWork(row.id): handleRemoveWork(row.work.id)}}
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
      </div>

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
