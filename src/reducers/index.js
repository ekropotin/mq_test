import { combineReducers } from 'redux';

import stored_selection from './storedSelection';
import stored_value from './storedValue';

export const makeRootReducer = () => {
  return combineReducers(
    {
      stored_selection,
      stored_value
    }
  );
};

export default makeRootReducer;
