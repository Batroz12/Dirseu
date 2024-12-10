import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { obtenerTalleres } from '../api/talleres';
import {
    Button,
    Box,
    Typography,
    Paper,
    CircularProgress,
    ThemeProvider,
    createTheme,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';

const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#007BFF',
      },
      secondary: {
        main: '#f50057',
      },
    },
});

const TalleresInstructores = () => {
    const [talleres, setTalleres] = useState([]);
    const [tallerSeleccionada, setTallerSeleccionada] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const cargarTalleres = async () => {
        setIsLoading(true)
        try {
            const response = await obtenerTalleres();
            setTalleres(response.data);
            setError('');
        }   catch {
            setError('Error al cargar los talleres. Intente de nuevo.');
        }   finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        cargarTalleres();
    }, []);

    const manejarReporte = (idTaller) => {
        navigate(`/Home/instructor/Reporte/taller/${idTaller}`);
    };

    const manejarSesiones = (idTaller) => {
        navigate(`/Home/instructor/Ver-Sesiones/${idTaller}`);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box p={6} minHeight="100vh">
                <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
                    Talleres Artísticos
                </Typography>

                {error && (
                    <Typography color ="error" gutterBottom align="center">
                        {error}
                    </Typography>
                )}

                {isLoading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Taller</TableCell>
                                    <TableCell>Reportes</TableCell>
                                    <TableCell>Sesiones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {talleres.map((taller) => (
                                    <TableRow key={taller.id}>
                                        <TableCell>{taller.nombre}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color ="primary" onClick={() => manejarReporte(taller.id)}>
                                                Ver Reporte
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={() => manejarSesiones(taller.id)}>
                                                Ver Sesiones
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </ThemeProvider>
    );
};

export default TalleresInstructores;
