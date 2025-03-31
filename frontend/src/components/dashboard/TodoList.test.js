import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

test('renders todo list component with demo data', () => {
  render(<TodoList />);
  
  // Vérifier que le titre est présent
  expect(screen.getByText('LISTES')).toBeInTheDocument();
  
  // Vérifier que les éléments de démonstration sont présents
  expect(screen.getByText('Lait')).toBeInTheDocument();
  expect(screen.getByText('Pain')).toBeInTheDocument();
  
  // Vérifier que les boutons sont présents
  expect(screen.getByText('Ajouter')).toBeInTheDocument();
  expect(screen.getByText('Voir tout')).toBeInTheDocument();
});

test('toggles item completion when clicked', () => {
  render(<TodoList />);
  
  // Trouver les cases à cocher
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes.length).toBeGreaterThan(0);
  
  // Vérifier l'état initial
  expect(checkboxes[0]).not.toBeChecked();
  
  // Cliquer sur la première case à cocher
  fireEvent.click(checkboxes[0]);
  
  // Vérifier que l'état a changé
  expect(checkboxes[0]).toBeChecked();
});
