import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalendarWidget from './CalendarWidget';

test('renders calendar widget component with demo data', () => {
  render(<CalendarWidget />);
  
  // Vérifier que le titre est présent
  expect(screen.getByText('CALENDRIER')).toBeInTheDocument();
  
  // Vérifier que les éléments de démonstration sont présents
  expect(screen.getByText('Aujourd\'hui:')).toBeInTheDocument();
  expect(screen.getByText(/Soccer/i)).toBeInTheDocument();
  expect(screen.getByText(/Devoirs/i)).toBeInTheDocument();
  
  // Vérifier que le bouton est présent
  expect(screen.getByText('Voir tout')).toBeInTheDocument();
});
