import React from 'react';
import PropTypes from 'prop-types';

import { checkBoxNames } from 'data';

export const PresIn = (props) => {
  function handleValueChange (e) {
    props.changeValue(e.target.value);
  }

  function handleCheckboxChange (e) {
    props.changeSelection(e.target.id, e.target.checked);
  }

  function isChecked (checkBoxName) {
    return props.selection.includes(checkBoxName);
  }

  return (
    <div>
      <input type='text' value={props.value} onChange={handleValueChange} />

      {checkBoxNames.map((checkboxName) =>

        <div key={checkboxName} className='checkbox'>
          <label>
            <input id={checkboxName} type='checkbox' checked={isChecked(checkboxName)}
              onChange={handleCheckboxChange} />
            {checkboxName}
          </label>
        </div>

      ) }
    </div>
  );
};

PresIn.propTypes = {
  value: PropTypes.string.isRequired,
  selection: PropTypes.array.isRequired,
  changeValue: PropTypes.func.isRequired,
  changeSelection: PropTypes.func.isRequired
};

export default PresIn;
