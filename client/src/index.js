import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import FoodInputForm from './FoodInputForm';

ReactDOM.render(
  <React.StrictMode>
    <FoodInputForm />
  </React.StrictMode>,
  document.getElementById('edit-item-container')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
