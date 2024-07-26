import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Dashboard, Business, Person, Group } from '@mui/icons-material';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    paddingTop: theme.spacing(8), 
  },
}));

const Sidebar = ({ onMenuClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.sidebar}>
      <List>
        <ListItem button onClick={() => onMenuClick('Dashboard')}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('Companies')}>
          <ListItemIcon>
            <Business />
          </ListItemIcon>
          <ListItemText primary="Companies" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('Candidate')}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Candidate" />
        </ListItem>
        <ListItem button onClick={() => onMenuClick('Internal Team')}>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="Internal Team" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
