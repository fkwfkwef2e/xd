import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/catalog">Каталог</Link>
          </li>
          <li>
            <Link to="/favorites">Избранное</Link>
          </li>
          <li>
            <Link to="/cart">Корзина</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
