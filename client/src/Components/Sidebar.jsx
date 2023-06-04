import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SummarizeIcon from '@mui/icons-material/Summarize'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const handleListItemClick = (event, index) => {
    // event.preventDefault();
    setSelectedIndex(index)
  }

  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      borderRight={1}
      borderColor="divider"
    >
      <List sx={{ marginTop: '20px' }}>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            // component="a"
            to="/WorkCreation"
            // href="/WorkCreation"
            selected={selectedIndex === 0}
            onClick={(event) =>
              handleListItemClick(event, 0)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#fbc2eb',
                color: 'black',
                '&:hover': { backgroundColor: '#d8b7f7' }
              }
            }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Crear trabajo voluntario" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            // component="a"
            // href="/WorkList"
            component={NavLink}
            to="/WorkList"
            selected={selectedIndex === 1}
            onClick={(event) =>
              handleListItemClick(event, 1)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#fbc2eb',
                color: 'black',
                '&:hover': { backgroundColor: '#d8b7f7' }
              }
            }}
          >
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary="Ver trabajos existentes" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            // component="a"
            // href="/dashboard"
            component={NavLink}
            to="/dashboard"
            selected={selectedIndex === 2}
            onClick={(event) =>
              handleListItemClick(event, 2)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#fbc2eb',
                color: 'black',
                '&:hover': { backgroundColor: '#d8b7f7' }
              }
            }}
          >
            <ListItemIcon>
              <CalendarMonthIcon />
            </ListItemIcon>
            <ListItemText primary="Ver calendario" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
