import React from 'react';

import './SkeletonCartItem.css';

const SkeletonCartItem = () => (
  <div className="cart-item cart-item--skeleton">
    <div className="cart-item__trash skeleton" />
    <div className="cart-item__image">
      <div className="cart-item__picture skeleton" />
    </div>

    <div className="cart-item__content">
      <div className="cart-item__data">
        <div className="cart-item__title skeleton" />
        <div className="cart-item__description skeleton" />
      </div>

      <div className="cart-item__order">
        <div className="cart-item__quantity quantity quantity--skeleton">
          <div className="quantity__btn skeleton" />
          <div className="quantity__value skeleton" />
          <div className="quantity__btn skeleton" />
        </div>
        <div className="cart-item__price skeleton" />
      </div>
    </div>
  </div>
);

export default SkeletonCartItem;
