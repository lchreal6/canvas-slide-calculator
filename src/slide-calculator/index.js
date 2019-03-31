class Calculator {
  constructor(options) {
    const element = document.querySelector(options.element);
    this.element = element;
    const width = options.width;
    const height = options.height;
    this.ctx = element.getContext('2d');
    this.onSelect = options.onSelect;
    this.data = options.data;
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
    this.vx = 0;
    this.scrollDistance = 0;
    this.columnLen = options.data.length - 1;
    this.columnWidth = Math.ceil(this.width / 5);
    this.columnItemWidth = this.columnWidth / 10;
    this.ctx.lineWidth = 1 * this.devicePixelRatio;
  }

  drawTargetArrow() {
    const midWidth = this.width / 2;
    const arrowHeight = this.height * 0.3;

    this.ctx.strokeStyle = 'rgb(222, 222, 222)'
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.bottomLineHeight);
    this.ctx.lineTo(this.width, this.bottomLineHeight);
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.strokeStyle = 'rgb(73, 128, 219)'
    this.ctx.beginPath();
    this.ctx.moveTo(midWidth, this.bottomLineHeight); 
    this.ctx.lineTo(midWidth, arrowHeight);
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.fillStyle = 'rgb(73, 128, 219)'
    const arrowLineWidth = 10;
    const arrowLineHeight = arrowLineWidth * 0.70711;
    this.ctx.beginPath();
    this.ctx.moveTo(midWidth - arrowLineWidth/ 2, arrowHeight);
    this.ctx.lineTo(midWidth + arrowLineHeight/ 2, arrowHeight);
    this.ctx.lineTo(midWidth, arrowHeight - arrowLineHeight);
    this.ctx.closePath();
    this.ctx.fill();
  }

  draw() {
    // 刻画指向标尺
    this.drawTargetArrow();

    // 刻画刻度
    this.drawScale();
  } 

  drawScale() {
    const midWidth = this.width / 2; 
    const scaleHeight = this.width * 0.0267;
    const scaleItemHeight = this.width * 0.0133;
    const maxcolumn = this.columnWidth * this.columnLen;
    
    this.ctx.save();
    const startX = this.offsetX;
    this.ctx.translate(midWidth, this.bottomLineHeight)
    this.ctx.strokeStyle = 'rgb(222, 222, 222)';
    this.ctx.globalCompositeOperation = 'destination-over';
    for(let k = startX ; k <= maxcolumn + startX; k = k + this.columnWidth) {
      this.ctx.beginPath();
      this.ctx.moveTo(k, 0);
      this.ctx.lineTo(k, 0 - scaleHeight);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.textAlign = 'center';
      this.ctx.font = `${this.width * 0.033}px sans-serif`;
      this.ctx.fillStyle = 'rgb(222, 222, 222)';
      const index =Math.ceil((-startX + k)/this.columnWidth);
      const data = this.data[index];
      this.ctx.fillText(data, k, -scaleHeight - this.width * 0.0133);

      if(k === 0) {
        const selectIndex = (-startX + k)/this.columnWidth 
        this.onSelect && this.onSelect(this.data[selectIndex])
      }

      for(let j = k; j < k + this.columnWidth; j = j + this.columnItemWidth) {
        if(-startX + j <= maxcolumn) {
          this.ctx.beginPath();
          this.ctx.moveTo(j, 0);
          this.ctx.lineTo(j, 0 - scaleItemHeight);
          this.ctx.closePath();
          this.ctx.stroke();
        }
      }
    }
  }

  // 绑定触摸事件
  bindEvent() {
    let startX = 0;
    const self = this;
    let startTime = null;
    let endTime = null;
    this.element.addEventListener('touchstart', function(e) {
      self.press = true;
      startTime = new Date().getTime();
      self.scrollDistance = 0;
      self.vx = 0;
      const touch = e.targetTouches[0];
      startX = touch.pageX;
      e.preventDefault();
    })
    this.element.addEventListener('touchmove', function(e) {
      self.press = true;
      const touch = e.targetTouches[0];
      let offsetX = touch.pageX - startX;
      self.offsetX = self.offsetX + offsetX * self.devicePixelRatio;
      
      if(!self.scrollFlag) {
        if(offsetX > 0 && self.offsetX > self.width * 0.1) {
          self.offsetX  = self.width * 0.1;
        } else if (offsetX < 0 && self.offsetX < -self.columnWidth * self.columnLen - self.width * 0.1) {
          self.offsetX  = -self.columnWidth * self.columnLen - self.width * 0.1;
        }
      }
       

      startX = touch.pageX;
      self.vx = offsetX;
      e.preventDefault();
    })
    this.element.addEventListener('touchend', function(e) {
      self.press = false;
      endTime = new Date().getTime();
      const time = endTime - startTime;
      
      if(time < 300) {
        if(self.vx < - 0) {
          self.scrollDistance = - self.columnWidth * self.columnLen * 20 * self.devicePixelRatio / time;
          if(self.scrollDistance + self.offsetX <  -self.columnWidth * self.columnLen - self.width * 0.1) {
            self.scrollDistance = -self.columnWidth * self.columnLen - self.width * 0.1 - self.offsetX;
          }
        } else if (self.vx > 0) {
          self.scrollDistance = self.columnWidth * self.columnLen * 20 * self.devicePixelRatio / time;
          if(self.scrollDistance + self.offsetX > self.width * 0.1) {
            self.scrollDistance = self.width * 0.1 - self.offsetX;
          }
        }
        self.scrollFlag = true;
      } else {
        self.scrollFlag = false;
      }

      e.preventDefault();
    })
  }

  // 滑动停止后，调整回到合适的位置
  adjustPosition() {
    const selectIndex = Math.round(-this.offsetX / this.columnWidth);
    const targetDistance = selectIndex * this.columnWidth;
    let adjustDistance = null;

    if(selectIndex < 0) {
      adjustDistance = Math.abs(-this.offsetX - 0);
      let speed = adjustDistance / 5;
      this.offsetX = this.offsetX - speed;
    } else if (selectIndex > this.columnLen) {
      adjustDistance = Math.abs(-this.offsetX - this.columnWidth * this.columnLen);
      let speed = adjustDistance / 5;
      this.offsetX = this.offsetX + speed;
    } else{
      adjustDistance = Math.abs(-this.offsetX -  targetDistance);
      let speed = adjustDistance / 5;
      targetDistance > -this.offsetX ? (this.offsetX = this.offsetX - speed) : (this.offsetX = this.offsetX + speed); 
    }

    if(adjustDistance < 1) {
      this.offsetX = -selectIndex * this.columnWidth;
      this.press = true;
    }
  }

  scrollMove() {
    let speed = this.scrollDistance / 10;
    this.scrollDistance = this.scrollDistance - speed;
    this.offsetX = this.offsetX + speed;

    if(Math.abs(this.scrollDistance) < 1) {
      this.scrollFlag = false;
    }
  }

  render() {
    setInterval(() => {
      this.ctx.clearRect(0,0, this.width, this.height);
      this.draw(); 
      this.ctx.restore();
      this.scrollFlag && this.scrollMove();
      !this.press && !this.scrollFlag && this.adjustPosition();
    }, 1000 / 60);
    this.bindEvent();
  }
}

export default Calculator;