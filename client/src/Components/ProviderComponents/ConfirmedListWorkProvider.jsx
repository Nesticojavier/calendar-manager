import React, { useEffect, useState } from "react";
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
import axios from "axios";
import Cookies from "js-cookie";

export default function ConfirmedListWorkProvider({ statusConfirmed }) {
  // Hook used for navigation to diferent pages
  const navigate = useNavigate();

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

  // States used to crontrol the windows modal with volunteer info
  const [openModal, setOpenModal] = useState(false);

  // States used to store volunteer selected to display
  const [selectedUser, setSelectedUser] = useState(null);

  // handle for change page number page value
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Fecth data when change current page and the status bar
  useEffect(() => {
    // setWorkData(statusConfirmed ? workDataConfirmed : workDataUnconfirmed);
    console.log(currentPage);
    console.log(`se debe realizar una consulta a con`);
    console.log(`start: ${(currentPage - 1) * NUMBER_ROW}`);
    console.log(`limit: ${NUMBER_ROW}`);
    console.log(`confirmed: ${statusConfirmed}`);

    axios
      .get(`${import.meta.env.VITE_API_URL}/provider/jobs-in-progress`, {
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

  // Handle for show volunteer data that make request
  const handleShowVolunteer = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  //  handle for make follow up by provider
  const handleWorkTracking = (work) => {
    navigate(`/provider/work-instance-tracking/${work.id}`, {
      state: { work },
    });
  };

  // handle for accept the volunteer work
  const handleAcceptWork = () => {
    alert(
      "Se debe implementar la duncion para aceptar el trabajo por parte del proveedor"
    );
  };

  // handle for decline the volunteer work
  const handleDeclineWork = () => {
    alert(
      "Se debe implementar la duncion para declinar el trabajo por parte del proveedor"
    );
  };

  return (
    <div>
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
                onClick={() => handleWorkTracking(work)}
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
                  onClick={() => handleAcceptWork()}
                  type="button"
                  variant="outlined"
                  color="success"
                  startIcon={<CheckCircleIcon />}
                >
                  Aceptar
                </Button>
                <Button
                  onClick={() => handleDeclineWork()}
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
