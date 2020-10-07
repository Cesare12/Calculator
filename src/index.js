import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Display extends React.Component {
  render() {
    return (
      <div className='Display'>0</div>
    )
  }
}

class Key extends React.Component {
  // constructor(props){
  //   super(props)
  // }
  render() {
    const keyValue = this.props.keyValue
    return (
      <button className={keyValue.attr} id={`key-${keyValue.char}`}>{keyValue.char}</button>
    )
  }
}
class KeyBoard extends React.Component {
  render() {
    const rows = [];
    this.props.keyValues.forEach(k => {
      rows.push(
        <Key
          keyValue={k}
          key={k.char}
        />
      );
    });

    return (
      <div className='KeyBoard'>{rows}</div>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Display />
        <KeyBoard keyValues={this.props.keyValues} />
      </div>
    )
  }
}

const KEYBOARD = [
  { attr: 'function', char: 'C' },
  { attr: 'function', char: '±' },
  { attr: 'function', char: '%' },
  { attr: 'operator', char: '÷' },
  { attr: 'digit', char: '7' },
  { attr: 'digit', char: '8' },
  { attr: 'digit', char: '9' },
  { attr: 'operator', char: '×' },
  { attr: 'digit', char: '4' },
  { attr: 'digit', char: '5' },
  { attr: 'digit', char: '6' },
  { attr: 'operator', char: '-' },
  { attr: 'digit', char: '1' },
  { attr: 'digit', char: '2' },
  { attr: 'digit', char: '3' },
  { attr: 'operator', char: '+' },
  { attr: 'digit', char: '0' },
  { attr: 'digit', char: '.' },
  { attr: 'operator', char: '=' }
]
const rootElement = document.getElementById('root')
ReactDOM.render(<App keyValues={KEYBOARD} />, rootElement)
