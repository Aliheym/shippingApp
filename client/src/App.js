import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Cart from './components/Cart';
import Shipping from './components/Shipping';
import Success from './components/Success';

import { fetchProducts } from './actions';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { products, purchaseStatus } = this.props;
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route path="/cart" exact component={Cart} />
            <ProtectedRoute
              isAllowed={products && products.length}
              path="/shipping"
              exact
              component={Shipping}
            />
            <ProtectedRoute
              isAllowed={purchaseStatus === 'end'}
              path="/success"
              exact
              component={Success}
            />

            <Redirect to="/cart" />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products.data,
  purchaseStatus: state.purchaseStatus
});

export default connect(mapStateToProps, {
  fetchProducts
})(App);
