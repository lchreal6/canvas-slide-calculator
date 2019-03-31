import React, { Component } from 'react';
import './App.css';
import Calculator from './slide-calculator/index';

class App extends Component {

  state = {
    activeIndex: 0
  }

  componentDidMount() {
    const self = this;
    const options = {
      width: window.innerWidth,
      height: 100,
      element: '#calculator',
      data: [0, 10, 25, 33, 40, 55, 63, 78, 89, 99 ,109],
      onSelect(data) {
        self.setState({
          activeIndex: data
        })
      }
    }

    const cal = new Calculator(options);
    cal.render(); 
  }

  render() {
    return (
      <div className="App">
        <div className="index-tips"><span>activeIndex: {this.state.activeIndex}</span></div>
        <canvas id="calculator"></canvas> 
      </div>
    );
  }
}

export default App;
