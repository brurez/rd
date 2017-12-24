import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import Home from '../components/Home';

configure({ adapter: new Adapter() });

describe('Home Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  test('if exist', () => {
    expect(wrapper).toBeTruthy();
  });

  test('if have two h2 headers', () => {
     const headers2 = wrapper.find('h2');
     expect(headers2.length).toBe(2);
     expect(headers2.at(0).text()).toContain('Últimas 10 Visitas');
     expect(headers2.at(1).text()).toContain('Lista de Contatos');
  });

  test('match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
