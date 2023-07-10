import React from "react";
import { Modal, Box, Typography, Divider } from "@mui/material";
import { format } from "date-fns";

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

export default function WorkModalProvider({
  modalOpen,
  handleModalClose,
  selectedWork,
}) {

  return (
    <Modal open={modalOpen} onClick={handleModalClose}>
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
                <strong>Fecha de inicio:</strong> {format(new Date(selectedWork.dateInit), "dd-MM-yyyy")}
              </p>
              <p style={{ marginBottom: "10px" }}>
                <strong>Fecha de fin:</strong> {format(new Date(selectedWork.dateEnd), "dd-MM-yyyy")}
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
          </Box>
        )}
      </Box>
    </Modal>
  );
}
