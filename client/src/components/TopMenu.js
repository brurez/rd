import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import axios from 'axios';

const TopMenu = () => {
  function onClick() {
    axios.post('/api/factory/drop');
  }

  return (
    <Menu stackable className="App-top" as="header">
      <div className="ui container">
        <Menu.Item as={NavLink} exact to="/">
          <h1 className="App-top-title">
            <i className="line chart icon" /> Desafio RD
          </h1>
        </Menu.Item>
        <Menu.Item as={NavLink} to="/howto">
          <i className="icon info circle" /> Como Usar
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item onClick={onClick}>
            <i className=" red icon remove circle" /> Apagar DB
          </Menu.Item>
        </Menu.Menu>
      </div>
    </Menu>
  );
};

export default TopMenu;
