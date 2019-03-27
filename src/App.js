import React, { Component } from 'react';
import './App.css';
import Calculator from './slide-calculator/index';

class App extends Component {

  componentDidMount() {
    const options = {
      width: 350,
      height: 100,
      element: '#calculator'
    }

    const cal = new Calculator(options);
    cal.render(); 
  }

  render() {
    return (
      <div className="App">
       <canvas id="calculator"></canvas> 
      </div>
    );
  }
}

export default App;
