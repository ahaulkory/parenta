import React from 'react';
import { Card, CardContent, Typography, Box, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '20',
  },
}));

const CalendarWidget = ({ events }) => {
  // Données de démonstration si aucun événement n'est fourni
  const demoEvents = [
    {
      id: 1,
      title: 'Soccer',
      time: '16h00',
      location: 'Parc municipal'
    },
    {
      id: 2,
      title: 'Devoirs',
      time: '18h00',
      location: 'Maison'
    }
  ];

  const todaysEvents = events || demoEvents;

  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarTodayIcon color="primary" sx={{ mr: 1 }} />
          <CardTitle variant="h6">CALENDRIER</CardTitle>
        </Box>
        
        <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
          Aujourd'hui:
        </Typography>
        
        <List sx={{ width: '100%', p: 0 }}>
          {todaysEvents.map((event, index) => (
            <React.Fragment key={event.id}>
              <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                <ListItemText
                  primary={`${event.time} - ${event.title}`}
                  secondary={event.location}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
              {index < todaysEvents.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
        
        <ViewAllButton 
          endIcon={<ArrowForwardIcon />} 
          size="small"
          variant="text"
        >
          Voir tout
        </ViewAllButton>
      </CardContent>
    </StyledCard>
  );
};

export default CalendarWidget;
