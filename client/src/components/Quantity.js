import React from 'react';

import './Quantity.css';

class Quantity extends React.Component {
  state = {
    value: this.props.value
  };

  onClickChange = value => {
    const isValid = this.isValidValue(value);

    if (isValid) {
      this.setState({
        value
      });

      this.props.onValueChange(value);
    }
  };

  onInputChange = evt => {
    const value = +evt.target.value;
    this.onClickChange(value);
  };

  isValidValue(value) {
    return value <= this.props.max && value >= this.props.min;
  }

  render() {
    const { value } = this.state;

    return (
      <div className="cart-item__quantity quantity">
        <button
          type="button"
          className="quantity__btn quantity__btn--down"
          onClick={() => this.onClickChange(value - 1)}
        >
          <i className="fas fa-minus" />
        </button>
        <input
          className="quantity__value"
          type="number"
          value={value}
          onChange={this.onInputChange}
        />
        <button
          type="button"
          className="quantity__btn quantity__btn--up"
          onClick={() => this.onClickChange(value + 1)}
        >
          <i className="fas fa-plus" />
        </button>
      </div>
    );
  }
}

export default Quantity;
