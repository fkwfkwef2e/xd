import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import ProductPage from './pages/ProductPage';
import { FavoritesProvider } from './Contexts/FavoritesContext';

import './App.css';

const App = () => {
  return (
    <FavoritesProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
