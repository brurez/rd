import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

const data = [
  {
    _id: 'ad767sdsd',
    name: 'Bruno de Rezende',
    email: 'brurez@hotmail.com',
    visits: [1, 2, 4, 5],
    createdAt: '10-10-2017',
  },
  {
    _id: 'ad7676dsd',
    name: 'Babi Reno',
    email: 'babi@hotmail.com',
    visits: [1],
    createdAt: '10-11-2017',
  },
];

class Home extends Component {
  state = { data: [] };

  componentDidMount() {
    axios
      .get('/api/contacts')
      .then(res => {
        //debugger;
        const { data, count } = res.data;
        this.setState({ data });
      })
      .catch(err => console.log(err));
  }

  renderContacts() {
    const data = this.state.data;
    return data.map(contact => {
      const { name, email, visits, createdAt } = contact;
      //debugger;
      return (
        <div className="card" key={contact._id}>
          <div className="content">
            <div className="header">{name}</div>
            <div className="meta">Criado em: {moment(createdAt).format('LLL')}</div>
            <div className="description">
              <strong>Email:</strong> {email} <br />
              <strong>Número de visitas: </strong> {visits.length}
            </div>
          </div>
          <div className="extra content">
            <Link
              as="button"
              to={`/contact/${contact._id}`}
              className="ui small icon button"
            >
              Ver visitas <i className="arrow right icon" />
            </Link>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Lista de Contatos</h2>
        <div className="ui two cards">{this.renderContacts()}</div>
      </div>
    );
  }
}

export default Home;
