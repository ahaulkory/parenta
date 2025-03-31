import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DailyBriefing from '../components/dashboard/DailyBriefing';
import WeatherWidget from '../components/dashboard/WeatherWidget';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import TodoList from '../components/dashboard/TodoList';

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const Dashboard = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1, mb: 8, mt: 2 }}>
        <PageTitle variant="h5">Tableau de bord</PageTitle>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DailyBriefing />
          </Grid>
          
          <Grid item xs={12}>
            <WeatherWidget />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <CalendarWidget />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TodoList />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
