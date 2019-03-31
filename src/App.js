import React, { Component } from 'react';
import './App.css';
import Calculator from './slide-calculator/index';

class App extends Component {

  state = {
    activeIndex: 0
  }



  componentDidMount() {
    const self = this;
    const arrData = this.handleData(100000, 1000)
    const options = {
      width: window.innerWidth,
      height: 100,
      element: '#calculator',
      data: arrData,
      onSelect(data) {
        self.setState({
          activeIndex: data
        })
      }
    }

    const cal = new Calculator(options);
    cal.render(); 
  }

  handleData(maxNum, gap) {
    const arr = [];
    for(let i = 0; i <= maxNum; i= i + gap) {
      arr.push(i);
    }
    return arr;
  }

  render() {
    return (
      <div className="App">
        <div className="index-tips">
          <div className="tips-title">买多少(元)</div>
          <div className="tips-money">{this.state.activeIndex}</div>
        </div>
        <canvas id="calculator"></canvas> 
        <div className="expect-amount">
          <div>过去7天收益(元)</div>
          <div className="expect-money">{(this.state.activeIndex * 0.8934 / 52).toFixed(2)}</div>
        </div>
      </div>
    );
  }
}

export default App;
