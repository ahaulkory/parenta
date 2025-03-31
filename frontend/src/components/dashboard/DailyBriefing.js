import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const DailyBriefing = ({ briefing }) => {
  // Données de démonstration si aucun briefing n'est fourni
  const demoBriefing = {
    message: "Lucas a soccer à 16h. Pluie attendue - prévoir équipement.",
    date: new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  };

  const data = briefing || demoBriefing;

  return (
    <StyledCard>
      <CardContent>
        <CardTitle variant="h6">BRIEFING DU JOUR</CardTitle>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" color="text.primary">
            {data.message}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default DailyBriefing;
