import { Box } from "@mui/material";
import axios from "axios";
import "./WorkCreationForm.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import WorkForm from "./WorkForm";

export default function CreateWork() {
  const navigate = useNavigate();

  // Function for send new work data to backend
  const onSubmit = (valuesEnd) => {
    // get token from cookies
    const token = Cookies.get("token");
    // construct object representing an HTTP authorization header with the Bearer scheme.
    const headers = { Authorization: `Bearer ${token}` };
    console.log(valuesEnd);
    axios
      .post(`${import.meta.env.VITE_API_URL}/provider/create`, valuesEnd, {
        headers,
      })
      .then((response) => {
        // Handle request response successful
        swal({
          title: "Trabajo creado exitosamente",
          icon: "success",
        }).then(() => {
          navigate(`/provider/worklist`);
        });
      })
      .catch((error) => {
        // Handle request error
        console.error(error.response.data.data.error)
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
    <Box flex={8} pt={5}>
      <h1>Crear Trabajo</h1>
      <WorkForm onSubmit={onSubmit} work={work} />
    </Box>
  );
}
