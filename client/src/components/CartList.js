import React from 'react';

import CartItem from './CartItem';
import SkeletonCartItem from './SkeletonCartItem';

import './CartList.css';

class CartList extends React.Component {
  renderList() {
    return this.props.items.map(item => <CartItem key={item.id} {...item} />);
  }

  renderSkeleton(itemsCount) {
    return [...new Array(itemsCount)].map((item, index) => (
      <SkeletonCartItem key={`skeleton-${index}`} />
    ));
  }

  render() {
    return (
      <div className="cart-list">
        {this.props.items ? this.renderList() : this.renderSkeleton(5)}
      </div>
    );
  }
}

export default CartList;
