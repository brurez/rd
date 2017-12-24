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
    //console.log(wrapper);
    expect(wrapper).toBeTruthy();
  });

  test('if loading message is been displayed', () => {
    expect(wrapper.html()).toContain('Espere um segundo');
  });

  test('if name and email are displayed after update', () => {
    wrapper.update();
    expect(wrapper.find('#name-field').text()).toContain('Bruno de Rezende');
    expect(wrapper.find('#email-field').text()).toContain('brurez@hotmail.com');
  });

  test('if links are displayed correctly after update', () => {
    wrapper.update();
    expect(wrapper.find('#visits').html()).toContain('Data da Visita');
    expect(wrapper.find('#visits').html()).toContain('Endereço da Página');
  });

  test('if match the snapshot', () => {
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

