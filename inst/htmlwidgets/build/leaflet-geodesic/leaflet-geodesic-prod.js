!function(t){var a={};function n(s){if(a[s])return a[s].exports;var i=a[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=a,n.d=function(t,a,s){n.o(t,a)||Object.defineProperty(t,a,{configurable:!1,enumerable:!0,get:s})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(a,"a",a),a},n.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},n.p="",n(n.s=0)}([function(t,a,n){"use strict";void 0===Number.prototype.toRadians&&(Number.prototype.toRadians=function(){return this*Math.PI/180}),void 0===Number.prototype.toDegrees&&(Number.prototype.toDegrees=function(){return 180*this/Math.PI});L.Geodesic=L.Polyline.extend({options:{color:"blue",steps:10,dash:1,wrap:!0},initialize:function(t,a){this.options=this._merge_options(this.options,a),this.options.dash=Math.max(.001,Math.min(1,parseFloat(this.options.dash)||1)),this.datum={},this.datum.ellipsoid={a:6378137,b:6356752.3142,f:1/298.257223563},this._latlngs=this._generate_Geodesic(t),L.Polyline.prototype.initialize.call(this,this._latlngs,this.options)},setLatLngs:function(t){this._latlngs=this._generate_Geodesic(t),L.Polyline.prototype.setLatLngs.call(this,this._latlngs)},getStats:function(){let t,a,n={distance:0,points:0,polygons:this._latlngs.length};for(t=0;t<this._latlngs.length;t++)for(n.points+=this._latlngs[t].length,a=0;a<this._latlngs[t].length-1;a++)n.distance+=this._vincenty_inverse(this._latlngs[t][a],this._latlngs[t][a+1]).distance;return n},geoJson:function(t){let a=L.GeoJSON.asFeature(t),n="FeatureCollection"===a.type?a.features:[a];this._latlngs=[];for(let t of n){let a="Feature"===t.type?t.geometry:t,n=a.coordinates;switch(a.type){case"LineString":this._latlngs.push(this._generate_Geodesic([L.GeoJSON.coordsToLatLngs(n,0)]));break;case"MultiLineString":case"Polygon":this._latlngs.push(this._generate_Geodesic(L.GeoJSON.coordsToLatLngs(n,1)));break;case"Point":case"MultiPoint":console.log("Dude, points can't be drawn as geodesic lines...");break;default:console.log("Drawing "+a.type+" as a geodesic is not supported. Skipping...")}}L.Polyline.prototype.setLatLngs.call(this,this._latlngs)},createCircle:function(t,a){let n,s=0,i={lat:0,lng:0,brg:0};this._latlngs=[],this._latlngs[s]=[];let e=this._vincenty_direct(L.latLng(t),0,a,this.options.wrap);for(i=L.latLng(e.lat,e.lng),this._latlngs[s].push(i),n=1;n<=this.options.steps;){e=this._vincenty_direct(L.latLng(t),360/this.options.steps*n,a,this.options.wrap);let o=L.latLng(e.lat,e.lng);if(Math.abs(o.lng-i.lng)>180){let t=this._vincenty_inverse(i,o),a=this._intersection(i,t.initialBearing,{lat:-89,lng:o.lng-i.lng>0?-179.999:179.999},0);a?(this._latlngs[s].push(L.latLng(a.lat,a.lng)),s++,this._latlngs[s]=[],i=L.latLng(a.lat,-a.lng),this._latlngs[s].push(i)):(s++,this._latlngs[s]=[],this._latlngs[s].push(o),i=o,n++)}else this._latlngs[s].push(o),i=o,n++}L.Polyline.prototype.setLatLngs.call(this,this._latlngs)},_generate_Geodesic:function(t){let a=[],n=0;for(let s=0;s<t.length;s++){a[n]=[];let i=L.latLng(t[s][0]);for(let e=0;e<t[s].length-1;e++){let o=i,l=L.latLng(t[s][e+1]);if(o.equals(l))continue;let h=this._vincenty_inverse(o,l);a[n].push(i);for(let t=1;t<=this.options.steps;){let s=h.distance/this.options.steps,e=t-1+this.options.dash,l=this._vincenty_direct(o,h.initialBearing,s*e,this.options.wrap),r=L.latLng(l.lat,l.lng);if(Math.abs(r.lng-i.lng)>180){let s=this._intersection(o,h.initialBearing,{lat:-89,lng:r.lng-i.lng>0?-179.999:179.999},0);s?(a[n].push(L.latLng(s.lat,s.lng)),a[++n]=[],i=L.latLng(s.lat,-s.lng),a[n].push(i)):(a[++n]=[],a[n].push(r),i=r,t++)}else{if(a[n].push(r),this.options.dash<1){n++;let e=this._vincenty_direct(o,h.initialBearing,s*t,this.options.wrap);a[n]=[],i=L.latLng(e.lat,e.lng),a[n].push(i)}else i=r;t++}}}n++}return a},_vincenty_direct:function(t,a,n,s){var i,e,o,l,h=t.lat.toRadians(),r=t.lng.toRadians(),g=a.toRadians(),c=n,M=this.datum.ellipsoid.a,u=this.datum.ellipsoid.b,p=this.datum.ellipsoid.f,d=Math.sin(g),_=Math.cos(g),f=(1-p)*Math.tan(h),L=1/Math.sqrt(1+f*f),v=f*L,y=Math.atan2(f,_),P=L*d,b=1-P*P,m=b*(M*M-u*u)/(u*u),I=1+m/16384*(4096+m*(m*(320-175*m)-768)),R=m/1024*(256+m*(m*(74-47*m)-128)),N=c/(u*I),w=0;do{l=Math.cos(2*y+N),i=N,N=c/(u*I)+R*(e=Math.sin(N))*(l+R/4*((o=Math.cos(N))*(2*l*l-1)-R/6*l*(4*e*e-3)*(4*l*l-3)))}while(Math.abs(N-i)>1e-12&&++w);var D,G=v*e-L*o*_,x=Math.atan2(v*o+L*e*_,(1-p)*Math.sqrt(P*P+G*G)),q=p/16*b*(4+p*(4-3*b)),B=Math.atan2(e*d,L*o-v*e*_)-(1-q)*p*P*(N+q*e*(l+q*o*(2*l*l-1)));D=s?(r+B+3*Math.PI)%(2*Math.PI)-Math.PI:r+B;var O=Math.atan2(P,-G);return{lat:x.toDegrees(),lng:D.toDegrees(),finalBearing:O.toDegrees()}},_vincenty_inverse:function(t,a){var n,s,i,e,o,l,h,r,g=t.lat.toRadians(),c=t.lng.toRadians(),M=a.lat.toRadians(),u=a.lng.toRadians(),p=this.datum.ellipsoid.a,d=this.datum.ellipsoid.b,_=this.datum.ellipsoid.f,f=u-c,L=(1-_)*Math.tan(g),v=1/Math.sqrt(1+L*L),y=L*v,P=(1-_)*Math.tan(M),b=1/Math.sqrt(1+P*P),m=P*b,I=f,R=0;do{var N=b*(h=Math.sin(I))*(b*h)+(v*m-y*b*(r=Math.cos(I)))*(v*m-y*b*r);if(0==(i=Math.sqrt(N)))return 0;o=y*m+v*b*r,l=Math.atan2(i,o);var w=v*b*h/i;e=o-2*y*m/(s=1-w*w),isNaN(e)&&(e=0);var D=_/16*s*(4+_*(4-3*s));n=I,I=f+(1-D)*_*w*(l+D*i*(e+D*o*(2*e*e-1)))}while(Math.abs(I-n)>1e-12&&++R<100);if(R>=100)return console.log("Formula failed to converge. Altering target position."),this._vincenty_inverse(t,{lat:a.lat,lng:a.lng-.01});var G=s*(p*p-d*d)/(d*d),x=G/1024*(256+G*(G*(74-47*G)-128)),q=d*(1+G/16384*(4096+G*(G*(320-175*G)-768)))*(l-x*i*(e+x/4*(o*(2*e*e-1)-x/6*e*(4*i*i-3)*(4*e*e-3)))),B=Math.atan2(b*h,v*m-y*b*r),O=Math.atan2(v*h,-y*b+v*m*r);return{distance:q=Number(q.toFixed(3)),initialBearing:B.toDegrees(),finalBearing:O.toDegrees()}},_intersection:function(t,a,n,s){var i=t.lat.toRadians(),e=t.lng.toRadians(),o=n.lat.toRadians(),l=n.lng.toRadians(),h=Number(a).toRadians(),r=Number(s).toRadians(),g=o-i,c=l-e,M=2*Math.asin(Math.sqrt(Math.sin(g/2)*Math.sin(g/2)+Math.cos(i)*Math.cos(o)*Math.sin(c/2)*Math.sin(c/2)));if(0==M)return null;var u=Math.acos((Math.sin(o)-Math.sin(i)*Math.cos(M))/(Math.sin(M)*Math.cos(i)));isNaN(u)&&(u=0);var p,d,_=Math.acos((Math.sin(i)-Math.sin(o)*Math.cos(M))/(Math.sin(M)*Math.cos(o)));Math.sin(l-e)>0?(p=u,d=2*Math.PI-_):(p=2*Math.PI-u,d=_);var f=(h-p+Math.PI)%(2*Math.PI)-Math.PI,L=(d-r+Math.PI)%(2*Math.PI)-Math.PI;if(0==Math.sin(f)&&0==Math.sin(L))return null;if(Math.sin(f)*Math.sin(L)<0)return null;var v=Math.acos(-Math.cos(f)*Math.cos(L)+Math.sin(f)*Math.sin(L)*Math.cos(M)),y=Math.atan2(Math.sin(M)*Math.sin(f)*Math.sin(L),Math.cos(L)+Math.cos(f)*Math.cos(v)),P=Math.asin(Math.sin(i)*Math.cos(y)+Math.cos(i)*Math.sin(y)*Math.cos(h)),b=e+Math.atan2(Math.sin(h)*Math.sin(y)*Math.cos(i),Math.cos(y)-Math.sin(i)*Math.sin(P));return b=(b+3*Math.PI)%(2*Math.PI)-Math.PI,{lat:P.toDegrees(),lng:b.toDegrees()}},_merge_options:function(t,a){let n={};for(let a in t)n[a]=t[a];for(let t in a)n[t]=a[t];return n}}),L.geodesic=function(t,a){return new L.Geodesic(t,a)}}]);
//# sourceMappingURL=leaflet-geodesic-prod.js.map