import { Box } from "@mui/material";
import "./WorkCreationForm.css";
import { useNavigate } from "react-router-dom";
import WorkForm from "./WorkForm";
import { providerService } from "../../Services/Api/providerService";
import Swal from "sweetalert2";

export default function CreateWork() {
  const navigate = useNavigate();

  // success alert
  const alertSuccess = () => {
    return new Promise((resolve) => {
      Swal.fire({
        icon: "success",
        title: "Trabajo creado exitosamente",
      }).then((result) => {
        resolve(); // return promise
      });
    });
  };

  // Function for send new work data to backend
  const onSubmit = (valuesEnd) => {
    providerService
      .createJob(valuesEnd)
      .then(() => {
        alertSuccess().then(() => {
          navigate(`/provider/worklist`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const work = {
    workTitle: "",
    workDescription: "",
    workersNeeded: "",
    workType: "",
    startDate: "",
    endDate: "",
    tags: [],
    blocks: [],
  };

  return (
    <Box flex={8} pt={5} px={40}>
      <h1>Crear Trabajo</h1>
      <WorkForm onSubmit={onSubmit} work={work} />
    </Box>
  );
}
