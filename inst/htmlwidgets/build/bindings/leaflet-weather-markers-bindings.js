!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t){LeafletWidget.methods.addWeatherMarkers=function(e,t,r,n,o,a,c,i,l,u,s,f){(function(){var p,d;if(r&&(p=(new LeafletWidget.DataFrame).cbind(r),d=function(e){var t=p.get(e);return t?(t.iconSize=[35,45],t.iconAnchor=[17,42],t.popupAnchor=[1,-32],t.shadowAnchor=[10,12],t.shadowSize=[36,16],t.className="weather-marker",t.prefix="wi",new L.WeatherMarkers.Icon(t)):new L.WeatherMarkers.Icon}),!$.isEmptyObject(e)&&!$.isEmptyObject(t)||$.isNumeric(e)&&$.isNumeric(t)){var h=(new LeafletWidget.DataFrame).col("lat",e).col("lng",t).col("layerId",n).col("group",o).col("popup",c).col("popupOptions",i).col("label",s).col("labelOptions",f).cbind(a);r&&(p.effectiveLength=h.nrow()),LeafletWidget.methods.addGenericMarkers(this,h,o,l,u,function(e,t){var n=e.get(t);return r&&(n.icon=d(t)),L.marker([e.get(t,"lat"),e.get(t,"lng")],n)})}}).call(this)}}]);
//# sourceMappingURL=leaflet-weather-markers-bindings.js.map