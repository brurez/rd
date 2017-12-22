import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

class Visits extends Component {
  state = { data: [], isFetching: true };

  componentDidMount() {
    axios
      .get('/api/visits?sort=-visitedAt&limit=10')
      .then(res => {
        const { data } = res.data;
        this.setState({ data, isFetching: false });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { data, isFetching } = this.state;
    if (!isFetching && data.length) {
      const visits = this.state.data.map(visit => {
        //debugger;
        return (
          <tr key={visit._id}>
            <td>{moment(visit.visitedAt).format('LLL')}</td>
            <td>{visit.url}</td>
            <td>{visit._contact && visit._contact.email || 'Anonimo'}</td>
          </tr>
        );
      });

      return (
        <table className="ui compact table">
          <thead>
          <tr>
            <th>Data da Visita</th>
            <th>Endereço da Página</th>
            <th>Contato</th>
          </tr>
          </thead>
          <tbody>{visits}</tbody>
        </table>
      );
    }else{
      return <div>Loading...</div>
    }
  }
}

export default Visits;
