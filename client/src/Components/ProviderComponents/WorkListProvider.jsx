import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { providerService } from "../../Services/Api/providerService";

export default function WorkListProvider() {
  // Hook for navigate
  const navigate = useNavigate();

  // states necessary
  const [workData, setWorkData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  // handle to delete job selected
  const handleDelete = (workId) => {
    providerService.deleteJob(workId)
      .then((response) => {
        setIsDeleted(true);
      })
      .catch((error) => {
        console.error(error)
      })
  };

  // handle to navigate to edit form
  const handleEdit = (work) => {
    navigate(`/provider/workedit/${work.id}`, { state: { work } });
  };
  
  useEffect(() => {
    providerService.getJobs()
      .then((workList) => {
        setWorkData(workList);
      })
      .catch((error) => {
        console.error(error)
      })

  }, [isDeleted]);

  return (
    <Box
      flex={7}
      pt={5}
      px={40}
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {workData.map((work) => (
        <Card
          key={work.id}
          sx={{ marginBottom: "20px", border: "1px solid black" }}
        >
          <CardHeader
            action={
              <IconButton onClick={() => handleEdit(work)}>
                <EditIcon />
              </IconButton>
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
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="share"
              onClick={() => handleDelete(work.id)}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
