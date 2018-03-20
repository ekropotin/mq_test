import { connect } from 'react-redux';

import { getValue, getSelection } from 'selectors';
import PresOut from 'components/presOut/PresOut';

const mapDispatchToProps = {
};

const mapStateToProps = (state) => ({
  value: getValue(state),
  selection: getSelection(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(PresOut);
