import React, { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Paper, List, ListItem, ListItemIcon, ListItemText, Checkbox, Divider, TextField, IconButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChecklistIcon from '@mui/icons-material/Checklist';

const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

const ListContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[2],
  marginBottom: theme.spacing(3),
}));

const AddItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
}));

const Lists = () => {
  const [tabValue, setTabValue] = useState(0);
  const [newItem, setNewItem] = useState('');
  
  // Données de démonstration
  const [groceryItems, setGroceryItems] = useState([
    { id: 1, text: 'Lait', completed: false },
    { id: 2, text: 'Pain', completed: false },
    { id: 3, text: 'Fruits', completed: false },
    { id: 4, text: 'Légumes', completed: false },
    { id: 5, text: 'Poulet', completed: false },
    { id: 6, text: 'Pâtes', completed: false },
  ]);
  
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: 'Appeler l\'école', completed: true },
    { id: 2, text: 'Prendre rendez-vous chez le médecin', completed: false },
    { id: 3, text: 'Acheter un cadeau d\'anniversaire', completed: false },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleToggle = (id) => {
    if (tabValue === 0) {
      setGroceryItems(
        groceryItems.map(item => 
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    } else {
      setTodoItems(
        todoItems.map(item => 
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    }
  };

  const handleAddItem = () => {
    if (newItem.trim() === '') return;
    
    const newItemObj = {
      id: Date.now(),
      text: newItem,
      completed: false
    };
    
    if (tabValue === 0) {
      setGroceryItems([...groceryItems, newItemObj]);
    } else {
      setTodoItems([...todoItems, newItemObj]);
    }
    
    setNewItem('');
  };

  const handleDeleteChecked = () => {
    if (tabValue === 0) {
      setGroceryItems(groceryItems.filter(item => !item.completed));
    } else {
      setTodoItems(todoItems.filter(item => !item.completed));
    }
  };

  const handleCheckAll = () => {
    if (tabValue === 0) {
      setGroceryItems(
        groceryItems.map(item => ({ ...item, completed: true }))
      );
    } else {
      setTodoItems(
        todoItems.map(item => ({ ...item, completed: true }))
      );
    }
  };

  const currentItems = tabValue === 0 ? groceryItems : todoItems;

  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1, mb: 8, mt: 2 }}>
        <PageTitle variant="h5">Listes</PageTitle>
        
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
        >
          <StyledTab icon={<ShoppingCartIcon />} label="Courses" />
          <StyledTab icon={<ChecklistIcon />} label="Tâches" />
        </StyledTabs>
        
        <ListContainer>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {tabValue === 0 ? 'Liste de courses' : 'Liste de tâches'}
          </Typography>
          
          <List sx={{ width: '100%' }}>
            {currentItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem 
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
                {index < currentItems.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
          
          <AddItemContainer>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Ajouter un élément"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddItem();
                }
              }}
              sx={{ mr: 1 }}
            />
            <IconButton 
              color="primary" 
              onClick={handleAddItem}
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                }
              }}
            >
              <AddIcon />
            </IconButton>
          </AddItemContainer>
          
          <ActionButtons>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteChecked}
              disabled={!currentItems.some(item => item.completed)}
            >
              Supprimer cochés
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCheckAll}
              disabled={currentItems.length === 0 || currentItems.every(item => item.completed)}
            >
              Tout cocher
            </Button>
          </ActionButtons>
        </ListContainer>
      </Box>
    </Container>
  );
};

export default Lists;
