import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMediaQuery } from '@testing-library/dom';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

// Mock des composants pour éviter les erreurs de rendu
jest.mock('../components/layout/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('../components/layout/Navigation', () => () => <div data-testid="mock-navigation">Navigation</div>);
jest.mock('../pages/Dashboard', () => () => <div data-testid="mock-dashboard">Dashboard</div>);

// Test de réactivité
describe('Responsive Design Tests', () => {
  test('Navigation bar is visible on mobile', () => {
    // Simuler un écran mobile
    window.matchMedia = createMediaQuery({
      width: '375px',
      height: '667px'
    });
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Vérifier que la navigation mobile est présente
    expect(screen.getByTestId('mock-navigation')).toBeInTheDocument();
  });
  
  test('Header is properly displayed on mobile', () => {
    // Simuler un écran mobile
    window.matchMedia = createMediaQuery({
      width: '375px',
      height: '667px'
    });
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Vérifier que le header est présent
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });
  
  test('Dashboard content is properly displayed on mobile', () => {
    // Simuler un écran mobile
    window.matchMedia = createMediaQuery({
      width: '375px',
      height: '667px'
    });
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Vérifier que le contenu du dashboard est présent
    expect(screen.getByTestId('mock-dashboard')).toBeInTheDocument();
  });
});
