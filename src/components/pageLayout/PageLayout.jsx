import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';

import ContIn from 'containers/ContIn';
import ContOut from 'containers/ContOut';

import './PageLayout.scss';

const ButtonIn = withRouter(({ history }) => (
  <Button bsStyle='primary' onClick={() => { history.push('/contin'); }}>/contin</Button>
));

const ButtonOut = withRouter(({ history }) => (
  <Button bsStyle='primary' onClick={() => { history.push('/contout'); }}>/contout</Button>
));

const PageLayout = () => (
  <div className='container'>
    <div className='page-layout__viewport'>
      <ButtonGroup className='page-layout__buttons'>
        <ButtonIn />
        <ButtonOut />
      </ButtonGroup>

      <Switch>
        <Route path='/contin' component={ContIn} />
        <Route path='/contout' component={ContOut} />
      </Switch>
    </div>
  </div>
);

export default PageLayout;
