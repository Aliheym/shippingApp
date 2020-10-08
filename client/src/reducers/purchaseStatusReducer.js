import { PURCHASE_START, PURCHASE_END, PURCHASE_INITIAL } from '../actions';

export default (state = null, action) => {
  switch (action.type) {
    case PURCHASE_START:
      return 'start'; // начали операцию оплаты
    case PURCHASE_INITIAL:
      return null;
    case PURCHASE_END:
      // окончили операцию оплаты - можно показывать страницу Success
      return 'end';
    default:
      return state;
  }
};
