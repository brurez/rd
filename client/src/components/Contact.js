import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import './Contact.css';
import LoadingMsg from './LoadingMsg';

class Contact extends Component {
  state = { data: {}, isFetching: true };

  componentDidMount() {
    this.fetchApi();
    this.interval = setInterval(() => {
      this.fetchApi();
    }, 6000);
  }

  fetchApi() {
    axios
      .get(`/api/contacts/${this.props.match.params.id}`)
      .then(res => {
        //debugger;
        this.setState({ data: res.data, isFetching: false });
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderVisits() {
    if (!this.state.isFetching) {
      const visits = this.state.data.visits.map(visit => {
        return (
          <tr key={visit._id}>
            <td>{moment(visit.visitedAt).format('LLL')}</td>
            <td>{visit.url}</td>
          </tr>
        );
      });

      return (
        <table className="ui compact celled table" id="visits">
          <thead>
            <tr>
              <th>Data da Visita</th>
              <th>Endereço da Página</th>
            </tr>
          </thead>
          <tbody>{visits}</tbody>
        </table>
      );
    } else {
      return <LoadingMsg />;
    }
  }

  render() {
    const { name, email } = this.state.data;

    return (
      <div>
        <h2>
          <i className="user icon" /> Detalhes do Contato
        </h2>
        <div className="ui vertical segment">
          <div className="ui form">
            <div className="two fields">
              <div className="field">
                <label>Nome</label>
                <div className="Contact-field" id="name-field">
                  {name}
                </div>
              </div>
              <div className="field">
                <label>Email</label>
                <div className="Contact-field" id="email-field">
                  {email}
                </div>
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
