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

  calculateExpression(str) {
    const len = str.length;
    let val1, val2, operate;

    for (let i = 1; i < len; i++) {
      if (str[i] !== '.' && isNaN(str[i])) {
        operate = str[i];
        let tmpStr = str;
        val1 = tmpStr.substring(0, i);
        tmpStr = str;
        val2 = tmpStr.substring(i + 1, len)
        break;
      }
    }
    console.log(val1, val2, operate)
    const result = CalculatorOperations[operate](parseFloat(val1), parseFloat(val2));
    return result;
  }

  calculateString(str) {
    console.log('calculateString: ', str)
    if (!isNaN(str)) {//纯数字
      return str;
    }

    if (!isNaN(str.substr(0, str.length - 1))) {//去掉最后一个字符是纯数字
      if (str[str.length - 1] === '=') {//最后一位是'='
        str = str.substring(0, str.length - 1);
      }
      return str;
    }

    if (!isNaN(str[str.length - 1])) {//最后一位数字，表达式
      return this.calculateExpression(str);
    }

    if (isNaN(str[str.length - 1])) {//最后一位字符，去掉最后一个字符是表达式
      const result = this.calculateExpression(str.substring(0, str.length - 1));
      return result + (str[str.length - 1] === "=" ? "" : str[str.length - 1])
    }
  }

  parseClickString(str) {
    //去掉首位0
    if (str[0] === '0' && !isNaN(str[1])) {
      str = str.substring(1, str.length);
    }
    //过滤结尾
    if (CalculatorOperations[str[str.length - 1]] && CalculatorOperations[str[str.length - 2]]) {
      str = str.substring(0, str.length - 2) + str[str.length - 1];
    }
    console.log('handle: ', str);

    if (str[str.length - 1] === 'C') {
      return '0'
    }

    if (str[str.length - 1] === '±') {
      return (str[0] === '-' ? str.substring(1, str.length - 1) : '-' + str.substring(0, str.length - 1))
    }

    if (str[str.length - 1] === '%') {
      if (!isNaN(str[str.length - 2])) {//数字求%
        return parseFloat(this.calculateString(str.substring(0, str.length - 1))) / 100 + "";
      } else {//表达式求%
        return parseFloat(this.calculateString(str.substring(0, str.length - 2))) / 100 + str[str.length - 2];
      }
    }

    if (CalculatorOperations[str[str.length - 1]]){//计算
      return this.calculateString(str) + "";
    }

    return str;
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
