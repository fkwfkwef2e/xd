import React, { useContext } from 'react';
import { FavoritesContext } from '../Contexts/FavoritesContext';
import { Container, Typography, Button, Grid, Paper, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const { favorites, removeFromFavorites } = useContext(FavoritesContext);

    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
                {favorites.length > 0 ? (
                    favorites.map(item => (
                        <Grid item xs={12} key={item.id}>
                            <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151, mr: 2 }}
                                    image={item.image}
                                    alt={item.name}
                                />
                                <div>
                                    <Typography variant="h5" gutterBottom>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {item.description}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        ${item.price}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => removeFromFavorites(item.id)}
                                        sx={{ mr: 1 }}
                                    >
                                        Убрать
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={`/product/${item.id}`}
                                        variant="outlined"
                                        startIcon={<VisibilityIcon />}
                                    >
                                        Информация
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#00AEFF', textAlign: 'center' }}>
                            стары бох отсутствует
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};

export default Favorites;
