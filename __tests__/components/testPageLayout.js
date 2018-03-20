import React from 'react';
import { shallow } from 'enzyme';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import PageLayout from 'components/pageLayout/PageLayout';

describe('<PageLayout />', () => {
  it('should render child components', () => {
    const renderedComponent = shallow(
      <PageLayout />
    );
    console.log(renderedComponent.debug());
    expect(renderedComponent.find(ButtonGroup).length).toBe(1);
    expect(renderedComponent.find(ButtonGroup).find(Button).length).toBe(2);
    expect(renderedComponent.find(Switch).length).toBe(1);
    expect(renderedComponent.find(Switch).find(Route).length).toBe(2);
  });
});
