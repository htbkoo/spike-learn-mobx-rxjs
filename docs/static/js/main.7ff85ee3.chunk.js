(this["webpackJsonpspike-learn-mobx-rxjs"]=this["webpackJsonpspike-learn-mobx-rxjs"]||[]).push([[0],{114:function(e,t,n){},115:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(9),i=n.n(o),c=n(143),l=n(52),u=n(60),s=n.n(u),m=n(70),d=n.n(m),f=n(144),p=n(149),v=n(145),b=n(146),g=n(150),x=n(147),h=n(148),E=n(151),k=n(39),j=d()((function(e){return Object(f.a)({todoListApp:{textAlign:"center",minWidth:"80%",height:"80vh",padding:e.spacing(2),display:"flex",flexDirection:"column"},todoItemsContainer:{margin:e.spacing(1),overflowY:"auto",flex:1},appContainer:{backgroundColor:e.palette.background.default,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontSize:"calc(10px + 2vmin)",color:e.palette.primary.main},appLink:{color:"#61dafb"},todoItemContainer:{display:"flex",padding:e.spacing(2)},flexOne:{flex:1}})})),C=s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=0;case 1:return e.next=4,t++;case 4:e.next=1;break;case 6:case"end":return e.stop()}}),e)}))();function O(){var e=j(),t=Object(a.useState)({ids:[]}),n=Object(l.a)(t,2),o=n[0],i=n[1];return r.a.createElement(v.a,{className:e.todoListApp},r.a.createElement(b.a,{variant:"h3"},"Simple To Do List"),r.a.createElement("form",{className:e.todoItemsContainer,noValidate:!0,autoComplete:"off",onSubmit:function(e){return e.preventDefault()}},r.a.createElement(c,null),r.a.createElement(s,null)));function c(){return r.a.createElement(r.a.Fragment,null,o.ids.map((function(e){return r.a.createElement(u,Object.assign({},o[e],{key:e}))})))}function u(t){var n=t.text,c=t.isDone,u=t.id,s=Object(a.useState)(n),m=Object(l.a)(s,2),d=m[0],f=m[1];return r.a.createElement("div",{className:e.todoItemContainer},r.a.createElement(E.a,{checked:c,onChange:function(){return i(Object(k.a)(o,(function(e){e[u].isDone=!e[u].isDone})))}}),r.a.createElement(p.a,{label:"id for debugging: ".concat(u),variant:"outlined",className:e.flexOne,value:d,disabled:c,onChange:function(e){return f(e.target.value)},onBlur:function(){return i(Object(k.a)(o,(function(e){e[u].text=d})))}}),r.a.createElement(g.a,{color:"primary","aria-label":"remove todo item",component:"span",onClick:function(){return i(Object(k.a)(o,(function(e){e.ids=e.ids.filter((function(e){return e!==u})),delete e[u]})))}},r.a.createElement(x.a,null)))}function s(){var t=Object(a.useState)(""),n=Object(l.a)(t,2),c=n[0],u=n[1];return r.a.createElement("div",{className:e.todoItemContainer},r.a.createElement(p.a,{label:"Add todo item",variant:"outlined",className:e.flexOne,value:c,onChange:function(e){return u(e.target.value)}}),r.a.createElement(g.a,{color:"primary","aria-label":"add todo item",component:"span",onClick:function(){if(c){var e=Object(k.a)(o,(function(e){var t=C.next().value;e.ids.push(t),e[t]={text:c,isDone:!1,id:t}}));i(e),u("")}}},r.a.createElement(h.a,null)))}}var y=function(){var e=j();return r.a.createElement("div",{className:e.appContainer},r.a.createElement(O,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var w=n(59),D=n.n(w),I=n(74),N=n.n(I);n(114);var S=function(){var e=D()({palette:{type:"dark",primary:{main:"#7986cb"}}});return N()(e)}();i.a.render(r.a.createElement(c.a,{theme:S},r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},84:function(e,t,n){e.exports=n(115)}},[[84,1,2]]]);
//# sourceMappingURL=main.7ff85ee3.chunk.js.map