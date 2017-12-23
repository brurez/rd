import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { dark } from 'react-syntax-highlighter/styles/prism';

const HowTo = () => {
  const code = `
    <script src="${window.location.origin}/public/tracker.js"></script>
    <script>rdTracker.init()</script>`;
  const code2 = `
    <form id="rd-form">
        <label for="name">Nome</label>
            <input id="name" name="name" type="text">       
            <label for="email">Email</label>
            <input id="email" name="email" type="text">        
        <button type="submit">Registrar</button>
    </form>`;
  const code3 = `
    <script src="${window.location.origin}/public/tracker.js"></script>
    <script>rdTracker.init({
        tag: 'rd-tracker',
        server: 'https://rdtracker.herokuapp.com/',
        formId: 'rd-form'
    })</script>
  `;
  const code4 = `
    <script>rdTracker.setUser({ name: 'João da Silva Sauro', email: 'joao@sauro.com'})</script>`;

  return (
    <div>
      <h2>
        <i className="icon info circle" /> Como Usar a Ferramenta{' '}
      </h2>
      <p>
        Para utilizar o rastreador em sua página é muito fácil! Insira o código
        abaixo em todas as páginas de seu site:
      </p>
      <SyntaxHighlighter language="javascript" style={dark}>
        {code}
      </SyntaxHighlighter>
      <p>
        Com isso você vai poder ver na <a href="/">página inicial</a> todas as
        visitas que seu site esta tendo em tempo real.
      </p>
      <p>
        Agora se você quiser ver o nome e o email de quem está visitando seu
        site, basta colocar o código html abaixo em uma de suas páginas:
      </p>
      <SyntaxHighlighter language="javascript" style={dark}>
        {code2}
      </SyntaxHighlighter>
      <p>Depois que seu visitante preencher os dados e clicar no botão Registrar, sempre que ele visitar a página suas
      informações completas irão aparecer.</p>
      <p>Também é possível você configurar a ferramenta do seu jeito. As seguintes configurações abaixo
      estão disponíveis (os valores padrões estão mostrados):</p>
      <SyntaxHighlighter language="javascript" style={dark}>
        {code3}
      </SyntaxHighlighter>
      <p>Outra possibilidade é você por conta própria executar a função que define o nome e email do visitante.
      Apenas para usuários avançados!</p>
      <SyntaxHighlighter language="javascript" style={dark}>
        {code4}
      </SyntaxHighlighter>
    </div>
  );
};

export default HowTo;
