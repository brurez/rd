import React, {Component} from 'react';

const data = [
  {
    _id: 'ad767sdsd',
    name: 'Bruno de Rezende',
    email: 'brurez@hotmail.com',
    visits: [1, 2, 4, 5],
    createdAt: new Date(),
  },
  {
    _id: 'ad7676dsd',
    name: 'Babi Reno',
    email: 'babi@hotmail.com',
    visits: [1],
    createdAt: new Date(),
  },
];

class Home extends Component {
  renderContacts() {
    return data.map(contact => {
      const { name, email, visits, createdAt } = contact;
      debugger;
      return (
        <div className="card" key={contact._id}>
          <div className="content">
            <div className="header">{name}</div>
            <div className="meta">Criado em: {createdAt}</div>
            <div className="description">
              <strong>Email:</strong> {email}
              <strong>Número de visitas: </strong> {visits.length}
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Contact List</h2>
        {this.renderContacts()}
      </div>
    );
  }
}

export default Home;
