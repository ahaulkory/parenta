import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from './theme';

test('theme contains correct beach-inspired aquarel colors', () => {
  // Vérifier les couleurs principales du thème
  expect(theme.palette.primary.main).toBe('#88C0D0'); // Bleu clair aquatique
  expect(theme.palette.secondary.main).toBe('#EBCB8B'); // Sable doré
  expect(theme.palette.background.default).toBe('#ECEFF4'); // Blanc cassé
  
  // Vérifier les couleurs d'accent
  expect(theme.palette.success.main).toBe('#A3BE8C'); // Vert algue
  expect(theme.palette.text.primary).toBe('#4C566A'); // Gris foncé
});

test('theme has correct typography settings for mobile-first design', () => {
  // Vérifier les paramètres de typographie
  expect(theme.typography.fontFamily).toContain('Roboto');
  expect(theme.typography.h5.fontWeight).toBe(700);
  expect(theme.typography.h6.fontWeight).toBe(600);
});

test('theme has correct shape settings for rounded components', () => {
  // Vérifier les paramètres de forme
  expect(theme.shape.borderRadius).toBe(8);
});
