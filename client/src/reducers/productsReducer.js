import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_FAIL,
  CLEAR_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT
} from '../actions';
import { shuffle } from '../utils/helpers';

const initialState = {
  data: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      const products = shuffle(action.payload.products);

      return {
        data: products.slice(0, 3).map(product => ({
          ...product,
          quantity: 1
        })),
        error: null
      };
    }
    case FETCH_PRODUCTS_FAIL:
      return {
        data: null,
        error: action.payload
      };
    case DELETE_PRODUCT:
      return {
        data: state.data.filter(product => product.id !== action.payload),
        error: null
      };
    case UPDATE_PRODUCT:
      return {
        data: state.data.map(product => {
          if (product.id === action.payload.productId) {
            return { ...product, ...action.payload.data };
          }

          return product;
        }),
        error: null
      };
    case CLEAR_PRODUCTS:
      return { data: [], error: null };
    default:
      return state;
  }
};
