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
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import Cookies from "js-cookie";

export default function ConfirmedListWorkVolunter({
  statusConfirmed,
  currentPage,
}) {
  // needed by axios for auth
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  // constant to store the number of rows to display
  const NUMBER_ROW = 4;

  // State for store data from the fetch
  const [workData, setWorkData] = useState([]);

  // Fecth data when change current page and the status bar
  useEffect(() => {
    setWorkData(statusConfirmed ? workDataConfirmed : workDataUnconfirmed);
    console.log(currentPage);
    console.log(`se debe realizar una consulta a con`);
    console.log(`start: ${(currentPage - 1) * NUMBER_ROW}`);
    console.log(`limit: ${NUMBER_ROW}`);
    console.log(`confirmed: ${statusConfirmed}`);

    axios
      .get(`${import.meta.env.VITE_API_URL}/provider/myJobs`, {
        params: {
          start: (currentPage - 1) * NUMBER_ROW,
          limit: NUMBER_ROW,
          confirmed: statusConfirmed,
        },
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }, [currentPage, statusConfirmed]);

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
    <div>
      {workData.map((work) => (
        <Card
          key={work.id}
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
            title={work.title}
            subheader={`Trabajo ${
              work.type === 1 ? "recurrente" : "de sesión"
            }`}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {work.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Etiquetas:
              {work.tags &&
                work.tags.map((tag, index) => (
                  <span key={tag}>
                    {" "}
                    {tag}
                    {index < work.tags.length - 1 && ", "}
                  </span>
                ))}
            </Typography>
            <Typography>Estado: {work.status}</Typography>
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
