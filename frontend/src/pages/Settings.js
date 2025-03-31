import React, { useState } from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, Switch, Paper, Button, Avatar, ListItemAvatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(3),
}));

const SettingsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  marginBottom: theme.spacing(3),
}));

const Settings = () => {
  // États pour les intégrations
  const [integrations, setIntegrations] = useState({
    gmail: true,
    outlook: false,
    googleCalendar: true,
  });

  // Données de démonstration pour les enfants
  const [children, setChildren] = useState([
    { id: 1, name: 'Lucas', age: 8 },
    { id: 2, name: 'Emma', age: 6 },
  ]);

  const handleIntegrationChange = (integration) => {
    setIntegrations({
      ...integrations,
      [integration]: !integrations[integration],
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1, mb: 8, mt: 2 }}>
        <PageTitle variant="h5">Paramètres</PageTitle>
        
        <SectionTitle variant="h6">Compte</SectionTitle>
        <SettingsCard>
          <List disablePadding>
            <ListItem>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Nom" 
                secondary="Jean Dupont" 
              />
              <Button 
                startIcon={<EditIcon />} 
                size="small" 
                variant="outlined"
              >
                Modifier
              </Button>
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Email" 
                secondary="jean@exemple.fr" 
              />
              <Button 
                startIcon={<EditIcon />} 
                size="small" 
                variant="outlined"
              >
                Modifier
              </Button>
            </ListItem>
          </List>
        </SettingsCard>
        
        <SectionTitle variant="h6">Intégrations</SectionTitle>
        <SettingsCard>
          <List disablePadding>
            <ListItem>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Gmail" 
                secondary={integrations.gmail ? "Connecté" : "Non connecté"} 
              />
              <Switch
                edge="end"
                checked={integrations.gmail}
                onChange={() => handleIntegrationChange('gmail')}
                color="primary"
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Outlook" 
                secondary={integrations.outlook ? "Connecté" : "Non connecté"} 
              />
              <Switch
                edge="end"
                checked={integrations.outlook}
                onChange={() => handleIntegrationChange('outlook')}
                color="primary"
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemIcon>
                <CalendarMonthIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Google Calendar" 
                secondary={integrations.googleCalendar ? "Connecté" : "Non connecté"} 
              />
              <Switch
                edge="end"
                checked={integrations.googleCalendar}
                onChange={() => handleIntegrationChange('googleCalendar')}
                color="primary"
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemIcon>
                <WbSunnyIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="OpenWeatherMap" 
                secondary="Connecté" 
              />
              <Switch
                edge="end"
                checked={true}
                disabled
                color="primary"
              />
            </ListItem>
          </List>
        </SettingsCard>
        
        <SectionTitle variant="h6">Enfants</SectionTitle>
        <SettingsCard>
          <List disablePadding>
            {children.map((child, index) => (
              <React.Fragment key={child.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <ChildCareIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={child.name} 
                    secondary={`${child.age} ans`} 
                  />
                  <Button 
                    startIcon={<EditIcon />} 
                    size="small" 
                    variant="outlined"
                  >
                    Modifier
                  </Button>
                </ListItem>
                {index < children.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
            <ListItem sx={{ mt: 1 }}>
              <Button 
                startIcon={<AddIcon />} 
                variant="contained" 
                color="primary"
                fullWidth
              >
                Ajouter un enfant
              </Button>
            </ListItem>
          </List>
        </SettingsCard>
      </Box>
    </Container>
  );
};

export default Settings;
