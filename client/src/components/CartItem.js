import React from 'react';
import { connect } from 'react-redux';

import { deleteProduct, updateProduct } from '../actions';

import Quantity from './Quantity';
import './CartItem.css';

class CartItem extends React.Component {
  onQuantityChange = quantity => {
    this.props.updateProduct(this.props.id, { quantity });
  };

  render() {
    const { id, title, description, price, image, quantity } = this.props;
    return (
      <div className="cart-item">
        <button
          type="button"
          className="cart-item__trash"
          onClick={() => this.props.deleteProduct(id)}
        >
          <i className="fas fa-trash" />
        </button>
        <div className="cart-item__image">
          <img className="cart-item__picture" alt={title} src={image} />
        </div>

        <div className="cart-item__content">
          <div className="cart-item__data">
            <h3 className="cart-item__title">{title}</h3>
            <p className="cart-item__description">{description}</p>
          </div>
          <div className="cart-item__order">
            <Quantity
              value={quantity}
              min={1}
              max={50}
              onValueChange={this.onQuantityChange}
            />
            <span className="cart-item__price">
              {(price * quantity).toFixed(2)} &euro;
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteProduct, updateProduct })(CartItem);
