import { Box, Dialog, DialogTitle, DialogContent, Divider} from "@mui/material";

export default function WorkInfoDialog() {
    return (
        <Dialog>
          <DialogTitle sx={{ textAlign: 'center' }}>
            <strong>Información del trabajo</strong>
          </DialogTitle>

          <DialogContent>
            {selectedWork && (
              <Box>
                <Box sx={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px' }}>
                    <strong>Título:</strong> {selectedWork.title}
                  </p>
                  <Divider sx={{ borderBottom: '1px solid gray', margin: '10px 0' }}/>
                </Box>
                <Box sx={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px' }}>
                    <strong>Descripción:</strong> {selectedWork.description}
                  </p>
                  <Divider sx={{ borderBottom: '1px solid gray', margin: '10px 0' }}/>
                </Box>
                <Box sx={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px' }}>
                    <strong>Tipo:</strong>{" "}
                    {`Trabajo ${selectedWork.type === 1 ? "recurrente" : "de sesión"}`}
                  </p>
                  <Divider sx={{ borderBottom: '1px solid gray', margin: '10px 0' }}/>
                </Box>
                <Box sx={{ marginBottom: '20px' }}>
                  <p>
                    <strong>Fecha de inicio:</strong> {selectedWork.dateInit}
                  </p>
                  <p style={{ marginBottom: '10px' }}>
                    <strong>Fecha de fin:</strong> {selectedWork.dateEnd}
                  </p>
                  <Divider sx={{ borderBottom: '1px solid gray', margin: '10px 0' }}/>
                </Box>
                <Box sx={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px' }}>
                    <strong>Bloques:</strong>
                  </p>
                  <ul>
                    {selectedWork.blocks.map((block) => (
                      <div key={block.id}>
                        <p>
                          <strong>Día:</strong> {block.day}
                        </p>
                        <p style={{ marginBottom: '10px' }}>
                          <strong>Hora:</strong> {block.hour}
                        </p>
                      </div>
                    ))}
                  </ul>
                  <Divider sx={{ borderBottom: '1px solid gray', margin: '10px 0' }}/>
                </Box>

                <p style={{ marginBottom: '10px' }}>
                  <strong>Etiquetas:</strong>
                </p>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {selectedWork.tags.map((tag) => (
                    <Box
                      key={tag}
                      sx={{
                          border: "1px solid gray",
                          borderRadius: "20px",
                          padding: "5px 10px",
                          backgroundColor: "lightgray" }}>
                      {tag}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

          </DialogContent>
        </Dialog>
    )
  }
