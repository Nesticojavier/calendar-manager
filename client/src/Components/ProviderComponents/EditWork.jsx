import { Box, Button } from "@mui/material";
import "./WorkCreationForm.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WorkForm from "./WorkForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { providerService } from "../../Services/Api/providerService";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

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
  // to display alert with message
  const showAlert = (message, icon) => {
    return new Promise((resolve) => {
      Swal.fire({
        icon,
        title: message,
      }).then((result) => {
        resolve(); // return promise
      });
    });
  };

  // Function for send new work data to backend
  const onSubmit = (data) => {
    if (data.workType === 2) {
      data.blocks[0].day = data.startDate;
    }
    providerService
      .editJob(data, workId)
      .then(() => {
        showAlert("Trabajo actualizado exitosamente", "success")
        .then(() => {
          navigate(`/provider/worklist`);
        });
      })
      .catch((error) => {
        console.log(error);
        showAlert(error.response.data.data.error, "warning");
      });
  };

  const [tagsDB, setTags] = useState([]);

  useEffect(() => {
    providerService
      .getTags()
      .then((response) => {
        const titles = response.map((tag) => tag.title);
        setTags(titles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box flex={8} pt={5} px={40}>
      <Button onClick={() => window.history.back()}>
        <ArrowBackIcon />
      </Button>
      <h1>Editar Trabajo: {work.workTitle}</h1>
      <WorkForm onSubmit={onSubmit} work={work} edit={true} tagsDB={tagsDB} />
    </Box>
  );
}
