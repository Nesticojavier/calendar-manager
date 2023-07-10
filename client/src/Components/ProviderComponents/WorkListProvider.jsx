import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  Divider,
  Pagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { providerService } from "../../Services/Api/providerService";
import Swal from "sweetalert2";
import { format, addDays } from "date-fns";

export default function WorkListProvider() {
  // constant to store the number of rows to display
  const NUMBER_ROW = 4;

  // Hook for navigate
  const navigate = useNavigate();

  // states necessary
  const [workData, setWorkData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  //state for set current page in the pagination
  const [currentPage, setCurrentPage] = useState(1);

  // State for set total pages to display in the pagination
  const [totalPages, setTotalPages] = useState(0);

  // handle for change page number page value
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // alert for confirmation of work deletion
  const alertDeleteWork = () => {
    return new Promise((resolve, reject) => {
      Swal.fire({
        icon: "warning",
        title: "¿Seguro que deseas eliminar este trabajo?",
        html: "<p>Se perderán todas las postulaciones asociadas a este trabajo</p>",
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

  // handle to manage delete job request
  const handleDelete = (workId) => {
    alertDeleteWork()
      .then(() => {
        // call provider service
        providerService
          .deleteJob(workId)
          .then((response) => {
            setIsDeleted(true);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch(() => {});
  };

  // handle to navigate to edit form
  const handleEdit = (work) => {
    navigate(`/provider/workedit/${work.id}`, { state: { work } });
  };

  useEffect(() => {
    setIsDeleted(false);
    const start = (currentPage - 1) * NUMBER_ROW;
    const limit = NUMBER_ROW;
    providerService
      .getJobsPaginated(start, limit)
      .then((data) => {
        setWorkData(data.rows);
        setTotalPages(Math.ceil(data.count / NUMBER_ROW));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isDeleted, currentPage]);

  return (
    <Box
      flex={7}
      pt={5}
      px={25}
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
            <Divider sx={{ mb: 2 }} />
            <Box mb={2}>
              <Typography variant="body2" color="text.secondary">
                <strong>Descripción: </strong> {work.description}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box mb={2}>
              <Typography variant="body2" color="text.secondary">
                <strong>Fecha de inicio: </strong>{" "}
                {format(addDays(new Date(work.dateInit), 1), "dd-MM-yyyy")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong> Fecha de fin: </strong>{" "}
                {format(addDays(new Date(work.dateEnd), 1), "dd-MM-yyyy")}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box mb={2}>
              <Typography variant="body2" color="text.secondary">
                <Box mb={1}>
                  <strong> Bloques: </strong>
                </Box>
                {work.blocks &&
                  work.blocks.map((block) => (
                    <Box mb={1} key={block.id}>
                      <Typography variant="body2" color="text.secondary">
                        <strong> Día: </strong> {block.day}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong> Hora: </strong> {block.hour}
                      </Typography>
                    </Box>
                  ))}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              <strong> Etiquetas: </strong>
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

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          onChange={handlePageChange}
          page={currentPage}
          count={totalPages}
          variant="outlined"
          color="primary"
        />
      </Box>
    </Box>
  );
}
