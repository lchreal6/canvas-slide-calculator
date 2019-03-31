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

    this.press = false;
    this.columnLen = 3;
    this.columnWidth = Math.ceil(this.width / 5);
    this.columnItemWidth = this.columnWidth / 10;
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

    const scaleHeight = 10;
    const scaleItemHeight = 5;
    const Maxcolumn = this.columnWidth * this.columnLen;
    
    this.ctx.save();
    const startX = this.offsetX;
    this.ctx.translate(midWidth, this.bottomLineHeight)
    for(let k = startX ; k <= Maxcolumn + startX; k = k + this.columnWidth) {
      this.ctx.beginPath();
      this.ctx.moveTo(k, 0);
      this.ctx.lineTo(k, 0 - scaleHeight);
      this.ctx.closePath();
      this.ctx.stroke();

      for(let j = k; j < k + this.columnWidth; j = j + this.columnItemWidth) {
        if(-startX + j <= Maxcolumn) {
          this.ctx.beginPath();
          this.ctx.moveTo(j, 0);
          this.ctx.lineTo(j, 0 - scaleItemHeight);
          this.ctx.closePath();
          this.ctx.stroke();
        }
      }
    }
  }

  bindEvent() {
    let startX = 0;
    const self = this;
    this.element.addEventListener('touchstart', function(e) {
      self.press = true;
      console.log('start')
      const touch = e.targetTouches[0];
      startX = touch.pageX;
      e.preventDefault();
    })
    this.element.addEventListener('touchmove', function(e) {
      self.press = true;
      const touch = e.targetTouches[0];
      let offsetX = touch.pageX - startX;
      self.offsetX = self.offsetX + offsetX * self.devicePixelRatio;
      startX = touch.pageX;
      // console.log('offsetX', self.offsetX);
      console.log('move')
      e.preventDefault();
    })
    this.element.addEventListener('touchend', function(e) {
      self.press = false;
      e.preventDefault();
    })
  }

  adjustPosition() {
    const selectIndex = Math.round(-this.offsetX / this.columnWidth);
    const targetDistance = selectIndex * this.columnWidth;
    // let adjustDistance = Math.abs(-this.offsetX -  targetDistance);
    let adjustDistance = null;
    // let speed = adjustDistance / 15;

    if(selectIndex < 0) {
      adjustDistance = Math.abs(-this.offsetX - 0);
      let speed = adjustDistance / 15;
      this.offsetX = this.offsetX - speed;
    } else if (selectIndex > this.columnLen) {
      adjustDistance = Math.abs(-this.offsetX - this.columnWidth * this.columnLen);
      let speed = adjustDistance / 15;
      this.offsetX = this.offsetX + speed;
    } else{
      adjustDistance = Math.abs(-this.offsetX -  targetDistance);
      let speed = adjustDistance / 15;
      targetDistance > -this.offsetX ? (this.offsetX = this.offsetX - speed) : (this.offsetX = this.offsetX + speed); 
    }

    if(adjustDistance < 1) {
      this.offsetX = -selectIndex * this.columnWidth;
      this.press = true;
    }
    // console.log('aaa', this.offsetX)
    // console.log('selectIndex', selectIndex)   
    // console.log('adjustDistance', adjustDistance);
  }

  render() {
    setInterval(() => {
      this.ctx.clearRect(0,0, this.width, this.height);
      this.drawScale(); 
      this.ctx.restore();
      !this.press && this.adjustPosition();
    }, 1000 / 60);
    this.bindEvent();
  }
}

export default Calculator;