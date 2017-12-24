import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import LoadingMsg from './LoadingMsg';

class Visits extends Component {
  state = { data: [], isFetching: true, firstTime: true };

  componentDidMount() {
    this.fetchApi();
    this.interval = setInterval(() => {
      this.fetchApi();
    }, 6000);
  }

  fetchApi() {
    this.setState({ isFetching: true });
    axios
      .get('/api/visits?sort=-visitedAt&limit=10')
      .then(res => {
        const {  data } = res.data;
        this.setState({ data, isFetching: false, firstTime: false });
      })
      .catch(err => {
        console.log(err);
        this.fetchApi();
      });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { data, isFetching, firstTime } = this.state;
    if (!firstTime && data.length) {
      const visits = this.state.data.map(visit => {
        //debugger;
        return (
          <tr key={visit._id}>
            <td>{moment(visit.visitedAt).format('LLL')}</td>
            <td>{visit.url}</td>
            <td>{(visit._contact && visit._contact.email) || 'Anonimo'}</td>
            <td className="collapsing" />
          </tr>
        );
      });

      const iconColor = isFetching ? 'inherit' : 'rgb(255, 255, 255)';

      return (
        <table className="ui striped compact table">
          <thead>
            <tr>
              <th>Data da Visita</th>
              <th>Endereço da Página</th>
              <th>Contato</th>
              <th>
                <i className="spinner loading transparent icon" style={{color: iconColor}}/>
              </th>
            </tr>
          </thead>
          <tbody>{visits}</tbody>
        </table>
      );
    } else if ( firstTime ) {
      return <LoadingMsg />;
    } else {
      return (
        <div className="ui icon message">
          <i className="frown icon" />
          <div className="content">
            <div className="header">Nenhuma visita até agora</div>
            <p>
              Tenha um pouco de paciência, ainda vão querer visitar seu site.
            </p>
          </div>
        </div>
      );
    }
  }
}

export default Visits;
