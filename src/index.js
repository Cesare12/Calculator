import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Display extends React.Component {
  render() {
    const show = this.props.displayValue;
    let style = ''
    if (show.length <= 6) {
      style = { fontSize: '70px' };
    } else if (show.length <= 15) {
      style = { fontSize: parseInt(95 - 5 * show.length) + 'px' };
    } else {
      style = { fontSize: '20px' };
    }

    return (
      <div className='Display' style={style}>{show}</div>
    )
  }
}

class Key extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onPress(e.target.value);
  }

  render() {
    const keyValue = this.props.children
    return (
      <button
        className={this.props.className}
        id={this.props.id}
        onClick={this.handleClick}
        value={keyValue}
      >
        {keyValue}
      </button>
    )
  }
}
const CalculatorOperations = {
  '÷': (prevValue, nextValue) => prevValue / nextValue,
  'x': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: '0',
    };
    this.handlePress = this.handlePress.bind(this);
  }

  parseClickString(str) {
    console.log(str);
    if (str[str.length - 1] === 'C') {
      str = '0'
    } else if (str[str.length - 1] === '±') {

    } else if (str[str.length - 1] === '%') {

    } else {
      if (!isNaN(str[str.length - 1])) {
        console.log("number1:", str)
      } else if (!isNaN(str.substr(0, str.length - 1))) {
        if (str[str.length - 1] === '=') {
          str = str.substring(0, str.length - 1);
        }
        console.log("number2:", str)
      } else {
        const len = str.length;
        let [val1, val2, operate] = [1, 1, 1];

        for (let i = 0; i < len; i++) {
          if (isNaN(str[i])) {
            operate = str[i];
            let tmpStr = str;
            val1 = tmpStr.substring(0, i);
            tmpStr = str;
            val2 = tmpStr.substring(i + 1, len - 1)
            break;
          }
        }
        console.log(val1, val2, operate)

        const result = CalculatorOperations[operate](val1, val2);
        return result + (str[str.length - 1] === "=" ? "" : str[str.length - 1])
      }
    }
    return str
  }

  handlePress(x) {
    let displayValue = this.state.displayValue;
    displayValue += x;

    this.setState(
      { displayValue: this.parseClickString(displayValue) }
    )
    // console.log(this);
  }

  render() {
    return (
      <div className='app'>
        <Display displayValue={this.state.displayValue} />
        <div className='KeyBoard'>
          <Key className="function" onPress={this.handlePress}>C</Key>
          <Key className="function" onPress={this.handlePress}>±</Key>
          <Key className="function" onPress={this.handlePress}>%</Key>
          <Key className="operator" onPress={this.handlePress}>÷</Key>
          <Key className="digit" onPress={this.handlePress}>7</Key>
          <Key className="digit" onPress={this.handlePress}>8</Key>
          <Key className="digit" onPress={this.handlePress}>9</Key>
          <Key className="operator" onPress={this.handlePress}>x</Key>
          <Key className="digit" onPress={this.handlePress}>4</Key>
          <Key className="digit" onPress={this.handlePress}>5</Key>
          <Key className="digit" onPress={this.handlePress}>6</Key>
          <Key className="operator" onPress={this.handlePress}>-</Key>
          <Key className="digit" onPress={this.handlePress}>1</Key>
          <Key className="digit" onPress={this.handlePress}>2</Key>
          <Key className="digit" onPress={this.handlePress}>3</Key>
          <Key className="operator" onPress={this.handlePress}>+</Key>
          <Key className="digit" id="key-0" onPress={this.handlePress}>0</Key>
          <Key className="digit" onPress={this.handlePress}>.</Key>
          <Key className="operator" onPress={this.handlePress}>=</Key>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
