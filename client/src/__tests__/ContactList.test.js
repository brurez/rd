import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import ContactList from '../components/ContactList';

jest.mock('axios');

configure({ adapter: new Adapter() });

describe('ContactList Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ContactList />);
  });

  test('if exist', () => {
    //console.log(wrapper);
    expect(wrapper).toBeTruthy();
  });

  test('if loading message is been displayed', () => {
    expect(wrapper.html()).toContain('Espere um segundo');
  });

  //after update

  test('if names are displayed after update', () => {
    wrapper.update();
    expect(wrapper.html()).toContain('Bruno de Rezende');
    expect(wrapper.html()).toContain('João do Teste');
  });

  test('if match the snapshot', () => {
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

