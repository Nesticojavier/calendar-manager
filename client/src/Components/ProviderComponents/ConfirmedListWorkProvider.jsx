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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function ConfirmedListWorkProvider({statusConfirmed}) {
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
