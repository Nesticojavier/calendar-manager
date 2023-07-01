import { Box } from "@mui/material";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function WorkInstanceTraking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: workId } = useParams();

  console.log(location.state.work);

  // TODO: request work tracking data from the backend


  return (
    <Box
      flex={8}
      p={1}
    >
      hola
    </Box>
  );
}

// Test data
const workInstanceTracking = [
  {
    week : 1,
    day: 'Lunes',
    date: '2023-06-08',
    hour: '9:00 AM',
    attendance: true
  },
  {
    week : 1,
    day: 'Martes',
    date: '2023-06-08',
    hour: '9:00 AM',
    attendance: true
  },
  {
    week : 2,
    day: 'Lunes',
    date: '2023-06-08',
    hour: '9:00 AM',
    attendance: true
  },
  {
    week : 2,
    day: 'Martes',
    date: '2023-06-08',
    hour: '9:00 AM',
    attendance: true
  },
  {
    week : 3,
    day: 'Lunes',
    date: '2023-06-08',
    hour: '9:00 AM',
    attendance: true
  },
  {
    week : 3,
    day: 'Martes',
    date: '2023-06-08',
    hour: '9:00 AM',
    attendance: true
  },
  {
    week : 4,
    day: 'Lunes',
    date: '2023-06-08',
    hour: '9:00 AM',
    attendance: true
  },
  {
    week : 4,
    day: 'Martes',
    date: '2023-06-08',
    hour: '9:00 AM',
    attendance: true
  },
  {
    week : 5,
    day: 'Lunes',
    date: '2023-06-08',
    hour: '9:00 AM',
    attendance: true
  },
  {
    week : 5,
    day: 'Martes',
    date: '2023-06-08',
    hour: '9:00 AM',
    attendance: true
  },
]
