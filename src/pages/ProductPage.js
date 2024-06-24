import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FavoritesContext } from '../Contexts/FavoritesContext';

const API_URL = 'http://localhost:1488/products';

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null, // Выбранный товар
    };
  }

  componentDidMount() {
    // Получить выбранный товар с сервера
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { id } = this.props.match?.params || {};

    try {
      const response = await axios.get(`${API_URL}/${id}`);
      this.setState({
        product: response.data,
      });
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  render() {
    const { product } = this.state;

    if (!product) {
      return <div>Ждите...Москва тоже не сразу строилась...</div>;
    }

    return (
      <FavoritesContext.Consumer>
        {({ favorites, addToFavorites, removeFromFavorites }) => {
          const isFavorite = favorites.some((fav) => fav.id === product.id);

          return (
            <Container maxWidth="md">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="300"
                      image={product.image}
                      alt={product.name}
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {product.description}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        Цена: {product.price}
                      </Typography>
                      {isFavorite ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeFromFavorites(product.id)}
                          startIcon={<FavoriteIcon />}
                          sx={{ marginRight: 2 }}
                        >
                          Удалить из избранного
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => addToFavorites(product)}
                          startIcon={<FavoriteIcon />}
                          sx={{ marginRight: 2 }}
                        >
                          Добавить в избранное
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.handleAddToCart(product)}
                        startIcon={<ShoppingCartIcon />}
                      >
                        Добавить в корзину
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Typography variant="body1" paragraph>
                {product.fullDescription}
              </Typography>
            </Container>
          );
        }}
      </FavoritesContext.Consumer>
    );
  }
}

export default ProductPage;
