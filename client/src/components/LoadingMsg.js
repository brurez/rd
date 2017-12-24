import React from 'react';

export default () => {
  return (
    <div className="ui icon message">
      <i className="notched circle loading icon"/>
      <div className="content">
        <div className="header">
          Espere um segundo
        </div>
        <p>Estamos baixando o conteúdo para você.</p>
      </div>
    </div>
  )
}
