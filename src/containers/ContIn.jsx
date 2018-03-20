import { connect } from 'react-redux';

import { changeValue, changeSelection } from 'actions';
import { getValue, getSelection } from 'selectors';
import PresIn from 'components/presIn/PresIn';

const mapDispatchToProps = {
  changeValue,
  changeSelection
};

const mapStateToProps = (state) => ({
  value: getValue(state),
  selection: getSelection(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(PresIn);
