import React, { Component } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


class CartPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: [], // Массив товаров в корзине
      totalPrice: 0, // Общая стоимость товаров в корзине
    };
  }

  componentDidMount() {
    // Получить товары из корзины и обnovit' состояние
    this.updateCartItems();
  }

  updateCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    cartItems.forEach((item) => {
      totalPrice += item.price;
    });

    this.setState({ cartItems, totalPrice });
  };

  render() {
    const { cartItems, totalPrice } = this.state;

    return (
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Корзина
        </Typography>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Ваша корзина пуста</Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id}>
                  <ListItemAvatar>
                    <Avatar alt={item.name} src={item.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`Цена: ${item.price}`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider />
            <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
              <Typography variant="h6">
                Итоговая стоимость: {totalPrice}
              </Typography>
            </Paper>
          </>
        )}
      </Container>
    );
  }
}

export default CartPage;
