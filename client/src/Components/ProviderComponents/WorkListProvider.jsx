import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    Box,
    Card,
    CardHeader,
    IconButton,
    CardContent,
    Typography,
    CardActions,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export default function WorkListProvider() {

    const [workData, setWorkData] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const token = Cookies.get('token');
    const headers = { Authorization: `Bearer ${token}` };

    const handleDelete = (workId) => {
        axios
            .delete(`${import.meta.env.VITE_API_URL}/provider/job/${workId}`, { headers })
            .then((response) => {
                setIsDeleted(true)
                console.log(response.data.message);
            })
            .catch((error) => {
                console.error("Error al eliminar el trabajo:", error.response.data.message);
            });
    };

    const navigate = useNavigate();
    const handleEdit = (work) => {
        navigate(`/provider/workedit/${work.id}`, { state: { work } });
    };

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/provider/myJobs` , { headers })
            .then((response) => {
                setWorkData(response.data);
                setIsDeleted(false);
            })
            .catch((error) => {
                console.error(error.response.data.message);
            });
    }, [isDeleted]);

    return (
        <Box
            flex={7}
            p={2}
            sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
            {workData.map((work) => (
                <Card key={work.id} sx={{ marginBottom: '20px', border: '1px solid black'}}>
                    <CardHeader
                        action={
                            <IconButton onClick={() => handleEdit(work)}>
                                <EditIcon />
                            </IconButton>
                        }
                        title={work.title}
                        subheader={work.type}

                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {work.description}
                            {/* {work.tags} */}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="share" onClick={() => handleDelete(work.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </Box>

    )
}
