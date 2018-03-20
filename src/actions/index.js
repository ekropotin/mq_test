export const Actions = {
  CHANGE_VALUE: 'CHANGE_VALUE',
  CHANGE_SELECTION: 'CHANGE_SELECTION'
};

export const changeValue = (newValue) => ({
  type: Actions.CHANGE_VALUE,
  payload: newValue
});

export const changeSelection = (checkboxName, isChecked) => ({
  type: Actions.CHANGE_SELECTION,
  payload: { checkboxName, isChecked }
});
