!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([,function(e,t,n){},function(e,t){window,L.Icon.Pulse=L.DivIcon.extend({options:{className:"",iconSize:[12,12],color:"red",animate:!0,heartbeat:1},initialize:function(e){L.setOptions(this,e);var t="lpi-"+(new Date).getTime()+"-"+Math.round(1e5*Math.random()),n=["background-color: "+this.options.color],o=["box-shadow: 0 0 6px 2px "+this.options.color,"animation: pulsate "+this.options.heartbeat+"s ease-out","animation-iteration-count: infinite","animation-delay: "+(this.options.heartbeat+.1)+"s"];this.options.animate||o.push("animation: none");var i=["."+t+"{"+n.join(";")+";}","."+t+":after{"+o.join(";")+";}"].join(""),a=document.createElement("style");a.styleSheet?a.styleSheet.cssText=i:a.appendChild(document.createTextNode(i)),document.getElementsByTagName("head")[0].appendChild(a),this.options.className=this.options.className+" leaflet-pulsing-icon "+t,L.DivIcon.prototype.initialize.call(this,e)}}),L.icon.pulse=function(e){return new L.Icon.Pulse(e)},L.Marker.Pulse=L.Marker.extend({initialize:function(e,t){t.icon=L.icon.pulse(t),L.Marker.prototype.initialize.call(this,e,t)}}),L.marker.pulse=function(e,t){return new L.Marker.Pulse(e,t)}},function(e,t,n){n(2),e.exports=n(1)}]);
//# sourceMappingURL=leaflet-pulse-icon-prod.js.map