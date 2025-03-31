import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WeatherWidget from './WeatherWidget';

test('renders weather widget component with demo data', () => {
  render(<WeatherWidget />);
  
  // Vérifier que le titre est présent
  expect(screen.getByText('MÉTÉO')).toBeInTheDocument();
  
  // Vérifier que les données de démonstration sont présentes
  expect(screen.getByText(/18°C/i)).toBeInTheDocument();
  expect(screen.getByText(/Prévoir un imperméable/i)).toBeInTheDocument();
});
