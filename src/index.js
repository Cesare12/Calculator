import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Display extends React.Component {
  render() {
    return (
      
      <input></input>
    )
  }
}

class Key extends React.Component {
  // constructor(props){
  //   super(props)
  // }
  
  
  render() {
    console.log(this.props);
    return (
        <button/>
    )
  }
}


class App extends React.Component {
  render() {
    return (
      <>
        <div>
          <Display />
        </div>
        <div>
          <Key value = {'AC'}/>
          <Key>+</Key>
          <Key />
          <Key />
        </div>
        <div>
          <Key />
          <Key />
          <Key />
          <Key />
        </div>
        <div>
          <Key />
          <Key />
          <Key />
          <Key />
        </div>
        <div>
          <Key />
          <Key />
          <Key />
          <Key />
        </div>
        <div>
          <Key />
          <Key />
        </div>
      </>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)