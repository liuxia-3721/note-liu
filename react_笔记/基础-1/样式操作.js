import React from 'react';
import ReactDom from 'react-dom';

import App from './components/App'

import './assets/css/base.css';//全局样式


ReactDom.render(
  <App />,
  document.querySelector('#root')
);