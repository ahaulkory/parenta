import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${theme.palette.secondary.main} 100%)`,
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
  color: theme.palette.secondary.contrastText,
  marginBottom: theme.spacing(1),
}));

const WeatherWidget = ({ weather }) => {
  // Données de démonstration si aucune météo n'est fournie
  const demoWeather = {
    temperature: 18,
    condition: 'nuageux',
    suggestion: 'Prévoir un imperméable',
    icon: 'cloud'
  };

  const data = weather || demoWeather;

  const getWeatherIcon = (iconType) => {
    switch (iconType) {
      case 'sun':
        return <WbSunnyIcon fontSize="large" />;
      case 'rain':
        return <UmbrellaIcon fontSize="large" />;
      case 'cloud':
      default:
        return <CloudIcon fontSize="large" />;
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <CardTitle variant="h6">MÉTÉO</CardTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          {getWeatherIcon(data.icon)}
          <Typography variant="h5" sx={{ ml: 1 }}>
            {data.temperature}°C {data.condition}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {data.suggestion}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default WeatherWidget;
