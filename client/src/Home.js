import React from 'react';

import Visits from './Visits';
import ContactList from './ContactList';

const Home = () => {
  return (
    <div>
      <div className="ui segment">
        <h2>
          <i className="desktop icon" /> Últimas 10 Visitas
        </h2>
        <Visits />
      </div>
      <div className="ui segment">
        <h2>
          <i className="users icon" /> Lista de Contatos
        </h2>
        <ContactList />
      </div>
    </div>
  );
};

export default Home;
