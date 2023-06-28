import React, { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";


export default function ConfirmedListWorkProvider({ statusConfirmed }) {

  const navigate = useNavigate();
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

  //
  const [workData, setWorkData] = useState(
    statusConfirmed ? workDataConfirmed : workDataUnconfirmed
  );

  useEffect(() => {
    setWorkData(statusConfirmed ? workDataConfirmed : workDataUnconfirmed);
  }, [statusConfirmed]);

  // Handle for show volunteer data that make request
  const handleShowVolunteer = () => {
    alert("Mostrar datos del voluntario que hace la petición al trabajo");
  };

  //  handle for make follow up by provider
  const handleWorkTracking = (work) => {
    navigate(`/provider/work-instance-tracking/${work.id}`, { state: { work } });
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
      {workData.map((work) => (
        <Card
          key={work.id}
          sx={{ marginBottom: "20px", border: "1px solid black" }}
        >
          <CardHeader
            action={
              <Button
                onClick={() => handleShowVolunteer()}
                type="button"
                variant="outlined"
                color="primary"
                startIcon={<VisibilityIcon />}
              >
                Ver Voluntario
              </Button>
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
    </div>
  );
}
