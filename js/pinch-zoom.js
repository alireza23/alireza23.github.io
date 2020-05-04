"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(a){if(null==a)throw new TypeError("Cannot convert undefined or null to object");for(var b,c=Object(a),d=1;d<arguments.length;d++)if(b=arguments[d],null!=b)for(var e in b)Object.prototype.hasOwnProperty.call(b,e)&&(c[e]=b[e]);return c},writable:!0,configurable:!0}),"function"!=typeof Array.from&&(Array.from=function(a){return[].slice.call(a)});var buildElement=function(a){var b=document.implementation.createHTMLDocument("");return b.body.innerHTML=a,Array.from(b.body.children)[0]},triggerEvent=function(a,b){var c=document.createEvent("HTMLEvents");c.initEvent(b,!0,!1),a.dispatchEvent(c)},definePinchZoom=function(){var a=Math.min,b=Math.max,c=Math.abs,d=function(a,b){this.el=a,this.zoomFactor=1,this.lastScale=1,this.offset={x:0,y:0},this.initialOffset={x:0,y:0},this.options=Object.assign({},this.defaults,b),this.setupMarkup(),this.bindEvents(),this.update(),this.isImageLoaded(this.el)&&(this.updateAspectRatio(),this.setupOffsets()),this.enable()},e=function(c,a){return c+a},f=function(a,b){return a>b-.01&&a<b+.01};d.prototype={defaults:{tapZoomFactor:2,zoomOutFactor:1.3,animationDuration:300,maxZoom:4,minZoom:.5,draggableUnzoomed:!0,lockDragAxis:!1,setOffsetsOnce:!1,use2d:!0,zoomStartEventName:"pz_zoomstart",zoomUpdateEventName:"pz_zoomupdate",zoomEndEventName:"pz_zoomend",dragStartEventName:"pz_dragstart",dragUpdateEventName:"pz_dragupdate",dragEndEventName:"pz_dragend",doubleTapEventName:"pz_doubletap",verticalPadding:0,horizontalPadding:0,onZoomStart:null,onZoomEnd:null,onZoomUpdate:null,onDragStart:null,onDragEnd:null,onDragUpdate:null,onDoubleTap:null},handleDragStart:function(a){triggerEvent(this.el,this.options.dragStartEventName),"function"==typeof this.options.onDragStart&&this.options.onDragStart(this,a),this.stopAnimation(),this.lastDragPosition=!1,this.hasInteraction=!0,this.handleDrag(a)},handleDrag:function(a){var b=this.getTouches(a)[0];this.drag(b,this.lastDragPosition),this.offset=this.sanitizeOffset(this.offset),this.lastDragPosition=b},handleDragEnd:function(){triggerEvent(this.el,this.options.dragEndEventName),"function"==typeof this.options.onDragEnd&&this.options.onDragEnd(this,event),this.end()},handleZoomStart:function(a){triggerEvent(this.el,this.options.zoomStartEventName),"function"==typeof this.options.onZoomStart&&this.options.onZoomStart(this,a),this.stopAnimation(),this.lastScale=1,this.nthZoom=0,this.lastZoomCenter=!1,this.hasInteraction=!0},handleZoom:function(a,b){var c=this.getTouchCenter(this.getTouches(a)),d=b/this.lastScale;this.lastScale=b,this.nthZoom+=1,3<this.nthZoom&&(this.scale(d,c),this.drag(c,this.lastZoomCenter)),this.lastZoomCenter=c},handleZoomEnd:function(){triggerEvent(this.el,this.options.zoomEndEventName),"function"==typeof this.options.onZoomEnd&&this.options.onZoomEnd(this,event),this.end()},handleDoubleTap:function(a){var b=this.getTouches(a)[0],c=1<this.zoomFactor?1:this.options.tapZoomFactor,d=this.zoomFactor,e=function(a){this.scaleTo(d+a*(c-d),b)}.bind(this);this.hasInteraction||(this.isDoubleTap=!0,d>c&&(b=this.getCurrentZoomCenter()),this.animate(this.options.animationDuration,e,this.swing),triggerEvent(this.el,this.options.doubleTapEventName),"function"==typeof this.options.onDoubleTap&&this.options.onDoubleTap(this,a))},computeInitialOffset:function(){this.initialOffset={x:-c(this.el.offsetWidth*this.getInitialZoomFactor()-this.container.offsetWidth)/2,y:-c(this.el.offsetHeight*this.getInitialZoomFactor()-this.container.offsetHeight)/2}},resetOffset:function(){this.offset.x=this.initialOffset.x,this.offset.y=this.initialOffset.y},isImageLoaded:function(a){return"IMG"===a.nodeName?a.complete&&0!==a.naturalHeight:Array.from(a.querySelectorAll("img")).every(this.isImageLoaded)},setupOffsets:function(){this.options.setOffsetsOnce&&this._isOffsetsSet||(this._isOffsetsSet=!0,this.computeInitialOffset(),this.resetOffset())},sanitizeOffset:function(c){var d=this.el.offsetWidth*this.getInitialZoomFactor()*this.zoomFactor,e=this.el.offsetHeight*this.getInitialZoomFactor()*this.zoomFactor,f=d-this.getContainerX()+this.options.horizontalPadding,g=e-this.getContainerY()+this.options.verticalPadding,h=b(f,0),i=b(g,0),j=a(f,0)-this.options.horizontalPadding,k=a(g,0)-this.options.verticalPadding;return{x:a(b(c.x,j),h),y:a(b(c.y,k),i)}},scaleTo:function(a,b){this.scale(a/this.zoomFactor,b)},scale:function(a,b){a=this.scaleZoomFactor(a),this.addOffset({x:(a-1)*(b.x+this.offset.x),y:(a-1)*(b.y+this.offset.y)}),triggerEvent(this.el,this.options.zoomUpdateEventName),"function"==typeof this.options.onZoomUpdate&&this.options.onZoomUpdate(this,event)},scaleZoomFactor:function(c){var d=this.zoomFactor;return this.zoomFactor*=c,this.zoomFactor=a(this.options.maxZoom,b(this.zoomFactor,this.options.minZoom)),this.zoomFactor/d},canDrag:function(){return this.options.draggableUnzoomed||!f(this.zoomFactor,1)},drag:function(a,b){b&&(this.options.lockDragAxis?c(a.x-b.x)>c(a.y-b.y)?this.addOffset({x:-(a.x-b.x),y:0}):this.addOffset({y:-(a.y-b.y),x:0}):this.addOffset({y:-(a.y-b.y),x:-(a.x-b.x)}),triggerEvent(this.el,this.options.dragUpdateEventName),"function"==typeof this.options.onDragUpdate&&this.options.onDragUpdate(this,event))},getTouchCenter:function(a){return this.getVectorAvg(a)},getVectorAvg:function(a){return{x:a.map(function(a){return a.x}).reduce(e)/a.length,y:a.map(function(a){return a.y}).reduce(e)/a.length}},addOffset:function(a){this.offset={x:this.offset.x+a.x,y:this.offset.y+a.y}},sanitize:function(){this.zoomFactor<this.options.zoomOutFactor?this.zoomOutAnimation():this.isInsaneOffset(this.offset)&&this.sanitizeOffsetAnimation()},isInsaneOffset:function(a){var b=this.sanitizeOffset(a);return b.x!==a.x||b.y!==a.y},sanitizeOffsetAnimation:function(){var a=this.sanitizeOffset(this.offset),b={x:this.offset.x,y:this.offset.y},c=function(c){this.offset.x=b.x+c*(a.x-b.x),this.offset.y=b.y+c*(a.y-b.y),this.update()}.bind(this);this.animate(this.options.animationDuration,c,this.swing)},zoomOutAnimation:function(){if(1!==this.zoomFactor){var a=this.zoomFactor,b=this.getCurrentZoomCenter(),c=function(c){this.scaleTo(a+c*(1-a),b)}.bind(this);this.animate(this.options.animationDuration,c,this.swing)}},updateAspectRatio:function(){this.unsetContainerY(),this.setContainerY(this.container.parentElement.offsetHeight)},getInitialZoomFactor:function(){var b=this.container.offsetWidth/this.el.offsetWidth,c=this.container.offsetHeight/this.el.offsetHeight;return a(b,c)},getAspectRatio:function(){return this.el.offsetWidth/this.el.offsetHeight},getCurrentZoomCenter:function(){var a=this.offset.x-this.initialOffset.x,b=-1*this.offset.x-a/(1/this.zoomFactor-1),c=this.offset.y-this.initialOffset.y,d=-1*this.offset.y-c/(1/this.zoomFactor-1);return{x:b,y:d}},getTouches:function(a){var b=this.container.getBoundingClientRect(),c=document.documentElement.scrollTop||document.body.scrollTop,d=document.documentElement.scrollLeft||document.body.scrollLeft,e=b.top+c,f=b.left+d;return Array.prototype.slice.call(a.touches).map(function(a){return{x:a.pageX-f,y:a.pageY-e}})},animate:function(a,b,c,d){var e=new Date().getTime(),f=function(){if(this.inAnimation){var g=new Date().getTime()-e,h=g/a;g>=a?(b(1),d&&d(),this.update(),this.stopAnimation(),this.update()):(c&&(h=c(h)),b(h),this.update(),requestAnimationFrame(f))}}.bind(this);this.inAnimation=!0,requestAnimationFrame(f)},stopAnimation:function(){this.inAnimation=!1},swing:function(a){return-Math.cos(a*Math.PI)/2+.5},getContainerX:function(){return this.container.offsetWidth},getContainerY:function(){return this.container.offsetHeight},setContainerY:function(a){return this.container.style.height=a+"px"},unsetContainerY:function(){this.container.style.height=null},setupMarkup:function(){this.container=buildElement("<div class=\"pinch-zoom-container\"></div>"),this.el.parentNode.insertBefore(this.container,this.el),this.container.appendChild(this.el),this.container.style.overflow="hidden",this.container.style.position="relative",this.el.style.webkitTransformOrigin="0% 0%",this.el.style.mozTransformOrigin="0% 0%",this.el.style.msTransformOrigin="0% 0%",this.el.style.oTransformOrigin="0% 0%",this.el.style.transformOrigin="0% 0%",this.el.style.position="absolute"},end:function(){this.hasInteraction=!1,this.sanitize(),this.update()},bindEvents:function(){var a=this;g(this.container,this),window.addEventListener("resize",this.update.bind(this)),Array.from(this.el.querySelectorAll("img")).forEach(function(b){b.addEventListener("load",a.update.bind(a))}),"IMG"===this.el.nodeName&&this.el.addEventListener("load",this.update.bind(this))},update:function(a){this.updatePlaned||(this.updatePlaned=!0,window.setTimeout(function(){this.updatePlaned=!1,a&&"resize"===a.type&&(this.updateAspectRatio(),this.setupOffsets()),a&&"load"===a.type&&(this.updateAspectRatio(),this.setupOffsets());var b=this.getInitialZoomFactor()*this.zoomFactor,c=-this.offset.x/b,d=-this.offset.y/b,e="scale3d("+b+", "+b+",1) translate3d("+c+"px,"+d+"px,0px)",f="scale("+b+", "+b+") translate("+c+"px,"+d+"px)",g=function(){this.clone&&(this.clone.parentNode.removeChild(this.clone),delete this.clone)}.bind(this);!this.options.use2d||this.hasInteraction||this.inAnimation?(this.is3d=!0,g(),this.el.style.webkitTransform=e,this.el.style.mozTransform=f,this.el.style.msTransform=f,this.el.style.oTransform=f,this.el.style.transform=e):(this.is3d&&(this.clone=this.el.cloneNode(!0),this.clone.style.pointerEvents="none",this.container.appendChild(this.clone),window.setTimeout(g,200)),this.el.style.webkitTransform=f,this.el.style.mozTransform=f,this.el.style.msTransform=f,this.el.style.oTransform=f,this.el.style.transform=f,this.is3d=!1)}.bind(this),0))},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1}};var g=function(a,b){var c=null,d=0,e=null,f=null,g=function(a,d){c!==a&&(c&&!a&&("zoom"===c?b.handleZoomEnd(d):"drag"===c?b.handleDragEnd(d):void 0),"zoom"===a?b.handleZoomStart(d):"drag"===a?b.handleDragStart(d):void 0);c=a},h=function(a){2===d?g("zoom"):1===d&&b.canDrag()?g("drag",a):g(null,a)},i=function(a){return Array.from(a).map(function(a){return{x:a.pageX,y:a.pageY}})},j=function(c,a){var d,e,b=Math.sqrt;return d=c.x-a.x,e=c.y-a.y,b(d*d+e*e)},k=function(a,b){var c=j(a[0],a[1]),d=j(b[0],b[1]);return d/c},l=function(a){a.stopPropagation(),a.preventDefault()},m=function(a){var f=new Date().getTime();1<d&&(e=null);300>f-e?(l(a),b.handleDoubleTap(a),"zoom"===c?b.handleZoomEnd(a):"drag"===c?b.handleDragEnd(a):void 0):b.isDoubleTap=!1;1===d&&(e=f)},n=!0;a.addEventListener("touchstart",function(a){b.enabled&&(n=!0,d=a.touches.length,m(a))}),a.addEventListener("touchmove",function(a){b.enabled&&!b.isDoubleTap&&(n?(h(a),c&&l(a),f=i(a.touches)):("zoom"===c?2==f.length&&2==a.touches.length&&b.handleZoom(a,k(f,i(a.touches))):"drag"===c?b.handleDrag(a):void 0,c&&(l(a),b.update())),n=!1)}),a.addEventListener("touchend",function(a){b.enabled&&(d=a.touches.length,h(a))})};return d},PinchZoom=definePinchZoom();export default PinchZoom;