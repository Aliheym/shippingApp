import { combineReducers } from 'redux';

import productsReducer from './productsReducer';
import purchaseStatusReducer from './purchaseStatusReducer';

export default combineReducers({
  products: productsReducer,
  purchaseStatus: purchaseStatusReducer
});
