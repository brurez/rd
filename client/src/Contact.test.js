import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Contact from './Contact';

describe('Home Component', () => {
  test('match the snapshot', () => {
    const component = renderer.create(
      <Contact match={{ params: { id: 123 } }} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
