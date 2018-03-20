import { Actions } from 'actions';
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [Actions.CHANGE_VALUE]: (state, action) => (action.payload)
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function (state = '', action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
