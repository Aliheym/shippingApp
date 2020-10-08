export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';

export const PURCHASE_START = 'PURCHASE_START';
export const PURCHASE_INITIAL = 'PURCHASE_INITIAL';
export const PURCHASE_END = 'PURCHASE_END';

export const fetchProductsFail = error => ({
  type: FETCH_PRODUCTS_FAIL,
  payload: error
});

export const fetchProducts = () => async dispatch => {
  try {
    const response = await fetch('/api/products');
    const body = await response.json();

    if (body.status !== 'success') {
      throw new Error(body.message);
    }

    dispatch({
      type: FETCH_PRODUCTS,
      payload: body.data
    });
  } catch (err) {
    dispatch(fetchProductsFail(err.message));
  }
};

export const deleteProduct = productId => ({
  type: DELETE_PRODUCT,
  payload: productId
});

export const updateProduct = (productId, data) => ({
  type: UPDATE_PRODUCT,
  payload: { productId, data }
});

export const clearProducts = () => ({
  type: CLEAR_PRODUCTS
});

export const purchaseStart = () => ({
  type: PURCHASE_START
});

export const purchaseInitial = () => ({
  type: PURCHASE_INITIAL
});

export const purchaseEnd = () => ({
  type: PURCHASE_END
});
