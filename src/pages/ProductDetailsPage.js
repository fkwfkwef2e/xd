import React, { Component } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const API_URL = 'http://localhost:3001/products';

class ProductDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    this.fetchProduct();
  }

  fetchProduct = async () => {
    const { id } = this.props.match.params;

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
      return <div>Loading...</div>;
    }

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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default ProductDetailsPage;
