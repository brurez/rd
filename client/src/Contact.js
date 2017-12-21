import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import './Contact.css';

class Contact extends Component {
  state = { data: {} };

  componentDidMount() {
    axios
      .get(`/api/contacts/${this.props.match.params.id}`)
      .then(res => {
        //debugger;
        const { data, count } = res.data;
        this.setState({ data: data[0] });
      })
      .catch(err => console.log(err));
  }

  renderVisits() {
    if (this.state.data.visits && this.state.data.visits.length) {
      const visits = this.state.data.visits.map(visit => {
        return (
          <tr>
            <td>{moment(visit.visitedAt).format('LLL')}</td>
            <td>{visit.url}</td>
          </tr>
        );
      });

      return (
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Data da Visita</th>
              <th>Endereço da Página</th>
            </tr>
          </thead>
          <tbody>{visits}</tbody>
        </table>
      );
    }
  }

  render() {
    const { name, email } = this.state.data;

    return (
      <div>
        <h2>Detalhes do Contato</h2>
        <div className="ui vertical segment">
          <div className="ui form">
            <div className="two fields">
              <div className="field">
                <label>Nome</label>
                <div className="Contact-field">{name}</div>
              </div>
              <div className="field">
                <label>Email</label>
                <div className="Contact-field">{email}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui vertical segment">
          <h3>Visitas</h3>
          {this.renderVisits()}
        </div>
      </div>
    );
  }
}

export default Contact;
