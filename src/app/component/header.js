'use client';
import React, { useState } from 'react';
import Image from 'next/image'
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { AccountCircle, Person, Settings } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#3f51b5',
    color: '#ffffff',
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
 logoContainer:{
  marginRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
 },
 logo:{
  display: 'block',
 },
}));

const Header = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <div className={classes.logoContainer}>
       <Image src="/favicon.ico" alt="Logo" width={40} height={40} className={classes.logo}/>
        </div>          
        <Typography variant="h6" className={classes.title}>
          Application
        </Typography>
        <IconButton edge="end" color="inherit" onClick={handleMenu}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}><Person style={{ marginRight: 8 }} /> Profile</MenuItem>
          <MenuItem onClick={handleCloseMenu}><Settings style={{ marginRight: 8 }} /> Settings</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
