import { maxHeaderSize } from "http";

class Calculator {

  constructor(options) {
    console.log(options)
    const element = document.querySelector(options.element);
    this.element = element;
    const width = options.width;
    const height = options.height;
    this.ctx = element.getContext('2d');
    console.log(this.ctx)
    this.devicePixelRatio = window.devicePixelRatio;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    this.width = width * this.devicePixelRatio;
    this.height = height * this.devicePixelRatio; 

    element.width = this.width;
    element.height = this.height; 
    this.bottomLineHeight = this.height * 0.81;
    this.offsetX = 0;
  }

  drawScale() {
    this.ctx.lineWidth = 1 * this.devicePixelRatio;

    this.ctx.beginPath();
    this.ctx.moveTo(0, this.bottomLineHeight);
    this.ctx.lineTo(this.width, this.bottomLineHeight);
    this.ctx.closePath();
    this.ctx.stroke();
    
    this.drawArrow();
  } 

  drawArrow() {
    const midWidth = this.width / 2;
    const arrowHeight = this.height * 0.3;
    this.ctx.beginPath();
    this.ctx.moveTo(midWidth, this.bottomLineHeight); 
    this.ctx.lineTo(midWidth, arrowHeight);
    this.ctx.closePath();
    this.ctx.stroke();


    const arrowLineWidth = 10;
    const arrowLineHeight = arrowLineWidth * 0.70711;
    this.ctx.beginPath();
    this.ctx.moveTo(midWidth - arrowLineWidth/ 2, arrowHeight);
    this.ctx.lineTo(midWidth + arrowLineHeight/ 2, arrowHeight);
    this.ctx.lineTo(midWidth, arrowHeight - arrowLineHeight);
    this.ctx.closePath();
    this.ctx.stroke();

    const columnWidth = this.width / 5;
    const columnItemWidth = columnWidth / 10;
    const scaleHeight = 10;
    const scaleItemHeight = 5;
    const Maxcolumn = columnWidth * 10;
    
    this.ctx.save();
    const startX = this.offsetX;
    console.log('startX', startX)
    this.ctx.translate(midWidth, this.bottomLineHeight)
    for(let k = startX ; k < Maxcolumn + startX; k = k + columnWidth) {
      this.ctx.beginPath();
      this.ctx.moveTo(k, 0);
      this.ctx.lineTo(k, 0 - scaleHeight);
      this.ctx.closePath();
      this.ctx.stroke();

      for(let j = k; j < k + columnWidth; j = j + columnItemWidth) {
        this.ctx.beginPath();
        this.ctx.moveTo(j, 0);
        this.ctx.lineTo(j, 0 - scaleItemHeight);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    }
  }

  bindEvent() {
    let startX = 0;
    const self = this;
    this.element.addEventListener('touchstart', function(e) {
      console.log('start')
      const touch = e.targetTouches[0];
      startX = touch.pageX;
      e.preventDefault();
    })
    this.element.addEventListener('touchmove', function(e) {
      const touch = e.targetTouches[0];
      let offsetX = touch.pageX - startX;
      self.offsetX = self.offsetX + offsetX * self.devicePixelRatio;
      startX = touch.pageX;
      console.log('offsetX', self.offsetX);
      console.log('move')
      e.preventDefault();
    })
    this.element.addEventListener('touchend', function(e) {
      e.preventDefault();
    })
  }

  render() {
    setInterval(() => {
      this.ctx.clearRect(0,0, this.width, this.height);
      this.drawScale(); 
      this.ctx.restore();
    }, 1000 / 60);
    this.bindEvent();
  }
}

export default Calculator;