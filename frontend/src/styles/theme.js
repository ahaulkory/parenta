import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#88C0D0', // bleu clair aquatique
      light: '#A3D5E4',
      dark: '#6A9DAA',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#EBCB8B', // sable doré
      light: '#F5DCA8',
      dark: '#D4B06E',
      contrastText: '#4C566A',
    },
    accent: {
      main: '#A3BE8C', // vert algue
      light: '#B9D0A5',
      dark: '#8CA673',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#ECEFF4', // blanc cassé
      paper: '#FFFFFF',
    },
    text: {
      primary: '#4C566A', // gris foncé
      secondary: '#6E7B94',
    },
    error: {
      main: '#BF616A',
    },
    warning: {
      main: '#D08770',
    },
    info: {
      main: '#5E81AC',
    },
    success: {
      main: '#A3BE8C',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#4C566A',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#4C566A',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#4C566A',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#4C566A',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#4C566A',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      color: '#4C566A',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#6E7B94',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#6E7B94',
    },
    body1: {
      fontSize: '1rem',
      color: '#4C566A',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#4C566A',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.05)',
    '0px 6px 12px rgba(0, 0, 0, 0.05)',
    '0px 8px 16px rgba(0, 0, 0, 0.05)',
    '0px 10px 20px rgba(0, 0, 0, 0.05)',
    '0px 12px 24px rgba(0, 0, 0, 0.05)',
    '0px 14px 28px rgba(0, 0, 0, 0.05)',
    '0px 16px 32px rgba(0, 0, 0, 0.05)',
    '0px 18px 36px rgba(0, 0, 0, 0.05)',
    '0px 20px 40px rgba(0, 0, 0, 0.05)',
    '0px 22px 44px rgba(0, 0, 0, 0.05)',
    '0px 24px 48px rgba(0, 0, 0, 0.05)',
    '0px 26px 52px rgba(0, 0, 0, 0.05)',
    '0px 28px 56px rgba(0, 0, 0, 0.05)',
    '0px 30px 60px rgba(0, 0, 0, 0.05)',
    '0px 32px 64px rgba(0, 0, 0, 0.05)',
    '0px 34px 68px rgba(0, 0, 0, 0.05)',
    '0px 36px 72px rgba(0, 0, 0, 0.05)',
    '0px 38px 76px rgba(0, 0, 0, 0.05)',
    '0px 40px 80px rgba(0, 0, 0, 0.05)',
    '0px 42px 84px rgba(0, 0, 0, 0.05)',
    '0px 44px 88px rgba(0, 0, 0, 0.05)',
    '0px 46px 92px rgba(0, 0, 0, 0.05)',
    '0px 48px 96px rgba(0, 0, 0, 0.05)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          '&:hover': {
            backgroundColor: '#88C0D0',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#6E7B94',
          '&.Mui-selected': {
            color: '#88C0D0',
          },
        },
      },
    },
  },
});

export default theme;
