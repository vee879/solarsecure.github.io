
(function(root,factory){if(typeof exports==='object'){module.exports=factory(require('jquery'));}
else if(typeof define==='function'&&define.amd){define(['jquery'],factory);}
else{factory(root.jQuery);}}(this,function($){var CanvasRenderer=function(el,options){var cachedBackground;var canvas=document.createElement('canvas');el.appendChild(canvas);if(typeof(G_vmlCanvasManager)!=='undefined'){G_vmlCanvasManager.initElement(canvas);}
var ctx=canvas.getContext('2d');canvas.width=canvas.height=options.size;var scaleBy=1;if(window.devicePixelRatio>1){scaleBy=window.devicePixelRatio;canvas.style.width=canvas.style.height=[options.size,'px'].join('');canvas.width=canvas.height=options.size*scaleBy;ctx.scale(scaleBy,scaleBy);}
ctx.translate(options.size/2,options.size/2);ctx.rotate((-1/2+options.rotate/180)*Math.PI);var radius=(options.size-options.lineWidth)/2;if(options.scaleColor&&options.scaleLength){radius-=options.scaleLength+2;}
Date.now=Date.now||function(){return+(new Date());};var drawCircle=function(color,lineWidth,percent){percent=Math.min(Math.max(-1,percent||0),1);var isNegative=percent<=0?true:false;ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2*percent,isNegative);ctx.strokeStyle=color;ctx.lineWidth=lineWidth;ctx.stroke();};var drawScale=function(){var offset;var length;ctx.lineWidth=1;ctx.fillStyle=options.scaleColor;ctx.save();for(var i=24;i>0;--i){if(i%6===0){length=options.scaleLength;offset=0;}else{length=options.scaleLength*0.6;offset=options.scaleLength-length;}
ctx.fillRect(-options.size/2+offset,0,length,1);ctx.rotate(Math.PI/12);}
ctx.restore();};var reqAnimationFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};}());var drawBackground=function(){if(options.scaleColor)drawScale();if(options.trackColor)drawCircle(options.trackColor,options.lineWidth,1);};this.getCanvas=function(){return canvas;};this.getCtx=function(){return ctx;};this.clear=function(){ctx.clearRect(options.size/ -2,options.size/ -2,options.size,options.size);};this.draw=function(percent){if(!!options.scaleColor||!!options.trackColor){if(ctx.getImageData&&ctx.putImageData){if(!cachedBackground){drawBackground();cachedBackground=ctx.getImageData(0,0,options.size*scaleBy,options.size*scaleBy);}else{ctx.putImageData(cachedBackground,0,0);}}else{this.clear();drawBackground();}}else{this.clear();}
ctx.lineCap=options.lineCap;var color;if(typeof(options.barColor)==='function'){color=options.barColor(percent);}else{color=options.barColor;}
drawCircle(color,options.lineWidth,percent/100);}.bind(this);this.animate=function(from,to){var startTime=Date.now();options.onStart(from,to);var animation=function(){var process=Math.min(Date.now()-startTime,options.animate.duration);var currentValue=options.easing(this,process,from,to-from,options.animate.duration);this.draw(currentValue);options.onStep(from,to,currentValue);if(process>=options.animate.duration){options.onStop(from,to);}else{reqAnimationFrame(animation);}}.bind(this);reqAnimationFrame(animation);}.bind(this);};var EasyPieChart=function(el,opts){var defaultOptions={barColor:'#ef1e25',trackColor:'#f9f9f9',scaleColor:'#dfe0e0',scaleLength:5,lineCap:'round',lineWidth:3,size:110,rotate:0,animate:{duration:1000,enabled:true},easing:function(x,t,b,c,d){t=t/(d/2);if(t<1){return c/2*t*t+b;}
return-c/2*((--t)*(t-2)-1)+b;},onStart:function(from,to){return;},onStep:function(from,to,currentValue){return;},onStop:function(from,to){return;}};if(typeof(CanvasRenderer)!=='undefined'){defaultOptions.renderer=CanvasRenderer;}else if(typeof(SVGRenderer)!=='undefined'){defaultOptions.renderer=SVGRenderer;}else{throw new Error('Please load either the SVG- or the CanvasRenderer');}
var options={};var currentValue=0;var init=function(){this.el=el;this.options=options;for(var i in defaultOptions){if(defaultOptions.hasOwnProperty(i)){options[i]=opts&&typeof(opts[i])!=='undefined'?opts[i]:defaultOptions[i];if(typeof(options[i])==='function'){options[i]=options[i].bind(this);}}}
if(typeof(options.easing)==='string'&&typeof(jQuery)!=='undefined'&&jQuery.isFunction(jQuery.easing[options.easing])){options.easing=jQuery.easing[options.easing];}else{options.easing=defaultOptions.easing;}
if(typeof(options.animate)==='number'){options.animate={duration:options.animate,enabled:true};}
if(typeof(options.animate)==='boolean'&&!options.animate){options.animate={duration:1000,enabled:options.animate};}
this.renderer=new options.renderer(el,options);this.renderer.draw(currentValue);if(el.dataset&&el.dataset.percent){this.update(parseFloat(el.dataset.percent));}else if(el.getAttribute&&el.getAttribute('data-percent')){this.update(parseFloat(el.getAttribute('data-percent')));}}.bind(this);this.update=function(newValue){newValue=parseFloat(newValue);if(options.animate.enabled){this.renderer.animate(currentValue,newValue);}else{this.renderer.draw(newValue);}
currentValue=newValue;return this;}.bind(this);this.disableAnimation=function(){options.animate.enabled=false;return this;};this.enableAnimation=function(){options.animate.enabled=true;return this;};init();};$.fn.easyPieChart=function(options){return this.each(function(){var instanceOptions;if(!$.data(this,'easyPieChart')){instanceOptions=$.extend({},options,$(this).data());$.data(this,'easyPieChart',new EasyPieChart(this,instanceOptions));}});};}));