import React, { Component } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  Paper,
} from '@mui/material';

const API_URL = 'http://localhost:1488/products';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [], // Массив товаров
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
        products: response.data.slice(0, 10), // Ограничить список до 10 товаров
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  handleSubmitContactForm = (event) => {
    event.preventDefault();

    // Обработать отправку формы (реализуйте логику в зависимости от вашего приложения)
  };

  render() {
    const { products } = this.state;

    return (
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Добро пожаловать в наш магазин предметов Dota 2!
        </Typography>
        <Typography variant="body1" paragraph>
          Здесь вы найдете широкий ассортимент предметов для ваших любимых героев. Надеемся, что вы
          найдете то, что ищете, и насладитесь игрой с новыми предметами!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Форма обратной связи
        </Typography>
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
          <form onSubmit={this.handleSubmitContactForm}>
            <TextField
              fullWidth
              label="Ваше имя"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Ваш email"
              variant="outlined"
              margin="normal"
              type="email"
              required
            />
            <TextField
              fullWidth
              label="Ваше сообщение"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Отправить
            </Button>
          </form>
        </Paper>
        <Typography variant="h5" gutterBottom>
          Небольшой список товаров
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
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
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default HomePage;
