import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PendingList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch data from API
    fetch('https://mocki.io/v1/150d2c69-c032-43de-b678-a004daec2667')
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        setData([data]);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  return (
    <div>
      <h1>PendingList</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Titre</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date Debut</TableCell>
              <TableCell>Date Fin</TableCell>
              <TableCell>Budget</TableCell>
              <TableCell>Etat</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.titre}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.dateDebut}</TableCell>
                <TableCell>{item.dateFin}</TableCell>
                <TableCell>{item.budget}</TableCell>
                <TableCell>{item.etat}</TableCell>
                <TableCell>{item.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PendingList;
