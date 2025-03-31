import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';

import theme from './styles/theme';
import Header from './components/layout/Header';
import Navigation from './components/layout/Navigation';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Lists from './pages/Lists';
import Settings from './pages/Settings';

import './App.css';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerWidth = 240;

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {[
          { text: 'Accueil', icon: <HomeIcon />, path: '/' },
          { text: 'Calendrier', icon: <CalendarMonthIcon />, path: '/calendar' },
          { text: 'Listes', icon: <ListAltIcon />, path: '/lists' },
          { text: 'Paramètres', icon: <SettingsIcon />, path: '/settings' },
        ].map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component="a" 
            href={item.path}
            onClick={toggleDrawer}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header toggleDrawer={toggleDrawer} />
          
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          
          <Box component="main" sx={{ flexGrow: 1, pb: 7 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/lists" element={<Lists />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
          
          <Navigation />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
