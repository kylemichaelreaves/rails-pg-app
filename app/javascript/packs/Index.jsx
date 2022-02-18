// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { hello_typescript } from 'hello_typescript'

function Hello (props) {
  return <div>Hello {props.name}!</div>
}


Hello.defaultProps = {
  name: 'Kyle'
}

Hello.propTypes = {
  name: PropTypes.string
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
      <hello_typescript name="React" />,
      <App />,
      document.body.appendChild(document.createElement('h1'))
    );
  });


