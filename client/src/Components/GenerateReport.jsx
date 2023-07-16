import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { reportsService } from "../Services/Api/reportsService";

export default function GenerateReport({ handleClose, user_id, role }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // state to set error message
  const [showError, setShowError] = useState(false);

  // handle submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    // validation of void data
    if (role === "proveedor") {
      if (selectedOption.info === "" || selectedOption.format === "") {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1000);
        return;
      }
    } else if (role === "voluntario") {
      if (selectedOption.format === "") {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 1000);
        return;
      }
    }

    // send form data
    const values = {
      user_id: user_id,
      startDate: startDate,
      endDate: endDate,
      format: selectedOption.format,
    };

    if (role === "proveedor") {
      if (selectedOption.info === "tracking") {
        reportsService
          .getProviderTrackingReport(values)
          .then((response) => {
            const pdfBlob = new Blob([response], { type: "application/pdf" });
            saveAs(pdfBlob, "newPdf.pdf");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        reportsService
          .getProviderPostulationsReport(values)
          .then((response) => {
            const pdfBlob = new Blob([response], { type: "application/pdf" });
            saveAs(pdfBlob, "newPdf.pdf");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else if (role === "voluntario") {
      console.log(values);
    }
  };

  const [selectedOption, setSelectedOption] = useState({
    info: "",
    format: "",
  });

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setSelectedOption((prevSelectedOption) => ({
      ...prevSelectedOption,
      [name]: value,
    }));
    setShowError(false);
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <h1>Generar reporte</h1>

        {/* display iff user is provider */}
        {role === "proveedor" && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: 100 }} htmlFor="">
              Información:
            </label>
            <select
              onChange={handleSelectChange}
              className="date-picker-input"
              value={selectedOption.info}
              name="info"
            >
              <option value="">Seleccionar</option>
              <option value="postulation">Postulaciones</option>
              <option value="tracking">Seguimiento</option>
            </select>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ width: 100 }} htmlFor="">
            Formato:
          </label>
          <select
            onChange={handleSelectChange}
            className="date-picker-input"
            value={selectedOption.format}
            name="format"
          >
            <option value="">Seleccionar</option>
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {showError && (
            <p style={{ color: "red" }}>Debe llenar los campos obligatorios</p>
          )}
        </div>

        <label htmlFor="">Especificar intervalo de fechas (opcional)</label>

        <div style={{ display: "flex", alignItems: "center" }}>
          <DatePicker
            dateFormat="dd-MM-yyyy"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="date-picker-input"
            placeholderText="Desde"
          />
          <Typography variant="body1">-</Typography>
          <DatePicker
            dateFormat="dd-MM-yyyy"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="date-picker-input"
            placeholderText="Hasta"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            endIcon={<DownloadOutlinedIcon />}
          >
            Descargar
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "white",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 10,
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   flexDirection: "column",
// };

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
  display: "flex",
  flexDirection: "column",
};
