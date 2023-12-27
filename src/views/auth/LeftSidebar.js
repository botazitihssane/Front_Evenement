import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from 'bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LeftSidebar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      const response = await axios.post(
        "http://localhost:8080/events/auth/signout"
      );
      if (response.status === 200) {
        navigate("/signin");
      }
    } catch (error) {
      console.error("Logout failed.", error);
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Left Sidebar Example
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button>
            <ListItemText primary="Option 1" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Option 2" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Option 3" />
          </ListItem>
          <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
        </List>
      </Drawer>
    </div>
  );
};

export default LeftSidebar;
