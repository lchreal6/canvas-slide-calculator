(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(t,e,i){},15:function(t,e,i){},16:function(t,e,i){"use strict";i.r(e);var s=i(0),h=i.n(s),o=i(4),n=i.n(o),c=(i(14),i(1)),a=i(2),l=i(6),r=i(5),d=i(7),f=(i(15),function(){function t(e){Object(c.a)(this,t);var i=document.querySelector(e.element);this.element=i;var s=e.width,h=e.height;this.ctx=i.getContext("2d"),this.onSelect=e.onSelect,this.data=e.data,this.devicePixelRatio=window.devicePixelRatio,i.style.width="".concat(s,"px"),i.style.height="".concat(h,"px"),this.width=s*this.devicePixelRatio,this.height=h*this.devicePixelRatio,i.width=this.width,i.height=this.height,this.bottomLineHeight=.81*this.height,this.offsetX=0,this.press=!1,this.vx=0,this.scrollDistance=0,this.columnLen=e.data.length-1,this.columnWidth=Math.ceil(this.width/5),this.columnItemWidth=this.columnWidth/10,this.ctx.lineWidth=1*this.devicePixelRatio}return Object(a.a)(t,[{key:"drawTargetArrow",value:function(){var t=this.width/2,e=.3*this.height;this.ctx.strokeStyle="rgb(222, 222, 222)",this.ctx.beginPath(),this.ctx.moveTo(0,this.bottomLineHeight),this.ctx.lineTo(this.width,this.bottomLineHeight),this.ctx.closePath(),this.ctx.stroke(),this.ctx.strokeStyle="rgb(73, 128, 219)",this.ctx.beginPath(),this.ctx.moveTo(t,this.bottomLineHeight),this.ctx.lineTo(t,e),this.ctx.closePath(),this.ctx.stroke(),this.ctx.fillStyle="rgb(73, 128, 219)";this.ctx.beginPath(),this.ctx.moveTo(t-5,e),this.ctx.lineTo(t+3.53555,e),this.ctx.lineTo(t,e-7.0711),this.ctx.closePath(),this.ctx.fill()}},{key:"draw",value:function(){this.drawTargetArrow(),this.drawScale()}},{key:"drawScale",value:function(){var t=this.width/2,e=.0267*this.width,i=.0133*this.width,s=this.columnWidth*this.columnLen;this.ctx.save();var h=this.offsetX;this.ctx.translate(t,this.bottomLineHeight),this.ctx.strokeStyle="rgb(222, 222, 222)",this.ctx.globalCompositeOperation="destination-over";for(var o=h;o<=s+h;o+=this.columnWidth){this.ctx.beginPath(),this.ctx.moveTo(o,0),this.ctx.lineTo(o,0-e),this.ctx.closePath(),this.ctx.stroke(),this.ctx.textAlign="center",this.ctx.font="".concat(.033*this.width,"px sans-serif"),this.ctx.fillStyle="rgb(222, 222, 222)";var n=Math.ceil((-h+o)/this.columnWidth),c=this.data[n];if(this.ctx.fillText(c,o,-e-.0133*this.width),0===o){var a=(-h+o)/this.columnWidth;this.onSelect&&this.onSelect(this.data[a])}for(var l=o;l<o+this.columnWidth;l+=this.columnItemWidth)-h+l<=s&&(this.ctx.beginPath(),this.ctx.moveTo(l,0),this.ctx.lineTo(l,0-i),this.ctx.closePath(),this.ctx.stroke())}}},{key:"bindEvent",value:function(){var t=0,e=this,i=null;this.element.addEventListener("touchstart",function(s){e.press=!0,i=(new Date).getTime(),e.scrollDistance=0,e.vx=0;var h=s.targetTouches[0];t=h.pageX,s.preventDefault()}),this.element.addEventListener("touchmove",function(i){e.press=!0;var s=i.targetTouches[0],h=s.pageX-t;e.offsetX=e.offsetX+h*e.devicePixelRatio,e.scrollFlag||(h>0&&e.offsetX>.1*e.width?e.offsetX=.1*e.width:h<0&&e.offsetX<-e.columnWidth*e.columnLen-.1*e.width&&(e.offsetX=-e.columnWidth*e.columnLen-.1*e.width)),t=s.pageX,e.vx=h,i.preventDefault()}),this.element.addEventListener("touchend",function(t){e.press=!1;var s=(new Date).getTime()-i;s<300?(e.vx<-0?(e.scrollDistance=-e.columnWidth*e.columnLen*20*e.devicePixelRatio/s,e.scrollDistance+e.offsetX<-e.columnWidth*e.columnLen-.1*e.width&&(e.scrollDistance=-e.columnWidth*e.columnLen-.1*e.width-e.offsetX)):e.vx>0&&(e.scrollDistance=e.columnWidth*e.columnLen*20*e.devicePixelRatio/s,e.scrollDistance+e.offsetX>.1*e.width&&(e.scrollDistance=.1*e.width-e.offsetX)),e.scrollFlag=!0):e.scrollFlag=!1,t.preventDefault()})}},{key:"adjustPosition",value:function(){var t=Math.round(-this.offsetX/this.columnWidth),e=t*this.columnWidth,i=null;if(t<0){var s=(i=Math.abs(-this.offsetX-0))/5;this.offsetX=this.offsetX-s}else if(t>this.columnLen){var h=(i=Math.abs(-this.offsetX-this.columnWidth*this.columnLen))/5;this.offsetX=this.offsetX+h}else{var o=(i=Math.abs(-this.offsetX-e))/5;e>-this.offsetX?this.offsetX=this.offsetX-o:this.offsetX=this.offsetX+o}i<1&&(this.offsetX=-t*this.columnWidth,this.press=!0)}},{key:"scrollMove",value:function(){var t=this.scrollDistance/10;this.scrollDistance=this.scrollDistance-t,this.offsetX=this.offsetX+t,Math.abs(this.scrollDistance)<1&&(this.scrollFlag=!1)}},{key:"render",value:function(){var t=this;setInterval(function(){t.ctx.clearRect(0,0,t.width,t.height),t.draw(),t.ctx.restore(),t.scrollFlag&&t.scrollMove(),!t.press&&!t.scrollFlag&&t.adjustPosition()},1e3/60),this.bindEvent()}}]),t}()),u=function(t){function e(){var t,i;Object(c.a)(this,e);for(var s=arguments.length,h=new Array(s),o=0;o<s;o++)h[o]=arguments[o];return(i=Object(l.a)(this,(t=Object(r.a)(e)).call.apply(t,[this].concat(h)))).state={activeIndex:0},i}return Object(d.a)(e,t),Object(a.a)(e,[{key:"componentDidMount",value:function(){var t=this,e={width:window.innerWidth,height:100,element:"#calculator",data:[0,10,25,33,40,55,63,78,89,99,109],onSelect:function(e){t.setState({activeIndex:e})}};new f(e).render()}},{key:"render",value:function(){return h.a.createElement("div",{className:"App"},h.a.createElement("div",{className:"index-tips"},h.a.createElement("span",null,"activeIndex: ",this.state.activeIndex)),h.a.createElement("canvas",{id:"calculator"}))}}]),e}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n.a.render(h.a.createElement(u,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},8:function(t,e,i){t.exports=i(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.9869282f.chunk.js.map