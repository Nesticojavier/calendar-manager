import React, { useEffect } from "react";
import { Modal, Box, Typography, Divider, Button } from "@mui/material";
import DateRange from "./DateRange";
import { addDays, format } from "date-fns";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function WorkModalVolunteer({
  modalOpen,
  handleModalClose,
  selectedWork,
  handlePostulation,
  handleDateChange,
}) {

  const RECURRENT = selectedWork && selectedWork.type === 1;
  const SESSION = selectedWork && selectedWork.type === 2;

  useEffect(() => {
    if (SESSION) {
      handleDateChange([selectedWork.dateInit, selectedWork.dateEnd]);
    }
  }, [selectedWork, handleDateChange]);

  return (
    <Modal open={modalOpen}>
      <Box sx={style}>
        <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
          <strong>Información del trabajo</strong>
        </Typography>
        {selectedWork && (
          <Box>
            <Box sx={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "10px", marginTop: "10px" }}>
                <strong>Título:</strong> {selectedWork.title}
              </p>
              <Divider
                sx={{ borderBottom: "1px solid gray", margin: "10px 0" }}
              />
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "10px" }}>
                <strong>Descripción:</strong> {selectedWork.description}
              </p>
              <Divider
                sx={{ borderBottom: "1px solid gray", margin: "10px 0" }}
              />
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "10px" }}>
                <strong>Tipo:</strong>{" "}
                {`Trabajo ${
                  selectedWork.type === 1 ? "recurrente" : "de sesión"
                }`}
              </p>
              <Divider
                sx={{ borderBottom: "1px solid gray", margin: "10px 0" }}
              />
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <p>
                <strong>Fecha de inicio:</strong>{" "}
                {format(
                  addDays(new Date(selectedWork.dateInit), 1),
                  "dd-MM-yyyy"
                )}
              </p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Fecha de fin:</strong>{" "}
                {format(
                  addDays(new Date(selectedWork.dateEnd), 1),
                  "dd-MM-yyyy"
                )}
              </p>
              <Divider
                sx={{ borderBottom: "1px solid gray", margin: "10px 0" }}
              />
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
              <p style={{ marginBottom: "10px" }}>
                <strong>Bloques</strong>
              </p>
              <ul>
                {selectedWork.blocks.map((block, index) => (
                  <div key={index}>
                    <p>
                      <strong>Día:</strong> {block.day}
                    </p>
                    <p style={{ marginBottom: "10px" }}>
                      <strong>Hora:</strong> {block.hour}
                    </p>
                  </div>
                ))}
              </ul>
              <Divider
                sx={{ borderBottom: "1px solid gray", margin: "10px 0" }}
              />
            </Box>

            <p style={{ marginBottom: "10px" }}>
              <strong>Etiquetas:</strong>
            </p>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {selectedWork.tags.map((tag, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid gray",
                    borderRadius: "20px",
                    padding: "5px 10px",
                    backgroundColor: "lightgray",
                  }}
                >
                  {tag}
                </Box>
              ))}
            </Box>

            {RECURRENT && (
              <>
                <Divider
                  sx={{
                    borderBottom: "1px solid gray",
                    margin: "10px 0",
                    marginBottom: "20px",
                  }}
                />
                <p style={{ marginBottom: "15px" }}>
                  <strong>
                    Seleccione las fechas en la que desea realizar el
                    voluntariado:
                  </strong>
                </p>
                <DateRange
                  onChange={handleDateChange}
                  minDate={new Date()}
                  maxDate={addDays(new Date(selectedWork.dateEnd), 1)}
                />
              </>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              <Button onClick={handleModalClose} variant="outlined">
                Cerrar
              </Button>
              <Button
                variant="contained"
                onClick={() => handlePostulation(selectedWork.id)}
              >
                Postularse
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
