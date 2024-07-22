
import React, { useState, useEffect } from 'react';
import { Container, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import ClientForm from './form1';

const apiEndpoint = 'https://bgv-backend.vitsinco.com/client';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    setClients(data);
  };

  const handleAddClient = async (client) => {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    });
    const newClient = await response.json();
    setClients([...clients, newClient]);
  };

  const handleUpdateClient = async (client) => {
    const response = await fetch(`${apiEndpoint}/${client.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    });
    const updatedClient = await response.json();
    setClients(clients.map((c) => (c.id === updatedClient.id ? updatedClient : c)));
  };

  const handleDeleteClient = async (id) => {
    await fetch(`${apiEndpoint}/${id}`, { method: 'DELETE' });
    setClients(clients.filter((c) => c.id !== id));
  };

  const handleSubmit = (values, { resetForm }) => {
    if (currentClient) {
      handleUpdateClient({ ...currentClient, ...values });
    } else {
      handleAddClient(values);
    }
    resetForm();
    setCurrentClient(null);
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Client List
      </Typography>
      <ClientForm initialValues={currentClient || { name: '', representative_name: '', designation: '', department: '', email_id: '', mobile_number: '', process_list: '' }} onSubmit={handleSubmit} />
      <List>
        {clients.map((client) => (
          <ListItem key={client.id}>
            <ListItemText
              primary={client.name}
              secondary={`Email: ${client.email_id} | Mobile: ${client.mobile_number}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(client)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClient(client.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ClientList;
