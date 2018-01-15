import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import LoadingMsg from './LoadingMsg';
import axios from 'axios/index';
import socket from '../socket';

class ContactList extends Component {
  constructor(props){
    super(props);
    this.state = { data: [], isFetching: true };
    this.fetchApi = this.fetchApi.bind(this)
  }

  componentDidMount() {
    this.fetchApi();
    socket.on('new-contact', this.fetchApi);
  }

  fetchApi() {
    axios
      .get('/api/contacts')
      .then(res => {
        const { data } = res.data;
        this.setState({ data, isFetching: false });
      })
      .catch(err => {
        console.log(err);
        this.fetchApi();
      });
  }

  componentWillUnmount(){
    socket.off('new-contact', this.fetchApi);
  }

  renderContacts() {
    const { data } = this.state;

    return data.map(contact => {
      const { name, email, createdAt } = contact;

      return (
        <div className="card" key={contact._id}>
          <div className="content">
            <div className="header">{name}</div>
            <div className="meta">
              Criado em: {moment(createdAt).format('LLL')}
            </div>
            <div className="description">
              <strong>Email:</strong> {email} <br />
            </div>
          </div>
          <div className="extra content">
            <Link
              as="button"
              to={`/contact/${contact._id}`}
              className="ui primary icon button"
            >
              Ver visitas <i className="arrow right icon" />
            </Link>
          </div>
        </div>
      );
    });
  }

  render() {
    const { data, isFetching } = this.state;

    if (!isFetching && data.length) {
      return <div className="ui two stackable cards">{this.renderContacts()}</div>;
    } else if (isFetching) {
      return <LoadingMsg />;
    } else {
      return (
        <div className="ui icon message">
          <i className="frown icon" />
          <div className="content">
            <div className="header">Nenhum contato adicionado até agora</div>
            <p>
              Talvez você não tenha configurado corretamente o script de
              rastreamento em seu site!
            </p>
          </div>
        </div>
      );
    }
  }
}

export default ContactList;
