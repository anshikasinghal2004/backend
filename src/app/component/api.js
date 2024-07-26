'use client';
import React, { useState, useEffect } from 'react';
import { CssBaseline, makeStyles, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import { Edit, Delete, Add } from '@material-ui/icons';
import Header from './Header';
import Sidebar from './Sidebar';
import ClientForm from './form1';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  addButton: {
    alignSelf: 'felx-end',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
 
}));

const App = () => {
  const classes = useStyles();
  const [clients, setClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [view, setView] = useState('Dashboard');

  useEffect(() => {
    if (view === 'Companies') {
      fetchClients();
    }
  }, [view]);

  const fetchClients = async () => {
    const response = await fetch('https://bgv-backend.vitsinco.com/client');
    if (response.ok) {
      const data = await response.json();
      setClients(data);
    } else {
      console.error('Failed to fetch clients');
    }
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentClient(null);
  };

  const handleSave = async (updatedClient) => {
    try {
      const response = await fetch(`https://bgv-backend.vitsinco.com/client/${currentClient ? currentClient.id : ''}`, {
        method: currentClient ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClient),
      });
      if (response.ok) {
        const data = await response.json();
        if (currentClient) {
          setClients((prevClients) =>
            prevClients.map((client) =>
              client.id === data.id ? data : client
            )
          );
        } else {
          setClients((prevClients) => [...prevClients, data]);
        }
        handleCloseDialog();
      } else {
        console.error('Failed to save client');
      }
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const handleMenuClick = (menu) => {
    setView(menu);
  };

  const renderContent = () => {
    switch (view) {
      case 'Dashboard':
        return <Typography variant='h4'>Dashboard Page</Typography>;
      case 'Companies':
        return (
          <div>
            <Typography variant="h4" gutterBottom>
              Client List
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.addButton}
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Add New Client
            </Button>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Candidate Name</TableCell>
                    <TableCell>Mobile Number</TableCell>
                    <TableCell>Email ID</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.mobile_number}</TableCell>
                      <TableCell>{client.email_id}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(client)}>
                          <Edit />
                        </IconButton>
                        <IconButton>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
              <DialogTitle>{currentClient ? 'Edit Client' : 'Add Client'}</DialogTitle>
              <DialogContent>
                <ClientForm initialValues={currentClient || {}} onSubmit={handleSave} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      case 'Candidate':
        return <Typography variant='h4'>Candidate page</Typography>;
      case 'Internal Team':
        return <Typography variant='h4'>Internal Team Page</Typography>;
      default:
        return <Typography variant='h4'>Some error occured</Typography>;
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Sidebar onMenuClick={handleMenuClick} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
