import React from 'react';
import { Box, Container, Grid, Typography, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EventIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const CalendarHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

const CalendarGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const DayCell = styled(Paper)(({ theme, isToday, isSelected }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  backgroundColor: isToday 
    ? theme.palette.primary.light 
    : isSelected 
      ? theme.palette.secondary.light 
      : theme.palette.background.paper,
  color: isToday || isSelected ? theme.palette.common.white : theme.palette.text.primary,
  '&:hover': {
    backgroundColor: isToday 
      ? theme.palette.primary.main 
      : isSelected 
        ? theme.palette.secondary.main 
        : theme.palette.action.hover,
  },
}));

const EventCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const AddButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 80,
  right: 16,
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const Calendar = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  
  // Données de démonstration pour les événements
  const events = [
    {
      id: 1,
      title: 'Médecin',
      time: '10:00',
      location: 'Dr. Martin - Lucas',
      date: new Date(2025, 2, 31) // 31 Mars 2025
    },
    {
      id: 2,
      title: 'Soccer',
      time: '16:00',
      location: 'Parc municipal',
      date: new Date(2025, 2, 31) // 31 Mars 2025
    }
  ];

  // Générer les jours du mois pour l'affichage du calendrier
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Ajuster pour commencer par lundi
    
    const days = [];
    
    // Jours du mois précédent
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i)
      });
    }
    
    // Jours du mois actuel
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: 
          today.getDate() === i && 
          today.getMonth() === month && 
          today.getFullYear() === year,
        date
      });
    }
    
    // Jours du mois suivant
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          day: i,
          isCurrentMonth: false,
          date: new Date(year, month + 1, i)
        });
      }
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  
  // Filtrer les événements pour la date sélectionnée
  const filteredEvents = events.filter(event => 
    event.date.getDate() === selectedDate.getDate() &&
    event.date.getMonth() === selectedDate.getMonth() &&
    event.date.getFullYear() === selectedDate.getFullYear()
  );

  // Changer de mois
  const changeMonth = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  // Formater le mois et l'année
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1, mb: 8, mt: 2 }}>
        <PageTitle variant="h5">Calendrier</PageTitle>
        
        <CalendarHeader>
          <IconButton onClick={() => changeMonth(-1)}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            {formatMonthYear(selectedDate)}
          </Typography>
          <IconButton onClick={() => changeMonth(1)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </CalendarHeader>
        
        <Grid container spacing={1} sx={{ mb: 3 }}>
          {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day, index) => (
            <Grid item xs={12/7} key={index}>
              <Typography variant="subtitle2" align="center" sx={{ fontWeight: 'bold' }}>
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>
        
        <CalendarGrid container spacing={1}>
          {calendarDays.map((day, index) => (
            <Grid item xs={12/7} key={index}>
              <DayCell 
                isToday={day.isToday}
                isSelected={
                  selectedDate.getDate() === day.date.getDate() &&
                  selectedDate.getMonth() === day.date.getMonth() &&
                  selectedDate.getFullYear() === day.date.getFullYear()
                }
                onClick={() => setSelectedDate(day.date)}
                elevation={1}
                sx={{
                  opacity: day.isCurrentMonth ? 1 : 0.5
                }}
              >
                {day.day}
              </DayCell>
            </Grid>
          ))}
        </CalendarGrid>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            <EventIcon sx={{ mr: 1 }} />
            Événements du jour ({selectedDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })})
          </Typography>
        </Box>
        
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.id} elevation={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {event.time} - {event.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.location}
              </Typography>
            </EventCard>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
            Aucun événement pour cette journée
          </Typography>
        )}
        
        <AddButton color="secondary" aria-label="add">
          <AddIcon />
        </AddButton>
      </Box>
    </Container>
  );
};

export default Calendar;
