import { Actions } from 'actions';

const defaultState = [];
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [Actions.CHANGE_SELECTION]: (state, action) => {
    const { checkboxName, isChecked } = action.payload;
    if (isChecked) {
      if (!state.includes(checkboxName)) {
        state.push(checkboxName);
        return state.slice();
      }
    } else {
      return state.filter(item => item !== checkboxName);
    }
    return state;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
