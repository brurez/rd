import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Contact from '../components/Contact';

jest.mock('axios');

configure({ adapter: new Adapter() });

describe('Contact Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Contact match={{ params: { id: 123 } }} />);
  });

  test('if exist', () => {
    console.log(wrapper);
    expect(wrapper).toBeTruthy();
  });


  test('match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

