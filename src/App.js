import React from 'react';
import './App.css';
import Display from './Display';
import Buttons from './Buttons';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false
    }
  }

  inputDigit = digit => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }

  inputDot = () => {
    const { displayValue } = this.state;

    if (!(/\./).test(displayValue)) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      })
    }
  }

  performOperation = nextOperator => {
    const { value, displayValue, operator } = this.state;
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      this.setState({
        value: inputValue
      })
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue)

      this.setState({
        value: newValue,
        displayValue: String(newValue)
      })
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    })
  }

  clearDisplay = () => {
    this.setState({
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false
    })
  }

  render() {
    const { displayValue } = this.state;
    
    return (
      <div id="app">
      
        <div className="calculator-wrapper">
        <h1>ReactJS Calculator</h1>
      
        <Display 
        displayValue={displayValue} 
        />
        <div className="row">
          <Buttons id="seven" onClick={() => this.inputDigit(7)}>7</Buttons>
          <Buttons id="eight" onClick={() => this.inputDigit(8)}>8</Buttons>
          <Buttons id="nine" onClick={() => this.inputDigit(9)}>9</Buttons>
          <Buttons id="divide" onClick={() => this.performOperation('/')}>/</Buttons>
        </div>

        <div className="row">
         <Buttons id="four" onClick={() => this.inputDigit(4)}>4</Buttons>
          <Buttons id="five" onClick={() => this.inputDigit(5)}>5</Buttons>
          <Buttons id="six" onClick={() => this.inputDigit(6)}>6</Buttons>
          <Buttons id="multiply" onClick={() => this.performOperation('*')}>*</Buttons>
        </div>

        <div className="row">
          <Buttons id="one" onClick={() => this.inputDigit(1)}>1</Buttons>
          <Buttons id="two" onClick={() => this.inputDigit(2)}>2</Buttons>
          <Buttons id="three" onClick={() => this.inputDigit(3)}>3</Buttons>
          <Buttons id="add" onClick={() => this.performOperation('+')}>+</Buttons>
        </div>

        <div className="row">
          <Buttons id="decimal" onClick={() => this.inputDot()}>.</Buttons>
          <Buttons id="zero" onClick={() => this.inputDigit(0)}>0</Buttons>
          <Buttons id="equals" onClick={() => this.performOperation('=')}>=</Buttons>
          <Buttons id="subtract" onClick={() => this.performOperation('-')}>-</Buttons>
        </div>

        <div className="row">
          <div
            id="clear"
            className="clear-btn" 
            onClick={() => this.clearDisplay()}>
             clear 
            </div>
        </div>
        
        <p className="github"><small>by:</small> Milos Rancic 
          <a href="https://github.com/milosrancic" target="_blank">
        <i className="fab fa-github"></i>
      </a>
    </p> 
        </div>
        
      </div>
    )
  }
}

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

export default App;