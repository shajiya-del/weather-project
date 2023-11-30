import React from 'react';
import './Buttons.css';

const isOperator = val => {
  return !isNaN(val) || val === '.' || val === '=';
};


const Buttons = props => (
  <div 
    id={props.id}
    className={`button-wrapper ${isOperator(props.children) ? null : "operator"}`} 
    onClick={() => props.onClick(props.children)}
    >
      {props.children}
  </div>
);


export default Buttons;