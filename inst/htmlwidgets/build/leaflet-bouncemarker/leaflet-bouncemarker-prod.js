!function(t){var n={};function o(i){if(n[i])return n[i].exports;var e=n[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=t,o.c=n,o.d=function(t,n,i){o.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},o.p="",o(o.s=0)}([function(t,n){var o,i;o=L.Marker.prototype.onAdd,i=L.Marker.prototype.onRemove,L.Marker.mergeOptions({bounceOnAdd:!1,bounceOnAddOptions:{duration:1e3,height:-1},bounceOnAddCallback:function(){}}),L.Marker.include({_toPoint:function(t){return this._map.latLngToContainerPoint(t)},_toLatLng:function(t){return this._map.containerPointToLatLng(t)},_motionStep:function(t,n){var o=this,i=(new Date-n.start)/n.duration;i>1&&(i=1);var e=o._easeOutBounce(i);n.step(e),1!==i?L.Util.requestAnimFrame(function(t){o._motionStep(t,n)}):n.end()},_bounceMotion:function(t,n){var o=L.latLng(this._origLatlng),i=this._dropPoint.y,e=this._dropPoint.x,r=this._point.y-i,s=this;L.Util.requestAnimFrame(function(u){s._motionStep(u,{delay:10,duration:t||1e3,start:new Date,step:function(t){s._dropPoint.y=i+r*t-(s._map.project(s._map.getCenter()).y-s._origMapCenter.y),s._dropPoint.x=e-(s._map.project(s._map.getCenter()).x-s._origMapCenter.x),s.setLatLng(s._toLatLng(s._dropPoint))},end:function(){s.setLatLng(o),"function"==typeof n&&n()}})})},_easeOutBounce:function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},bounce:function(t,n){this._origLatlng=this.getLatLng(),this._bounce(t,n)},_bounce:function(t,n){"function"==typeof t&&(n=t,t=null),"number"==typeof(t=t||{duration:1e3,height:-1})&&(t.duration=arguments[0],t.height=arguments[1]),this._origMapCenter=this._map.project(this._map.getCenter()),this._dropPoint=this._getDropPoint(t.height),this._bounceMotion(t.duration,n)},_getDropPoint:function(t){var n;return this._point=this._toPoint(this._origLatlng),n=void 0===t||t<0?this._toPoint(this._map.getBounds()._northEast).y:this._point.y-t,new L.Point(this._point.x,n)},onAdd:function(t){this._map=t,this._origLatlng=this._latlng,!0===this.options.bounceOnAdd&&(void 0!==this.options.bounceOnAddDuration&&(this.options.bounceOnAddOptions.duration=this.options.bounceOnAddDuration),void 0!==this.options.bounceOnAddHeight&&(this.options.bounceOnAddOptions.height=this.options.bounceOnAddHeight),this._dropPoint=this._getDropPoint(this.options.bounceOnAddOptions.height),this.setLatLng(this._toLatLng(this._dropPoint))),o.call(this,t),!0===this.options.bounceOnAdd&&this._bounce(this.options.bounceOnAddOptions,this.options.bounceOnAddCallback)},onRemove:function(t){clearInterval(this._intervalId),i.call(this,t)}})}]);
//# sourceMappingURL=leaflet-bouncemarker-prod.js.map