import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

export default function WorkListProvider() {

    const [workData, setWorkData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/work")
            .then((response) => {
                setWorkData(response.data);
            })
            .catch((error) => {
                console.error(error.response.data.message);
            });
    }, []);

    return (
        <Box
            flex={4}
            p={2}
            sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        >
            {/* {workData.map((work) => ( */}
                <Card>
                <CardHeader
                    action={
                    <IconButton>
                        <EditIcon />
                    </IconButton>

                    }
                    title="Work Title"
                    subheader="Work Type"
                    // title={work.title}
                    // subheader={work.type}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    This is the description of the work
                    {/* {work.description} */}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="share">
                    <DeleteIcon />
                    </IconButton>
                </CardActions>
                </Card>
            {/* ))} */}
        </Box>

    )
}
