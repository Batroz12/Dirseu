import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';

const ListaOfertas = ({ ofertas, onEditar, onEliminar }) => {
  if (ofertas.length === 0) {
    return <Typography>No tienes ofertas publicadas.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Requisitos</TableCell>
            <TableCell>Habilidades</TableCell>
            <TableCell>Experiencia Mínima</TableCell>
            <TableCell>Carrera Destino</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ofertas.map((o) => (
            <TableRow key={o.id}>
              <TableCell>{o.titulo}</TableCell>
              <TableCell>{o.descripcion}</TableCell>
              <TableCell>{o.requisitos}</TableCell>
              <TableCell>{o.habilidades}</TableCell>
              <TableCell>{o.experiencia_minima} años</TableCell>
              <TableCell>{o.carrera_destino}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => onEditar(o)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onEliminar(o.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListaOfertas;
