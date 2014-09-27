;(function($,window,undefined){'use strict';var BLANK='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';$.fn.imagesLoaded=function(callback){var $this=this,deferred=$.isFunction($.Deferred)?$.Deferred():0,hasNotify=$.isFunction(deferred.notify),$images=$this.find('img').add($this.filter('img')),loaded=[],proper=[],broken=[];if($.isPlainObject(callback)){$.each(callback,function(key,value){if(key==='callback'){callback=value;}else if(deferred){deferred[key](value);}});}
function doneLoading(){var $proper=$(proper),$broken=$(broken);if(deferred){if(broken.length){deferred.reject($images,$proper,$broken);}else{deferred.resolve($images);}}
if($.isFunction(callback)){callback.call($this,$images,$proper,$broken);}}
function imgLoadedHandler(event){imgLoaded(event.target,event.type==='error');}
function imgLoaded(img,isBroken){if(img.src===BLANK||$.inArray(img,loaded)!==-1){return;}
loaded.push(img);if(isBroken){broken.push(img);}else{proper.push(img);}
$.data(img,'imagesLoaded',{isBroken:isBroken,src:img.src});if(hasNotify){deferred.notifyWith($(img),[isBroken,$images,$(proper),$(broken)]);}
if($images.length===loaded.length){setTimeout(doneLoading);$images.unbind('.imagesLoaded',imgLoadedHandler);}}
if(!$images.length){doneLoading();}else{$images.bind('load.imagesLoaded error.imagesLoaded',imgLoadedHandler).each(function(i,el){var src=el.src;var cached=$.data(el,'imagesLoaded');if(cached&&cached.src===src){imgLoaded(el,cached.isBroken);return;}
if(el.complete&&el.naturalWidth!==undefined){imgLoaded(el,el.naturalWidth===0||el.naturalHeight===0);return;}
if(el.readyState||el.complete){el.src=BLANK;el.src=src;}});}
return deferred?deferred.promise($this):$this;};var Modernizr=window.Modernizr;$.Flipshow=function(options,element){this.$el=$(element);this._init(options);};$.Flipshow.defaults={speed:700,easing:'ease-out'};$.Flipshow.prototype={_init:function(options){this.options=$.extend(true,{},$.Flipshow.defaults,options);this.support=Modernizr.csstransitions&&Modernizr.csstransforms3d&&!(/MSIE (\d+\.\d+);/.test(navigator.userAgent));var transEndEventNames={'WebkitTransition':'webkitTransitionEnd','MozTransition':'transitionend','OTransition':'oTransitionEnd','msTransition':'MSTransitionEnd','transition':'transitionend'},transformNames={'WebkitTransform':'-webkit-transform','MozTransform':'-moz-transform','OTransform':'-o-transform','msTransform':'-ms-transform','transform':'transform'};if(this.support){this.transEndEventName=transEndEventNames[Modernizr.prefixed('transition')]+'.cbpFWSlider';this.transformName=transformNames[Modernizr.prefixed('transform')];}
this.transitionProperties=this.transformName+' '+this.options.speed+'ms '+this.options.easing;this.$listItems=this.$el.children('ul.fc-slides');this.$items=this.$listItems.children('li').hide();this.itemsCount=this.$items.length;this.current=0;this.$listItems.imagesLoaded($.proxy(function(){this.$items.eq(this.current).show();if(this.itemsCount>0){this._addNav();if(this.support){this._layout();}}},this));},_addNav:function(){var self=this,$navLeft=$('<div class="fc-left"><span></span><span></span><span></span><i class="fa fa-arrow-left"></i></div>'),$navRight=$('<div class="fc-right"><span></span><span></span><span></span><i class="fa fa-arrow-right"></i></div>');$('<nav></nav>').append($navLeft,$navRight).appendTo(this.$el);$navLeft.find('span').on('click.flipshow touchstart.flipshow',function(){self._navigate($(this),'left');});$navRight.find('span').on('click.flipshow touchstart.flipshow',function(){self._navigate($(this),'right');});},_layout:function($current,$next){this.$flipFront=$('<div class="fc-front"><div></div></div>');this.$frontContent=this.$flipFront.children('div:first');this.$flipBack=$('<div class="fc-back"><div></div></div>');this.$backContent=this.$flipBack.children('div:first');this.$flipEl=$('<div class="fc-flip"></div>').append(this.$flipFront,this.$flipBack).hide().appendTo(this.$el);},_navigate:function($nav,dir){if(this.isAnimating&&this.support){return false;}
this.isAnimating=true;var $currentItem=this.$items.eq(this.current).hide();if(dir==='right'){this.current<this.itemsCount-1?++this.current:this.current=0;}
else if(dir==='left'){this.current>0?--this.current:this.current=this.itemsCount-1;}
var $nextItem=this.$items.eq(this.current);if(this.support){this._flip($currentItem,$nextItem,dir,$nav.index());}
else{$nextItem.show();}},_flip:function($currentItem,$nextItem,dir,angle){var transformProperties='',$overlayLight=$('<div class="fc-overlay-light"></div>'),$overlayDark=$('<div class="fc-overlay-dark"></div>');this.$flipEl.css('transition',this.transitionProperties);this.$flipFront.find('div.fc-overlay-light, div.fc-overlay-dark').remove();this.$flipBack.find('div.fc-overlay-light, div.fc-overlay-dark').remove();if(dir==='right'){this.$flipFront.append($overlayLight);this.$flipBack.append($overlayDark);$overlayDark.css('opacity',1);}
else if(dir==='left'){this.$flipFront.append($overlayDark);this.$flipBack.append($overlayLight);$overlayLight.css('opacity',1);}
var overlayStyle={transition:'opacity '+(this.options.speed/1.3)+'ms'};$overlayLight.css(overlayStyle);$overlayDark.css(overlayStyle);switch(angle){case 0:transformProperties=dir==='left'?'rotate3d(-1,1,0,-179deg) rotate3d(-1,1,0,-1deg)':'rotate3d(1,1,0,180deg)';break;case 1:transformProperties=dir==='left'?'rotate3d(0,1,0,-179deg) rotate3d(0,1,0,-1deg)':'rotate3d(0,1,0,180deg)';break;case 2:transformProperties=dir==='left'?'rotate3d(1,1,0,-179deg) rotate3d(1,1,0,-1deg)':'rotate3d(-1,1,0,179deg) rotate3d(-1,1,0,1deg)';break;}
this.$flipBack.css('transform',transformProperties);this.$frontContent.empty().html($currentItem.html());this.$backContent.empty().html($nextItem.html());this.$flipEl.show();var self=this;setTimeout(function(){self.$flipEl.css('transform',transformProperties);$overlayLight.css('opacity',dir==='right'?1:0);$overlayDark.css('opacity',dir==='right'?0:1);self.$flipEl.on(self.transEndEventName,function(event){if(event.target.className==='fc-overlay-light'||event.target.className==='fc-overlay-dark')return;self._ontransitionend($nextItem);});},25);},_ontransitionend:function($nextItem){$nextItem.show();this.$flipEl.off(this.transEndEventName).css({transition:'none',transform:'none'}).hide();this.isAnimating=false;}};var logError=function(message){if(window.console){window.console.error(message);}};$.fn.flipshow=function(options){if(typeof options==='string'){var args=Array.prototype.slice.call(arguments,1);this.each(function(){var instance=$.data(this,'flipshow');if(!instance){logError("cannot call methods on flipshow prior to initialization; "+"attempted to call method '"+options+"'");return;}
if(!$.isFunction(instance[options])||options.charAt(0)==="_"){logError("no such method '"+options+"' for flipshow instance");return;}
instance[options].apply(instance,args);});}
else{this.each(function(){var instance=$.data(this,'flipshow');if(instance){instance._init();}
else{instance=$.data(this,'flipshow',new $.Flipshow(options,this));}});}
return this;};})(jQuery,window);