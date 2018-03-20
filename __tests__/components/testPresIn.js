import React from 'react';
import { mount } from 'enzyme';

import { PresIn } from 'components/presIn/PresIn';
import { checkBoxNames } from 'data';

describe('<PresIn />', () => {
  it('should render value', () => {
    const renderedComponent = mount(
      <PresIn value='test' selection={[]} changeValue={() => {}} changeSelection={() => {}} />
    );
    const input = renderedComponent.find('input[type="text"]');
    expect(renderedComponent.find('input[type="text"]').length).toBe(1);
    expect(input.prop('value')).toBe('test');
  });

  it('should render checkboxes', () => {
    const renderedComponent = mount(
      <PresIn value='test' selection={['one', 'two']} changeValue={() => {}} changeSelection={() => {}} />
    );
    const checkboxes = renderedComponent.find('input[type="checkbox"]');
    expect(checkboxes.length).toBe(checkBoxNames.length);
    expect(checkboxes.find('#one').prop('checked')).toBe(true);
    expect(checkboxes.find('#two').prop('checked')).toBe(true);
    expect(checkboxes.find('#three').prop('checked')).toBe(false);
    expect(checkboxes.find('#four').prop('checked')).toBe(false);
    expect(checkboxes.find('#five').prop('checked')).toBe(false);
  });
});
