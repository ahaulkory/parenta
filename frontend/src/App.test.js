import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock des composants pour éviter les erreurs de rendu
jest.mock('./components/layout/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('./components/layout/Navigation', () => () => <div data-testid="mock-navigation">Navigation</div>);
jest.mock('./pages/Dashboard', () => () => <div data-testid="mock-dashboard">Dashboard</div>);
jest.mock('./pages/Calendar', () => () => <div data-testid="mock-calendar">Calendar</div>);
jest.mock('./pages/Lists', () => () => <div data-testid="mock-lists">Lists</div>);
jest.mock('./pages/Settings', () => () => <div data-testid="mock-settings">Settings</div>);

test('renders app structure with header and navigation', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  // Vérifier que les composants principaux sont rendus
  expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  expect(screen.getByTestId('mock-navigation')).toBeInTheDocument();
  expect(screen.getByTestId('mock-dashboard')).toBeInTheDocument();
});
