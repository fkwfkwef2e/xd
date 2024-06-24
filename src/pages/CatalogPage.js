import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const API_URL = 'http://localhost:1488/products';

class CatalogPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [], // Массив всех товаров
      filteredProducts: [], // Отфильтрованные товары
      searchQuery: '', // Текущий поисковый запрос
      selectedCategory: 'all', // Выбранная категория
    };
  }

  componentDidMount() {
    // Получить товары с сервера
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      this.setState({
        products: response.data,
        filteredProducts: response.data,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  handleSearchChange = (event) => {
    const searchQuery = event.target.value.toLowerCase();

    // Фильтровать товары по названию
    const filteredProducts = this.state.products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );

    this.setState({ searchQuery, filteredProducts });
  };

  handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;

    // Фильтровать товары по категории
    let filteredProducts = this.state.products;
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Применить текущий поисковый запрос к отфильтрованным товарам
    if (this.state.searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(this.state.searchQuery)
      );
    }

    this.setState({ selectedCategory, filteredProducts });
  };

  handleAddToFavorites = (product) => {
    // Добавить товар в избранное (реализуйте логику в зависимости от вашего приложения)
  };

  render() {
    const { filteredProducts, searchQuery, selectedCategory } = this.state;

    return (
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Каталог
        </Typography>
        <Grid container spacing={2} alignItems="center" marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Поиск..."
              variant="outlined"
              value={searchQuery}
              onChange={this.handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                value={selectedCategory}
                onChange={this.handleCategoryChange}
                label="Категория"
              >
                <MenuItem value="all">Все категории</MenuItem>
                <MenuItem value="artifact">Артефакты</MenuItem>
                <MenuItem value="consumable">Расходники</MenuItem>
                {/* Добавьте другие категории, если необходимо */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Цена: {product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => this.handleAddToFavorites(product)}
                    startIcon={<FavoriteIcon />}
                  >
                    Добавить в избранное
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to={`/product/${product.id}`}
                  >
                    Подробнее
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default CatalogPage;
