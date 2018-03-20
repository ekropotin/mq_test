import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import { checkBoxNames } from 'data';

export const PresOut = (props) => {
  function isChecked (checkBoxName) {
    return props.selection.includes(checkBoxName) ? 'true' : 'false';
  }

  return (
    <Table striped bordered condensed hover >
      <tbody>
        <tr>
          <td>
            Value
          </td>
          <td>
            {props.value}
          </td >
        </tr>

        {checkBoxNames.map((checkboxName) =>
          <tr key={checkboxName}>
            <td>{ checkboxName }</td>
            <td>{ isChecked(checkboxName) }</td>
          </tr>
        ) }
      </tbody>
    </Table>
  );
};

PresOut.propTypes = {
  value: PropTypes.string.isRequired,
  selection: PropTypes.array.isRequired
};

export default PresOut;
