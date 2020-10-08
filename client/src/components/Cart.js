import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { calculatePrice } from '../utils/helpers';

import CartList from './CartList';
import './Cart.css';

class Cart extends React.Component {
  renderCartOrder() {
    if (!this.props.products) {
      return null;
    }

    return (
      <div className="cart-order">
        <strong className="cart-order__price">
          {calculatePrice(this.props.products).toFixed(2)} &euro;
        </strong>
        <Link className="btn" to="/shipping">
          Buy
        </Link>
      </div>
    );
  }

  render() {
    const { products, error } = this.props;

    if (error) {
      return (
        <div className="cart">
          <div className="cart__notification">{error}</div>
        </div>
      );
    }

    if (products && !products.length) {
      return (
        <div className="cart">
          <div className="cart__notification">Empty</div>
        </div>
      );
    }

    return (
      <div className="cart">
        <CartList items={products} />
        {this.renderCartOrder()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.data,
  error: state.products.error
});

export default connect(mapStateToProps)(Cart);
