import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DailyBriefing from './DailyBriefing';

test('renders daily briefing component with demo data', () => {
  render(<DailyBriefing />);
  
  // Vérifier que le titre est présent
  expect(screen.getByText('BRIEFING DU JOUR')).toBeInTheDocument();
  
  // Vérifier que le message de démonstration est présent
  expect(screen.getByText(/Lucas a soccer à 16h/i)).toBeInTheDocument();
});
