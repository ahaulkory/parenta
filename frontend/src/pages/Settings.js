// ✅ SETTINGS.JS complet, modulaire, connecté au backend avec API + Gmail + LOGS DEBUG

import React, { useState } from 'react';
import {
  Box, Container, Typography, List, ListItem, ListItemText, ListItemIcon,
  Divider, Paper, Button, Avatar, ListItemAvatar, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { GoogleLogin } from '@react-oauth/google';

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
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
  const [integrations, setIntegrations] = useState({
    gmail: false,
    outlook: false,
    googleCalendar: false,
  });

  const [children, setChildren] = useState([
    { id: 1, name: 'Lucas', age: 8 },
    { id: 2, name: 'Emma', age: 6 },
  ]);

  const [editDialog, setEditDialog] = useState({ open: false, label: '', value: '', onSave: () => {} });

  const openEditDialog = (label, currentValue, onSave) => {
    console.log(`📝 Ouverture du dialogue pour : ${label}`);
    setEditDialog({ open: true, label, value: currentValue, onSave });
  };

  const handleDialogSave = () => {
    console.log(`💾 Sauvegarde du champ : ${editDialog.label} = ${editDialog.value}`);
    editDialog.onSave(editDialog.value);
    setEditDialog({ ...editDialog, open: false });
  };

  const updateUserInfo = async (field, value) => {
    console.log(`🔄 Mise à jour utilisateur : ${field} = ${value}`);
    try {
      const response = await fetch(`/api/user/${field}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      });
      const result = await response.json();
      console.log('✅ Résultat:', result);
    } catch (error) {
      console.error(`❌ Erreur mise à jour ${field}:`, error);
    }
  };

  const addChild = async () => {
    console.log("👶 Bouton 'Ajouter un enfant' cliqué");
    const newChild = { name: 'Nouvel enfant', age: 0 };
    try {
      const res = await fetch('/api/children', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChild)
      });
      const created = await res.json();
      console.log("✅ Enfant ajouté :", created);
      setChildren([...children, created]);
    } catch (err) {
      console.error('❌ Erreur ajout enfant:', err);
    }
  };

  const updateChild = async (childId, updatedData) => {
    console.log(`🔄 Mise à jour enfant ID ${childId}`, updatedData);
    try {
      await fetch(`/api/children/${childId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      setChildren(
        children.map((c) => (c.id === childId ? { ...c, ...updatedData } : c))
      );
    } catch (err) {
      console.error('❌ Erreur mise à jour enfant:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mb: 8, mt: 2 }}>
        <PageTitle variant="h5">Paramètres</PageTitle>

        <SectionTitle variant="h6">Compte</SectionTitle>
        <SettingsCard>
          <List disablePadding>
            <ListItem>
              <ListItemIcon><PersonIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Nom" secondary="Jean Dupont" />
              <Button startIcon={<EditIcon />} size="small" variant="outlined"
                onClick={() => openEditDialog('Nom', 'Jean Dupont', (val) => updateUserInfo('name', val))}>
                Modifier
              </Button>
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemIcon><EmailIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Email" secondary="jean@exemple.fr" />
              <Button startIcon={<EditIcon />} size="small" variant="outlined"
                onClick={() => openEditDialog('Email', 'jean@exemple.fr', (val) => updateUserInfo('email', val))}>
                Modifier
              </Button>
            </ListItem>
          </List>
        </SettingsCard>

        <SectionTitle variant="h6">Intégrations</SectionTitle>
        <SettingsCard>
          <List disablePadding>
            <ListItem>
              <ListItemIcon><EmailIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Gmail" secondary="Non connecté" />
              <Box sx={{ ml: 1 }}>
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log("✅ Gmail connecté :", credentialResponse);
                    fetch(`${process.env.REACT_APP_API_URL}/auth/google`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ token: credentialResponse.credential })
                    })
                      .then(res => res.json())
                      .then(data => console.log("Réponse backend:", data))
                      .catch(err => console.error("Erreur Google login :", err));
                  }}
                  onError={() => console.log("❌ Erreur de connexion Google")}
                />
              </Box>
            </ListItem>

            <Divider component="li" />
            <ListItem>
              <ListItemIcon><CalendarMonthIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Google Calendar" secondary="Non connecté" />
            </ListItem>

            <Divider component="li" />
            <ListItem>
              <ListItemIcon><WbSunnyIcon color="primary" /></ListItemIcon>
              <ListItemText primary="OpenWeatherMap" secondary="Connecté" />
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
                    <Avatar sx={{ bgcolor: 'primary.main' }}><ChildCareIcon /></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={child.name} secondary={`${child.age} ans`} />
                  <Button startIcon={<EditIcon />} size="small" variant="outlined"
                    onClick={() => openEditDialog('Enfant', `${child.name},${child.age}`, (val) => {
                      const [name, age] = val.split(',');
                      updateChild(child.id, { name, age: parseInt(age) });
                    })}>
                    Modifier
                  </Button>
                </ListItem>
                {index < children.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
            <ListItem sx={{ mt: 1 }}>
              <Button startIcon={<AddIcon />} variant="contained" color="primary" fullWidth onClick={addChild}>
                Ajouter un enfant
              </Button>
            </ListItem>
          </List>
        </SettingsCard>

        <Dialog open={editDialog.open} onClose={() => setEditDialog({ ...editDialog, open: false })}>
          <DialogTitle>Modifier {editDialog.label}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              autoFocus
              label={editDialog.label}
              value={editDialog.value}
              onChange={(e) => setEditDialog({ ...editDialog, value: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog({ ...editDialog, open: false })}>Annuler</Button>
            <Button onClick={handleDialogSave} variant="contained">Enregistrer</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Settings;
