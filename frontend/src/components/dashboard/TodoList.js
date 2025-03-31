import React from 'react';
import { Card, CardContent, Typography, Box, Button, List, ListItem, ListItemText, ListItemIcon, Checkbox, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '20',
  },
}));

const TodoList = ({ items }) => {
  // Données de démonstration si aucun élément n'est fourni
  const demoItems = [
    {
      id: 1,
      text: 'Lait',
      completed: false,
      type: 'grocery'
    },
    {
      id: 2,
      text: 'Pain',
      completed: false,
      type: 'grocery'
    },
    {
      id: 3,
      text: 'Appeler l\'école',
      completed: true,
      type: 'todo'
    }
  ];

  const [listItems, setListItems] = React.useState(items || demoItems);

  const handleToggle = (id) => {
    setListItems(
      listItems.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ListAltIcon color="primary" sx={{ mr: 1 }} />
          <CardTitle variant="h6">LISTES</CardTitle>
        </Box>
        
        <List sx={{ width: '100%', p: 0 }}>
          {listItems.slice(0, 3).map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem 
                alignItems="flex-start" 
                sx={{ px: 0 }}
                dense
                disableGutters
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Checkbox
                    edge="start"
                    checked={item.completed}
                    onChange={() => handleToggle(item.id)}
                    sx={{ 
                      color: 'primary.main',
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ 
                    fontWeight: 500,
                    sx: { 
                      textDecoration: item.completed ? 'line-through' : 'none',
                      color: item.completed ? 'text.secondary' : 'text.primary'
                    }
                  }}
                />
              </ListItem>
              {index < listItems.slice(0, 3).length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button 
            startIcon={<AddIcon />} 
            size="small"
            variant="text"
            color="primary"
          >
            Ajouter
          </Button>
          <ViewAllButton 
            endIcon={<ArrowForwardIcon />} 
            size="small"
            variant="text"
          >
            Voir tout
          </ViewAllButton>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default TodoList;
