import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleHomeRedirect = () => {
        navigate('/');
    };

    return (
        <Container sx={{ textAlign: 'center', padding: 4, marginTop: "8rem"}}>
            <Box sx={{ marginBottom: 3 }}>
                <Typography variant="h1" component="h1" style={{ fontSize: '5rem', fontWeight: 'bold' }}>
                    404
                </Typography>
                <Typography variant="h5" component="h2">
                    Page non trouvée
                </Typography>
                <Typography variant="body1" style={{ marginTop: '1rem' }}>
                    Désolé, la page que vous cherchez n'existe pas. Elle peut avoir été déplacée ou supprimée.
                </Typography>
            </Box>
            <Button variant="contained" onClick={handleHomeRedirect}>
                Retour à l'accueil
            </Button>
        </Container>
    );
};

export default NotFound;
