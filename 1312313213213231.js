import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: [], // Массив избранных товаров
      cart: [], // Массив товаров в корзине
    };
  }

  // Функции для добавления товаров в избранное и корзину
  addToFavorites = (product) => {
    this.setState((prevState) => ({
      favorites: [...prevState.favorites, product],
    }));
  };

  addToCart = (product) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, product],
    }));
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route
              path="/favorites"
              element={<FavoritesPage favorites={this.state.favorites} />}
            />
            <Route
              path="/cart"
              element={<CartPage cart={this.state.cart} />}
            />
            <Route
              path="/product/:id"
              element={
                <ProductPage
                  addToFavorites={this.addToFavorites}
                  addToCart={this.addToCart}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
