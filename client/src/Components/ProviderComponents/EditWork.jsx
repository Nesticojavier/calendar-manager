import { Box } from "@mui/material";
import axios from "axios";
import "./WorkCreationForm.css";
import Cookies from "js-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WorkForm from "./WorkForm";

export default function EditWork() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: workId } = useParams();

  const {
    title,
    description,
    volunteerCountMax,
    type,
    dateInit,
    dateEnd,
    blocks: workBlocks,
    tags,
  } = location.state.work;

  const work = {
    workTitle: title,
    workDescription: description,
    workersNeeded: volunteerCountMax,
    workType: type,
    startDate: dateInit,
    endDate: dateEnd,
    tags: tags,
    blocks: workBlocks,
  };

  // Function for send new work data to backend
  const onSubmit = (valuesEnd) => {
    // get token from cookies
    const token = Cookies.get("token");
    // construct object representing an HTTP authorization header with the Bearer scheme.
    const headers = { Authorization: `Bearer ${token}` };
    console.log(valuesEnd);
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/provider/job/${workId}`,
        valuesEnd,
        {
          headers,
        }
      )
      .then((response) => {
        // Handle request response successful
        swal({
          title: "Trabajo actualizado exitosamente",
          icon: "success",
        }).then(() => {
          navigate(`/provider/worklist`);
        });
      })
      .catch((error) => {
        // Handle request error
        console.log("aqui");
        console.error(error.response.data.message);
      });
  };
  return (
    <Box flex={8} p={1}>
      <h1>Editar Trabajo: {work.workTitle}</h1>
      <WorkForm onSubmit={onSubmit} work={work} />
    </Box>
  );
}
