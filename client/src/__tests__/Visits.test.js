import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Visits from '../components/Visits';

jest.mock('axios');

configure({ adapter: new Adapter() });

describe('Contact Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Visits />);
  });

  test('if exist', () => {
    expect(wrapper).toBeTruthy();
  });

  test('if loading message is been displayed', () => {
    expect(wrapper.html()).toContain('Espere um segundo');
  });

  //update

  test('if display data from api', () => {
    wrapper.update();
    expect(wrapper.html()).toContain('rd.toplayalong.com/sobre.html');
    expect(wrapper.html()).toContain('test.com');
  });

  test('if match the snapshot', () => {
    wrapper.update();
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

