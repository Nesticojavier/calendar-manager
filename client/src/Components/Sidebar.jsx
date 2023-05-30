import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SummarizeIcon from '@mui/icons-material/Summarize'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import React from 'react'

export default function Sidebar() {
  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
      borderRight={1}
      borderColor="divider"
    >
      <List sx={{ marginTop: '20px'}}>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#WorkCreationForm">
              <ListItemIcon>
                <AddIcon/>
              </ListItemIcon>
              <ListItemText primary="Crear trabajo voluntario" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="another-component">
              <ListItemIcon>
                <SummarizeIcon/>
              </ListItemIcon>
              <ListItemText primary="Ver trabajos existentes" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="another-component">
              <ListItemIcon>
                <CalendarMonthIcon/>
              </ListItemIcon>
              <ListItemText primary="Ver calendario" />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  )
}
