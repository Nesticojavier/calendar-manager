import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ShowVolunteerInfo from "./ShowVolunteerInfo";
import {
  Box,
  Pagination,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";

import ChecklistIcon from "@mui/icons-material/Checklist";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { providerService } from "../../Services/Api/providerService";

export default function ConfirmedListWorkProvider({ statusConfirmed }) {
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

  // States used to crontrol the windows modal with volunteer info
  const [openModal, setOpenModal] = useState(false);

  // States used to store volunteer selected to display
  const [selectedUser, setSelectedUser] = useState(null);

  // handle for change page number page value
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // state for change monitoring when is decline a work require
  const [isDeletedOrAccept, setIsDeletedOrAccept] = useState(false);

  // Fecth data when change current page and the status bar
  useEffect(() => {
    const start = (currentPage - 1) * NUMBER_ROW;
    const limit = NUMBER_ROW;
    const confirmed = statusConfirmed;

    providerService
      .getPostulations(start, limit, confirmed)
      .then((response) => {
        setWorkData(response.rows);
        setTotalPages(Math.ceil(response.count / NUMBER_ROW));
        setIsDeletedOrAccept(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage, statusConfirmed, isDeletedOrAccept]);

  // When change status view, the page number should be reset to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [statusConfirmed]);

  // Handle for show volunteer data that make request
  const handleShowVolunteer = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  //  handle for make follow up by provider
  const handleWorkTracking = (workInstance) => {
    workInstance.work.blocks = JSON.parse(workInstance.work.blocks);
    navigate(`/provider/work-instance-tracking/${workInstance.id}`, {
      state: { workInstance },
    });
  };

  // handle for accept the volunteer work
  const handleAcceptWork = (postulationID) => {
    providerService
      .acceptPostulation(postulationID)
      .then(() => {
        setIsDeletedOrAccept(true);
        showSuccessAlert("Solicitud aceptada");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // handle for decline the volunteer postulation
  const handleDeclineWork = (postulationID) => {
    alertDeclinePostulation()
      .then(() => {
        // call provider service
        providerService
          .declinePostulation(postulationID)
          .then((response) => {
            setIsDeletedOrAccept(true);
            showSuccessAlert("solicitud eliminada");
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch(() => {});
  };

  // alert for confirmation of decline postulation
  const alertDeclinePostulation = () => {
    return new Promise((resolve, reject) => {
      Swal.fire({
        icon: "warning",
        title: "¿Seguro que deseas eliminar la solicitud del voluntario?",
        html: "<p>El voluntario podrá volver a postularse</p>",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Si",
        iconColor: "red",
        confirmButtonColor: "red",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(); // return promise if user select 'si'
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          reject(); // decliene promise if user select 'no'
        }
      });
    });
  };

  // Alert used for success operation
  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: "success",
      title: message,
    });
  };

  return (
    <div>
      <div>
        {statusConfirmed && workData.length === 0 && (
          <p>No tiene trabajos en curso aún</p>
        )}
        {!statusConfirmed && workData.length === 0 && (
          <p>No tiene solicitudes de trabajos</p>
        )}
      </div>
      {workData.map((row, index) => (
        <Card
          key={index}
          sx={{ marginBottom: "20px", border: "1px solid black" }}
        >
          <CardHeader
            action={
              <Tooltip title="ver información del voluntario">
                <Chip
                  onClick={() => handleShowVolunteer(row.user)}
                  color="primary"
                  icon={<PersonIcon />}
                  label={row.user.credential.username}
                  variant="outlined"
                />
              </Tooltip>
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
            {statusConfirmed ? (
              <Button
                onClick={() => handleWorkTracking(row)}
                type="button"
                variant="contained"
                color="primary"
                startIcon={<ChecklistIcon />}
              >
                Hacer Seguimiento
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => handleAcceptWork(row.id)}
                  type="button"
                  variant="outlined"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                >
                  Aceptar
                </Button>
                <Button
                  onClick={() => handleDeclineWork(row.id)}
                  type="button"
                  variant="outlined"
                  color="error"
                  startIcon={<ClearIcon />}
                >
                  Declinar
                </Button>
              </>
            )}
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

      {openModal && (
        <ShowVolunteerInfo
          user={selectedUser}
          handleClose={() => setOpenModal(false)}
        />
      )}
    </div>
  );
}