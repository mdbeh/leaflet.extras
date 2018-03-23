!function(e){var t={};function i(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=e,i.c=t,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:o})},i.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t){L.Control.SleepMapControl=L.Control.extend({initialize:function(e){L.setOptions(this,e)},options:{position:"topright",prompt:"disable map",styles:{backgroundColor:"white",padding:"5px",border:"2px solid gray"}},buildContainer:function(){var e=this,t=L.DomUtil.create("p","sleep-button"),i=this._nonBoundEvent.bind(this);return t.appendChild(document.createTextNode(this.options.prompt)),L.DomEvent.addListener(t,"click",i),L.DomEvent.addListener(t,"touchstart",i),Object.keys(this.options.styles).map(function(i){t.style[i]=e.options.styles[i]}),this._container=t},onAdd:function(){return this._container||this.buildContainer()},_nonBoundEvent:function(e){return L.DomEvent.stop(e),this._map&&this._map.sleep._sleepMap(),!1}}),L.Control.sleepMapControl=function(){return new L.Control.SleepMapControl},L.Map.mergeOptions({sleep:!0,sleepTime:750,wakeTime:750,wakeMessageTouch:"Touch to Wake",sleepNote:!0,hoverToWake:!0,sleepOpacity:.7,sleepButton:L.Control.sleepMapControl}),L.Map.Sleep=L.Handler.extend({addHooks:function(){this.sleepNote=L.DomUtil.create("p","sleep-note",this._map._container),this._enterTimeout=null,this._exitTimeout=null,this._sleepButton=this._map.options.sleepButton(),this._map.tap&&this._map.addControl(this._sleepButton);var e=this._map._container.style;e.WebkitTransition+="opacity .5s",e.MozTransition+="opacity .5s",this._setSleepNoteStyle(),this._sleepMap()},removeHooks:function(){this._map.scrollWheelZoom.enabled()||this._map.scrollWheelZoom.enable(),L.DomUtil.setOpacity(this._map._container,1),L.DomUtil.setOpacity(this.sleepNote,0),this._removeSleepingListeners(),this._removeAwakeListeners()},_setSleepNoteStyle:function(){var e="",t=this.sleepNote.style;if(e=this._map.tap?this._map.options.wakeMessageTouch:this._map.options.wakeMessage?this._map.options.wakeMessage:this._map.options.hoverToWake?"click or hover to wake":"click to wake",this._map.options.sleepNote&&(this.sleepNote.appendChild(document.createTextNode(e)),t.pointerEvents="none",t.maxWidth="150px",t.transitionDuration=".2s",t.zIndex=5e3,t.opacity=".6",t.margin="auto",t.textAlign="center",t.borderRadius="4px",t.top="50%",t.position="relative",t.padding="5px",t.border="solid 2px black",t.background="white",this._map.options.sleepNoteStyle)){var i=this._map.options.sleepNoteStyle;Object.keys(i).map(function(e){t[e]=i[e]})}},_wakeMap:function(e){this._stopWaiting(),this._map.scrollWheelZoom.enable(),this._map.tap&&(this._map.touchZoom.enable(),this._map.dragging.enable(),this._map.tap.enable(),this._map.addControl(this._sleepButton)),L.DomUtil.setOpacity(this._map._container,1),this.sleepNote.style.opacity=0,this._addAwakeListeners()},_sleepMap:function(){this._stopWaiting(),this._map.scrollWheelZoom.disable(),this._map.tap&&(this._map.touchZoom.disable(),this._map.dragging.disable(),this._map.tap.disable(),this._map.removeControl(this._sleepButton)),L.DomUtil.setOpacity(this._map._container,this._map.options.sleepOpacity),this.sleepNote.style.opacity=.4,this._addSleepingListeners()},_wakePending:function(){if(this._map.once("mousedown",this._wakeMap,this),this._map.options.hoverToWake){var e=this;this._map.once("mouseout",this._sleepMap,this),e._enterTimeout=setTimeout(function(){e._map.off("mouseout",e._sleepMap,e),e._wakeMap()},e._map.options.wakeTime)}},_sleepPending:function(){var e=this;e._map.once("mouseover",e._wakeMap,e),e._exitTimeout=setTimeout(function(){e._map.off("mouseover",e._wakeMap,e),e._sleepMap()},e._map.options.sleepTime)},_addSleepingListeners:function(){this._map.once("mouseover",this._wakePending,this),this._map.tap&&this._map.once("click",this._wakeMap,this)},_addAwakeListeners:function(){this._map.once("mouseout",this._sleepPending,this)},_removeSleepingListeners:function(){this._map.options.hoverToWake&&this._map.off("mouseover",this._wakePending,this),this._map.off("mousedown",this._wakeMap,this),this._map.tap&&this._map.off("click",this._wakeMap,this)},_removeAwakeListeners:function(){this._map.off("mouseout",this._sleepPending,this)},_stopWaiting:function(){this._removeSleepingListeners(),this._removeAwakeListeners();this._enterTimeout&&clearTimeout(this._enterTimeout),this._exitTimeout&&clearTimeout(this._exitTimeout),this._enterTimeout=null,this._exitTimeout=null}}),L.Map.addInitHook("addHandler","sleep",L.Map.Sleep)}]);
//# sourceMappingURL=leaflet-sleep-prod.js.map