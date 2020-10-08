import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { purchaseInitial } from '../actions';

import './Success.css';

class Success extends React.Component {
  componentWillUnmount() {
    this.props.purchaseInitial();
  }

  render() {
    return (
      <div className="success">
        <p>Thank you for your purchase.</p>
        <Link to="/cart" className="btn">
          Go Home
        </Link>
      </div>
    );
  }
}

export default connect(null, { purchaseInitial })(Success);
