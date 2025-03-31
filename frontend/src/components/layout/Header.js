import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  boxShadow: 'none',
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: theme.palette.common.white,
  marginLeft: theme.spacing(1),
}));

const Header = ({ toggleDrawer }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Logo variant="h6">
          Parenta
        </Logo>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>P</Avatar>
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
