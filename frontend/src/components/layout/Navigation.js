import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
  boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.05)',
}));

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/') setValue(0);
    else if (path === '/calendar') setValue(1);
    else if (path === '/lists') setValue(2);
    else if (path === '/settings') setValue(3);
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/calendar');
        break;
      case 2:
        navigate('/lists');
        break;
      case 3:
        navigate('/settings');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <StyledBottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
      >
        <BottomNavigationAction label="Accueil" icon={<HomeIcon />} />
        <BottomNavigationAction label="Calendrier" icon={<CalendarMonthIcon />} />
        <BottomNavigationAction label="Listes" icon={<ListAltIcon />} />
        <BottomNavigationAction label="Paramètres" icon={<SettingsIcon />} />
      </StyledBottomNavigation>
    </Paper>
  );
};

export default Navigation;
