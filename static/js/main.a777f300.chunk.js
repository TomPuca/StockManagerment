(this.webpackJsonpstockmanagerment=this.webpackJsonpstockmanagerment||[]).push([[0],{175:function(e,t,c){},176:function(e,t,c){},178:function(e,t,c){},180:function(e,t,c){},181:function(e,t,c){},190:function(e,t,c){},191:function(e,t,c){},323:function(e,t){},326:function(e,t,c){"use strict";c.r(t);var n=c(1),i=c.n(n),r=c(23),s=c.n(r),a=(c(175),c.p,c(176),c(27)),l=c(30),o=c.n(l),d=c(21),u=c(40),m=c(18),j=(c(178),c(4)),b=Object(n.createContext)(),h=function(e){var t=e.reducer,c=e.initialState,i=e.children;return Object(j.jsx)(b.Provider,{value:Object(n.useReducer)(t,c),children:i})},g=function(){return Object(n.useContext)(b)};function p(e){if(e.length>2){var t=(10*parseInt(e)).toLocaleString("en-US",{style:"decimal",currency:"USD"});return t=t.substring(0,t.length-1)}return e}function y(){var e=new Date;return[e.getDate(),e.getMonth()+1,e.getFullYear()]}function x(e,t){var c=Object(n.useRef)();Object(n.useEffect)((function(){c.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){c.current()}),t);return function(){return clearInterval(e)}}}),[t])}function v(e,t,c){var n=(1e3*parseFloat(t)-1e3*parseFloat(e))*c-(parseFloat(e)+parseFloat(t))*c*2-parseFloat(t)*c;return[n,(n/(10*parseFloat(e)*c)).toFixed(2)+"%"]}c(180);var O=c(112),S=c.n(O),f=c(154),M=c.n(f);var k=function(){var e,t="https://bgapidatafeed.vps.com.vn/getchartindexdata/",c={open:0,series:[],volume:[]},i=Object(n.useState)({options:{}}),r=Object(m.a)(i,2),s=r[0],a=r[1],l=Object(n.useState)(!1),d=Object(m.a)(l,2),b=d[0],h=d[1],g=new Date,p=g.getFullYear(),y=g.getMonth()+1,v=g.getDate(),O=g.getFullYear(),f=g.getMonth()+1,k=g.getDate(),T=11,N=0;function C(e){return L.apply(this,arguments)}function L(){return(L=Object(u.a)(o.a.mark((function e(n){var i,r,s,a,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t+n);case 2:return i=e.sent,e.next=5,i.json();case 5:r=e.sent,(T=g.getHours())>8&&T<=12?(T=g.getHours()+2,N=0):(T=14,N=16),null!=r&&(r.marketCode,s=0,r.hasOwnProperty("openIndex")&&(s=r.openIndex),a=0,l=0,r.data.map((function(e,t){if(0===t)a=e.vol;else if(null!==e.time&&"null"!==e.time){var i=e.time.split(":"),r=Date.UTC(p,y,v,i[0],i[1]),o={x:r,y:e.cIndex},d={x:r,y:e.vol-a};if(("13"===i[0]&&"00"===i[1]||"12"===i[0]&&"59"===i[1])&&0===l){var u=Date.UTC(p,y,v,11,31),m=Date.UTC(p,y,v,12,59),j={x:u,y:e.cIndex},b={x:u,y:0},h={x:m,y:e.cIndex},g={x:m,y:0};"10"===n&&(c.series.push(j),c.series.push(h),c.volume.push(b),c.volume.push(g)),l++}e.vol-a>0&&"10"===n&&(0===c.series.length||r-c.series[c.series.length-1].x>=6e4?(c.open=s,c.series.push(o),c.volume.push(d),a=e.vol):(c.series[c.series.length-1]=o,c.volume[c.volume.length-1]=d))}})),D("containerHSX",n,c.series,s,c.volume));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(t,c,n,i,r){e={chart:{renderTo:t,backgroundColor:"#111217",animation:!1,marginLeft:2,marginRight:2,marginBottom:22,marginTop:2,borderRadius:5,height:90,width:250},title:{text:""},xAxis:{type:"datetime",gridLineColor:"#C0C0C0",gridLineWidth:0,labels:{style:{color:"#B6BDCD",fontSize:"10px"}}},yAxis:[{title:{text:""},gridLineColor:"#C0C0C0",gridLineWidth:0,labels:{enabled:!1}},{title:{text:""},opposite:!0,gridLineColor:"#C0C0C0",gridLineWidth:0,labels:{enabled:!1}}],plotOptions:{line:{animation:!1,lineWidth:1.5,marker:{enabled:!1},threshold:i},area:{animation:!1,lineWidth:1,marker:{enabled:!1},shadow:!1,states:{hover:{lineWidth:1}}},series:{connectNulls:!0}},legend:{enabled:!1},credits:{enabled:!1},series:[{type:"line",color:"#d1af54",data:[[Date.UTC(p,y,v,9,15),i],[Date.UTC(O,f,k,T,N),i]],pointInterval:6e5,pointStart:Date.UTC(2021,2,3,9,0),pointEnd:Date.UTC(2021,2,3,14,0),marker:{enabled:!1},dashStyle:"shortdash",enableMouseTracking:!1,dataLabels:[{enabled:!0,style:{color:"#B6BDCD",fontSize:"9px"},x:120},{enabled:!0,style:{color:"#FFF",fontSize:"9px",opacity:.001},x:248}]},{type:"area",name:"Volume",yAxis:1,color:"#67CDF0",pointInterval:6e5,pointStart:Date.UTC(p,y,v,9,15),pointEnd:Date.UTC(O,f,k,T,N),data:r,selected:!0,connectNulls:!1,enableMouseTracking:!1,dataGrouping:{second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"]}},{type:"line",threshold:i,color:_("i"),negativeColor:_("d"),name:"VN-INDEX",pointInterval:6e5,pointStart:Date.UTC(p,y,v,9,15),pointEnd:Date.UTC(O,f,k,T,N),data:n,selected:!0,connectNulls:!0,enableMouseTracking:!1,dataGrouping:{second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"]}}]},a({options:e})}function _(e){return"d"===e||"txt-red"===e?"red":"i"===e||"txt-lime"===e?"#0f0":"e"===e?"#ffd900":"c"===e||"ceiling"===e?"#ff25ff":"f"===e||"floor"===e?"#1eeeee":"#f0f0f0"}return Object(n.useEffect)((function(){(function(){var e=Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:h(!0),C("10"),h(!1);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),x((function(){C("10")}),6e4),Object(j.jsx)("div",{children:b?Object(j.jsx)("div",{children:"Loading ..."}):Object(j.jsx)(M.a,{highcharts:S.a,options:s.options})})};var T=function(){var e=Object(n.useState)("Begin"),t=Object(m.a)(e,2),c=t[0],i=t[1],r=Object(n.useState)([]),s=Object(m.a)(r,2),l=s[0],b=s[1],h=Object(n.useState)([]),y=Object(m.a)(h,2),v=y[0],O=y[1],S=g(),f=Object(m.a)(S,2),M=f[0],T=M.socket,N=(M.currentstockprice,f[1]),C=Object(n.useState)(["IDJ","FRT","TCM","HPG","CTG","BID"]),L=Object(m.a)(C,2),D=L[0],_=L[1],P=Object(n.useState)(!1),H=Object(m.a)(P,2),I=(H[0],H[1]),U=Object(n.useState)(!1),A=Object(m.a)(U,2),B=A[0],F=A[1],q=Object(n.useRef)(!1),w=Object(n.useRef)(!0),E=Object(n.useRef)(!1);function K(){return G.apply(this,arguments)}function G(){return(G=Object(u.a)(o.a.mark((function e(){var t,c,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://bgapidatafeed.vps.com.vn/getlistindexdetail/10");case 2:return t=e.sent,e.next=5,t.json();case 5:void 0!==(c=e.sent)&&((n=Object(a.a)({},v)).idx=c[0].cIndex,n.idxopen=c[0].oIndex,n.idxchg=c[0].ot.split("|")[0],n.idxpct=c[0].ot.split("|")[1],n.tval=c[0].ot.split("|")[2],n.tvol=c[0].vol,n.status=c[0].status,O(n));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(){return R.apply(this,arguments)}function R(){return(R=Object(u.a)(o.a.mark((function e(){var t,c;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getdata"),e.next=3,fetch("https://bgapidatafeed.vps.com.vn/getliststockdata/"+D.join(","));case 3:return t=e.sent,e.next=6,t.json();case 6:void 0!==(c=e.sent)&&b((function(e){return c})),I(!0);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function z(e){var t,c=new Date,n=c.getHours(),r=c.getMinutes(),s=c.getSeconds();D.indexOf(e.sym);i(n+":"+r+":"+s+": "+JSON.stringify(e)),N({type:"UPDATE_TO_CURRENTSTOCKPRICE",item:{sym:e.sym,lastPrice:e.lastPrice}}),(t=document.querySelector("#"+e.sym+"-ot")).innerHTML!==e.change&&(t.innerHTML=e.change,X("#"+e.sym+"-ot")),t=document.querySelector("#"+e.sym+"-lastPrice"),parseFloat(t.innerHTML)!==parseFloat(e.lastPrice)&&(t.innerHTML=e.lastPrice,X("#"+e.sym+"-lastPrice")),(t=document.querySelector("#"+e.sym+"-lastVolume")).innerHTML!==p(e.lastVol.toString())&&(t.innerHTML=p(e.lastVol.toString()),X("#"+e.sym+"-lastVolume")),(t=document.querySelector("#"+e.sym+"-changePc")).innerHTML!==e.changePc+"%"&&(t.innerHTML=e.changePc+"%",X("#"+e.sym+"-changePc")),(t=document.querySelector("#"+e.sym+"-lot")).innerHTML!==p(e.totalVol.toString())&&(t.innerHTML=p(e.totalVol.toString()),X("#"+e.sym+"-lot")),(t=document.querySelector("#"+e.sym+"-Max")).innerHTML!==e.hp&&(t.innerHTML=e.hp,X("#"+e.sym+"-Max"),Y("#"+e.sym+"-MaxAll",W(e.hp,document.querySelector("#"+e.sym+"-r").innerHTML,document.querySelector("#"+e.sym+"-f").innerHTML,document.querySelector("#"+e.sym+"-c").innerHTML))),(t=document.querySelector("#"+e.sym+"-Min")).innerHTML!==e.hp&&(t.innerHTML=e.lp,X("#"+e.sym+"-Min"),Y("#"+e.sym+"-MinAll",W(e.lp,document.querySelector("#"+e.sym+"-r").innerHTML,document.querySelector("#"+e.sym+"-f").innerHTML,document.querySelector("#"+e.sym+"-c").innerHTML))),"IDJ"===e.sym&&(document.title=e.sym+"|"+document.querySelector("#"+e.sym+"-lastPrice").innerHTML+"|"+document.querySelector("#"+e.sym+"-changePc").innerHTML),Y("#"+e.sym,W(e.lastPrice,document.querySelector("#"+e.sym+"-r").innerHTML,document.querySelector("#"+e.sym+"-f").innerHTML,document.querySelector("#"+e.sym+"-c").innerHTML))}function J(e,t){return parseFloat(e)===t.f?"txt-gia-san":parseFloat(e)===t.c?"txt-gia-tran":0===parseFloat(e)?"txt-gia-tc":parseFloat(e)<t.r?"txt-gia-thap":parseFloat(e)>t.r?"txt-gia-cao":"txt-gia-tc"}function W(e,t,c,n){return parseFloat(e)===parseFloat(c)?"txt-gia-san":parseFloat(e)===parseFloat(n)?"txt-gia-tran":parseFloat(e)===parseFloat(t)?"txt-gia-tc":parseFloat(e)<parseFloat(t)?"txt-gia-thap":parseFloat(e)>parseFloat(t)?"txt-gia-cao":void 0}function Y(e,t){var c=document.querySelector(e),n=c.classList.item(1);n!==t&&c.classList.replace(n,t)}function X(e){var t=document.querySelector(e);t.classList.replace("backgroundwhite","backgroundgray");setTimeout((function(){t.classList.replace("backgroundgray","backgroundwhite")}),3e3)}Object(n.useEffect)((function(){if(w.current)return console.log("First Render"),V(),K(),w.current=!1,q.current=!0,T.on("board",(function(e){q.current&&document.getElementById("MainCheck")&&function(e){var t;!0===q.current&&(3210===e.id?"B"===e.side?((t=document.querySelector("#"+e.sym+"-g1-vol")).innerHTML!==p(e.g1.split("|")[1])&&(X("#"+e.sym+"-g1-vol"),t.innerHTML=p(e.g1.split("|")[1])),(t=document.querySelector("#"+e.sym+"-g1-price")).innerHTML!==e.g1.split("|")[0]&&(X("#"+e.sym+"-g1-price"),t.innerHTML=e.g1.split("|")[0]),Y("#"+e.sym+"-g1",W(e.g1.split("|")[0],document.querySelector("#"+e.sym+"-r").innerHTML,document.querySelector("#"+e.sym+"-f").innerHTML,document.querySelector("#"+e.sym+"-c").innerHTML)),(t=document.querySelector("#"+e.sym+"-g2-vol")).innerHTML!==p(e.g2.split("|")[1])&&(X("#"+e.sym+"-g2-vol"),t.innerHTML=p(e.g2.split("|")[1])),(t=document.querySelector("#"+e.sym+"-g2-price")).innerHTML!==e.g2.split("|")[0]&&(X("#"+e.sym+"-g2-price"),t.innerHTML=e.g2.split("|")[0]),Y("#"+e.sym+"-g2",W(e.g2.split("|")[0],document.querySelector("#"+e.sym+"-r").innerHTML,document.querySelector("#"+e.sym+"-f").innerHTML,document.querySelector("#"+e.sym+"-c").innerHTML)),(t=document.querySelector("#"+e.sym+"-g3-vol")).innerHTML!==p(e.g3.split("|")[1])&&(X("#"+e.sym+"-g3-vol"),t.innerHTML=p(e.g3.split("|")[1])),(t=document.querySelector("#"+e.sym+"-g3-price")).innerHTML!==e.g3.split("|")[0]&&(X("#"+e.sym+"-g3-price"),t.innerHTML=e.g3.split("|")[0]),Y("#"+e.sym+"-g3",W(e.g3.split("|")[0],document.querySelector("#"+e.sym+"-r").innerHTML,document.querySelector("#"+e.sym+"-f").innerHTML,document.querySelector("#"+e.sym+"-c").innerHTML))):((t=document.querySelector("#"+e.sym+"-g4-vol")).innerHTML!==p(e.g1.split("|")[1])&&(X("#"+e.sym+"-g4-vol"),t.innerHTML=p(e.g1.split("|")[1])),(t=document.querySelector("#"+e.sym+"-g4-price")).innerHTML!==e.g1.split("|")[0]&&(X("#"+e.sym+"-g4-price"),t.innerHTML=e.g1.split("|")[0]),Y("#"+e.sym+"-g4",W(e.g1.split("|")[0],document.querySelector("#"+e.sym+"-r").innerHTML,document.querySelector("#"+e.sym+"-f").innerHTML,document.querySelector("#"+e.sym+"-c").innerHTML)),(t=document.querySelector("#"+e.sym+"-g5-vol")).innerHTML!==p(e.g2.split("|")[1])&&(X("#"+e.sym+"-g5-vol"),t.innerHTML=p(e.g2.split("|")[1])),(t=document.querySelector("#"+e.sym+"-g5-price")).innerHTML!==e.g2.split("|")[0]&&(X("#"+e.sym+"-g5-price"),t.innerHTML=e.g2.split("|")[0]),Y("#"+e.sym+"-g5",W(e.g2.split("|")[0],document.querySelector("#"+e.sym+"-r").innerHTML,document.querySelector("#"+e.sym+"-f").innerHTML,document.querySelector("#"+e.sym+"-c").innerHTML)),(t=document.querySelector("#"+e.sym+"-g6-vol")).innerHTML!==p(e.g3.split("|")[1])&&(X("#"+e.sym+"-g6-vol"),t.innerHTML=p(e.g3.split("|")[1])),(t=document.querySelector("#"+e.sym+"-g6-price")).innerHTML!==e.g3.split("|")[0]&&(X("#"+e.sym+"-g6-price"),t.innerHTML=e.g3.split("|")[0]),Y("#"+e.sym+"-g6",W(e.g3.split("|")[0],document.querySelector("#"+e.sym+"-r").innerHTML,document.querySelector("#"+e.sym+"-f").innerHTML,document.querySelector("#"+e.sym+"-c").innerHTML))):3220===e.id&&z(e))}(e.data)})),T.on("index",(function(e){})),T.on("stock",(function(e){q.current&&document.getElementById("MainCheck")&&(console.log(document.getElementById("MainCheck")),z(e.data))})),void T.on("disconnect",(function(){T.removeAllListeners(),F(!1),document.querySelector("#connectioncircle").style.backgroundColor="gray"}))}),[]),Object(n.useEffect)((function(){l.map((function(e){return N({type:"UPDATE_TO_CURRENTSTOCKPRICE",item:{sym:e.sym,lastPrice:e.lastPrice}})})),function(){var e=l;console.log("tempstock",e)}()}),[l]),Object(n.useEffect)((function(){E.current&&(V(),E.current=!1);var e='{"action":"join","list":"'+D.join(",")+'"}';T.emit("regs",e),console.log("CONNECTED"),F(!0),document.querySelector("#connectioncircle").style.backgroundColor="blue";setTimeout((function(){F(!1)}),3e3)}),[D]),x((function(){K()}),6e4);var $,Q=function(){var e=Object(u.a)(o.a.mark((function e(t){var c,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),""!==(c=document.getElementById("stockcodeinput").value.toUpperCase())&&(D.findIndex((function(e){return e===c}))>=0?console.log("khong can thay doi"):(console.log("updatelist",c),n=D,_([].concat(Object(d.a)(n),[c])))),E.current=!0;case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:"VNIndexContain",id:"MainCheck",children:[Object(j.jsx)("div",{children:Object(j.jsx)(k,{})}),Object(j.jsxs)("div",{className:"VNIndexContent",style:{color:v.idx<v.idxopen?"red":v.idx>v.idxopen?"blue":"black"},children:[Object(j.jsxs)("div",{className:"VnIndex",children:[void 0!==v.idx?parseFloat(v.idx).toLocaleString("en-US",{style:"decimal",currency:"USD"}):"0"," "]}),Object(j.jsxs)("div",{className:"VnIndex",children:[void 0!==v.idxchg?v.idxchg:"0","   "]}),Object(j.jsxs)("div",{className:"VnIndex",children:[void 0!==v.idxpct?v.idxpct:"0","   "]}),Object(j.jsxs)("div",{className:"VnIndex",children:[void 0!==v.tval?parseInt(v.tval).toLocaleString("en-US",{style:"decimal",currency:"USD"}):"0"," "]}),Object(j.jsx)("div",{children:Object(j.jsx)("a",{className:"connection-circle notconnected",id:"connectioncircle"})})]})]}),Object(j.jsx)("form",{children:Object(j.jsxs)("div",{children:[Object(j.jsx)("input",{className:"stockcodeinput",id:"stockcodeinput",onChange:function(e){e.target.value=e.target.value.toUpperCase()}}),Object(j.jsx)("button",{className:"addstocktolist",onClick:Q,children:"Add Stock"}),Object(j.jsx)("button",{className:"addstocktolist",onClick:function(e){e.preventDefault(),""!==document.getElementById("stockcodeinput").value.toUpperCase()&&N({type:"DEL_STOCK_TO_LIST",item:document.getElementById("stockcodeinput").value.toUpperCase()})},children:"Del Stock"})]})}),Object(j.jsx)("div",{className:"realtime",children:($=l,$&&$.map((function(e,t){return Object(j.jsxs)("div",{className:"stockCard",children:[Object(j.jsxs)("div",{className:"stockCard__Header "+J(e.lastPrice,e),id:e.sym,children:[Object(j.jsx)("div",{children:e.sym}),Object(j.jsx)("div",{className:"backgroundwhite",id:e.sym+"-ot",children:e.ot}),Object(j.jsx)("div",{className:"backgroundwhite",id:e.sym+"-lastPrice",children:e.lastPrice}),Object(j.jsx)("div",{className:"backgroundwhite",id:e.sym+"-lastVolume",children:p(e.lastVolume.toString())}),Object(j.jsxs)("div",{className:"backgroundwhite",id:e.sym+"-changePc",children:[e.changePc,"%"]}),Object(j.jsx)("div",{className:"backgroundwhite",id:e.sym+"-lot",children:p(e.lot.toString())}),Object(j.jsxs)("div",{className:"fadeOut",id:e.sym+"-r",children:[e.r," "]}),Object(j.jsxs)("div",{className:"fadeOut",id:e.sym+"-f",children:[e.f," "]}),Object(j.jsxs)("div",{className:"fadeOut",id:e.sym+"-c",children:[e.c," "]})]}),Object(j.jsxs)("div",{className:"stockCard__Buy",children:[Object(j.jsxs)("div",{className:"BuyAmount",children:[Object(j.jsx)("div",{children:"Amount"})," ",Object(j.jsx)("div",{children:"Price"})]}),Object(j.jsxs)("div",{className:"BuyAmount "+J(e.g1.split("|")[0],e),id:e.sym+"-g1",children:[Object(j.jsx)("div",{className:"backgroundwhite",id:e.sym+"-g1-vol",children:p(e.g1.split("|")[1])}),Object(j.jsx)("div",{className:"backgroundwhite",id:e.sym+"-g1-price",children:e.g1.split("|")[0]})]}),Object(j.jsxs)("div",{className:"BuyAmount "+J(e.g2.split("|")[0],e),id:e.sym+"-g2",children:[Object(j.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g2-vol",children:p(e.g2.split("|")[1])}),Object(j.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g2-price",children:e.g2.split("|")[0]})]}),Object(j.jsxs)("div",{className:"BuyAmount "+J(e.g3.split("|")[0],e),id:e.sym+"-g3",children:[Object(j.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g3-vol",children:p(e.g3.split("|")[1])}),Object(j.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g3-price",children:e.g3.split("|")[0]})]}),Object(j.jsxs)("div",{className:"BuyAmount "+J(e.lowPrice,e)+" backgroundwhite",id:e.sym+"-MinAll",style:{borderTopWidth:1,borderTopColor:"#A9A9A9",borderTopStyle:"solid"},children:[Object(j.jsx)("div",{children:"Min"})," ",Object(j.jsx)("div",{id:e.sym+"-Min",children:e.lowPrice})]})]}),Object(j.jsxs)("div",{className:"stockCard__Sell",children:[Object(j.jsxs)("div",{className:"BuyAmount",children:[Object(j.jsx)("div",{children:"Amount"})," ",Object(j.jsx)("div",{children:"Price"})]}),Object(j.jsxs)("div",{className:"SellAmount "+J(e.g4.split("|")[0],e),id:e.sym+"-g4",children:[Object(j.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g4-vol",children:p(e.g4.split("|")[1])}),Object(j.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g4-price",children:e.g4.split("|")[0]})]}),Object(j.jsxs)("div",{className:"SellAmount "+J(e.g5.split("|")[0],e),id:e.sym+"-g5",children:[Object(j.jsx)("div",{className:"backgroundwhite",id:e.sym+"-g5-vol",children:p(e.g5.split("|")[1])}),Object(j.jsx)("div",{className:"backgroundwhite",id:e.sym+"-g5-price",children:e.g5.split("|")[0]})]}),Object(j.jsxs)("div",{className:"SellAmount "+J(e.g6.split("|")[0],e),id:e.sym+"-g6",children:[Object(j.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g6-vol",children:p(e.g6.split("|")[1])}),Object(j.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g6-price",children:e.g6.split("|")[0]})]}),Object(j.jsxs)("div",{className:"BuyAmount "+J(e.highPrice,e)+" backgroundwhite",id:e.sym+"-MaxAll",style:{borderTopWidth:1,borderTopColor:"#A9A9A9",borderTopStyle:"solid"},children:[Object(j.jsx)("div",{children:"Max"})," ",Object(j.jsx)("div",{id:e.sym+"-Max",children:e.highPrice})]})]})]},t)})))}),Object(j.jsx)("div",{className:"jsonValue",children:c}),Object(j.jsx)("div",{className:B?"alert alert-success connection-alert connected-alert text-center fadeIn":"fadeOut",children:Object(j.jsx)("strong",{children:"Connected!"})}),Object(j.jsx)("div",{children:D.join(",")})]})},N=c(62),C=c(24),L=(c(181),c(158).a.initializeApp({apiKey:"AIzaSyDl0oKQRCOHexa-EloSX_pJFN-lkSqibtc",authDomain:"stockrealtime-5c049.firebaseapp.com",databaseURL:"https://stockrealtime-5c049.firebaseio.com",projectId:"stockrealtime-5c049",storageBucket:"stockrealtime-5c049.appspot.com",messagingSenderId:"144010414262",appId:"1:144010414262:web:322dbb3aa4889756587e17",measurementId:"G-J2YJH55K7K"}).firestore()),D=L.collection("Stocks"),_=L,P=c(371),H=c(368),I=c(360),U=c(369),A=c(372),B=c(367),F=c(366),q=c(365);function w(e){var t=i.a.useState(!1),c=Object(m.a)(t,2),n=c[0],r=c[1];var s=function(){r(!1);var t=parseFloat(document.getElementById("StockID").value),c=parseFloat(document.getElementById("StockAmountID").value);(console.log(t),isNaN(t))||D.where("MaCK","==",e.stockitem.MaCK).where("IsSold","==",!1).where("Amount","==",e.stockitem.Amount).where("BoughtPrice","==",e.stockitem.BoughtPrice).onSnapshot((function(n){n.docs.map((function(n){!function(e,t,c,n,i){var r=D.doc(e);r.get().then((function(e){e.exists?r.update({SoldPrice:t,DaySold:y()[0],MonthSold:y()[1],YearSold:y()[2],IsSold:!0,Gain:c,Amount:i,Percent:n}):console.log("No such document!")})).catch((function(e){console.log("Error getting document:",e)}))}(n.id,t,v(e.stockitem.BoughtPrice,t,e.stockitem.Amount)[0],v(e.stockitem.BoughtPrice,t,e.stockitem.Amount)[1],c)}))}))};return Object(j.jsxs)("div",{children:[Object(j.jsx)(I.a,{variant:"outlined",style:{fontSize:"12px"},size:"small",onClick:function(){r(!0)},children:" Sell  "}),Object(j.jsxs)(A.a,{open:n,onClose:s,"aria-labelledby":"form-dialog-title",disableBackdropClick:!0,children:[Object(j.jsxs)(q.a,{id:"form-dialog-title",children:["Sell ",e.stockitem.MaCK]}),Object(j.jsxs)(F.a,{children:[Object(j.jsx)(U.a,{id:"StockID",autoFocus:!0,margin:"dense",label:"Sell Price",type:"email",fullWidth:!0}),Object(j.jsx)(U.a,{id:"StockAmountID",margin:"dense",label:"Volume",defaultValue:e.stockitem.Amount,fullWidth:!0})]}),Object(j.jsxs)(B.a,{children:[Object(j.jsx)(I.a,{onClick:function(){r(!1)},color:"primary",children:" Cancel  "}),Object(j.jsx)(I.a,{onClick:s,color:"primary",children:" Submit "})]})]})]})}c(190),c(191);var E=function(e){return Object(j.jsxs)("div",{className:"item_border",children:[Object(j.jsxs)("div",{className:"date_frame",children:[Object(j.jsx)("div",{className:"date_frame_day",children:e.stockitem.DayBought}),Object(j.jsx)("div",{className:"date_frame_month",children:e.stockitem.MonthBought}),Object(j.jsx)("div",{className:"date_frame_year",children:e.stockitem.YearBought})]}),Object(j.jsxs)("div",{className:"common_frame",children:[Object(j.jsx)("div",{className:"common_frame_name",children:"Symbol"}),Object(j.jsx)("div",{className:"common_frame_value",children:e.stockitem.MaCK})]}),Object(j.jsxs)("div",{className:"common_frame_Gain",children:[Object(j.jsx)("div",{children:"Gain"}),Object(j.jsx)("div",{className:"common_frame_value",children:e.stockitem.Amount.toLocaleString("en-US",{style:"decimal",currency:"USD"})})]}),Object(j.jsxs)("div",{className:"common_frame",children:[Object(j.jsx)("div",{children:"Bought Price"}),Object(j.jsx)("div",{className:"common_frame_value",children:e.stockitem.BoughtPrice})]}),Object(j.jsxs)("div",{className:"common_frame",children:[Object(j.jsx)("div",{children:"Sold Price"}),Object(j.jsx)("div",{className:"common_frame_value",children:e.stockitem.SoldPrice})]}),Object(j.jsxs)("div",{className:"common_frame_gain",children:[Object(j.jsx)("div",{children:"Gain"}),Object(j.jsx)("div",{className:"common_frame_value",children:0===e.stockitem.SoldPrice?0:e.stockitem.Gain.toLocaleString("en-US",{style:"decimal",currency:"USD"})})]}),Object(j.jsxs)("div",{className:"common_frame_end",children:[Object(j.jsx)("div",{children:"Gain %"}),Object(j.jsxs)("div",{className:"common_frame_value",children:[0===e.stockitem.SoldPrice?0:e.stockitem.Percent.toLocaleString("en-US",{style:"decimal",currency:"USD"}),"%"]})]})]})},K=c(159);c(327);var G=function(e){var t=Object(n.useState)({}),c=Object(m.a)(t,2),i=c[0],r=c[1];return Object(n.useEffect)((function(){r({labels:["January","February","March","April","May","June","July","August","September","October","November","December"],datasets:[{type:"line",label:"Total Gain",borderColor:"rgb(54, 162, 235)",borderWidth:1,fill:!1,data:[e.Total,e.Total,e.Total,e.Total,e.Total,e.Total,e.Total,e.Total,e.Total,e.Total,e.Total,e.Total]},{label:"Gain",backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)"],borderColor:["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)"],borderWidth:1,data:e.data}]})}),[e]),Object(j.jsx)("div",{children:Object(j.jsx)(K.a,{data:i,options:{title:{display:!0,text:"Gain per month",fontSize:20},legend:{display:!0,position:"right"},scales:{yAxes:[{ticks:{callback:function(e){return"$"+e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}}}]},tooltips:{callbacks:{label:function(e,t){return"$"+Number(e.yLabel).toFixed(0).replace(/./g,(function(e,t,c){return t>0&&"."!==e&&(c.length-t)%3===0?","+e:e}))}}},plugins:{datalabels:{display:!1,color:"red"}}}})})};var V=function(){var e=Object(n.useState)([]),t=Object(m.a)(e,2),c=t[0],i=t[1];function r(e){var t=c.reduce((function(t,c){return c.MonthSold===e&c.SoldPrice>0?t+c.Gain:t}),0);return parseInt(t)}Object(n.useEffect)((function(){_.collection("Stocks").orderBy("Percent","desc").onSnapshot((function(e){i(e.docs.map((function(e){return e.data()})))}))}),[]);var s,a=c.reduce((function(e,t){return t.SoldPrice>0?e+t.Gain:e}),0);return Object(j.jsxs)("div",{children:[Object(j.jsx)(N.b,{to:"/",children:Object(j.jsx)("div",{children:Object(j.jsx)("span",{className:"Header-cartCount",children:"Main"})})}),Object(j.jsxs)("div",{style:{color:"blue",display:"flex",width:"700px"},children:[Object(j.jsx)("div",{className:"Transactions",children:"Transactions: "}),Object(j.jsx)("div",{children:a.toLocaleString("en-US",{style:"decimal",currency:"USD"})})]}),Object(j.jsx)("div",{children:Object(j.jsx)(G,{data:[r(1),r(2),r(3),r(4),r(5),r(6),r(7),r(8),r(9),r(10),r(11),r(12)],Total:a})}),Object(j.jsxs)("div",{className:"Month_all",children:[Object(j.jsxs)("div",{className:"Month",children:[Object(j.jsx)("div",{className:"Month_text",children:"January :"}),Object(j.jsx)("div",{className:"Month_value",children:r(1).toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(j.jsx)("span",{className:"tab",children:" "}),Object(j.jsx)("div",{className:"Month_text",children:"February :"}),Object(j.jsx)("div",{className:"Month_value",children:r(2).toLocaleString("en-US",{style:"decimal",currency:"USD"})})]}),Object(j.jsxs)("div",{className:"Month",children:[Object(j.jsx)("div",{className:"Month_text",children:"March :"}),Object(j.jsx)("div",{className:"Month_value",children:r(3).toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(j.jsx)("span",{className:"tab",children:" "}),Object(j.jsx)("div",{className:"Month_text",children:"April :"}),Object(j.jsx)("div",{className:"Month_value",children:r(4).toLocaleString("en-US",{style:"decimal",currency:"USD"})})]}),Object(j.jsxs)("div",{className:"Month",children:[Object(j.jsx)("div",{className:"Month_text",children:"May :"}),Object(j.jsx)("div",{className:"Month_value",children:r(5).toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(j.jsx)("span",{className:"tab",children:" "}),Object(j.jsx)("div",{className:"Month_text",children:"June :"}),Object(j.jsx)("div",{className:"Month_value",children:r(6).toLocaleString("en-US",{style:"decimal",currency:"USD"})})]}),Object(j.jsxs)("div",{className:"Month",children:[Object(j.jsx)("div",{className:"Month_text",children:"July :"}),Object(j.jsx)("div",{className:"Month_value",children:r(7).toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(j.jsx)("span",{className:"tab",children:" "}),Object(j.jsx)("div",{className:"Month_text",children:"August :"}),Object(j.jsx)("div",{className:"Month_value",children:r(8).toLocaleString("en-US",{style:"decimal",currency:"USD"})})]}),Object(j.jsxs)("div",{className:"Month",children:[Object(j.jsx)("div",{className:"Month_text",children:"September :"}),Object(j.jsx)("div",{className:"Month_value",children:r(9).toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(j.jsx)("span",{className:"tab",children:" "}),Object(j.jsx)("div",{className:"Month_text",children:"October :"}),Object(j.jsx)("div",{className:"Month_value",children:r(10).toLocaleString("en-US",{style:"decimal",currency:"USD"})})]}),Object(j.jsxs)("div",{className:"Month",children:[Object(j.jsx)("div",{className:"Month_text",children:"November :"}),Object(j.jsx)("div",{className:"Month_value",children:r(11).toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(j.jsx)("span",{className:"tab",children:" "}),Object(j.jsx)("div",{className:"Month_text",children:"December :"}),Object(j.jsx)("div",{className:"Month_value",children:r(12).toLocaleString("en-US",{style:"decimal",currency:"USD"})})]})]}),(s=c,s&&s.map((function(e,t){return Object(j.jsx)("div",{children:Object(j.jsx)(E,{stockitem:e})},t)})))]})};var R=function(){var e=Object(n.useState)([]),t=Object(m.a)(e,2),c=t[0],i=t[1],r=Object(n.useState)([]),s=Object(m.a)(r,2),a=s[0],l=s[1],o=Object(n.useState)([]),d=Object(m.a)(o,2),u=d[0],b=d[1],h=Object(n.useState)(!1),p=Object(m.a)(h,2),x=p[0],v=p[1],O=g(),S=Object(m.a)(O,2),f=S[0].currentstockprice;S[1],Object(n.useEffect)((function(){_.collection("Stocks").orderBy("MaCK").onSnapshot((function(e){i(e.docs.map((function(e){return e.data()})))}))}),[]),Object(n.useEffect)((function(){var e=null===c||void 0===c?void 0:c.filter((function(e){return!1===e.IsSold})).map((function(e){return{MaCK:e.MaCK,SoldPrice:e.SoldPrice,BoughtPrice:e.BoughtPrice,Amount:e.Amount,Gain:e.Gain,Percent:e.Percent,IsSold:e.IsSold}}));l(e.sort((function(e,t){return e.MaCK.localeCompare(t.MaCK)}))),e=null===c||void 0===c?void 0:c.filter((function(e){return!0===e.IsSold})).map((function(e){return{MaCK:e.MaCK,SoldPrice:e.SoldPrice,BoughtPrice:e.BoughtPrice,Amount:e.Amount,Gain:e.Gain,Percent:e.Percent,IsSold:e.IsSold}})),b(e)}),[c]);var M=u.reduce((function(e,t){return e+t.Gain}),0),k=a.reduce((function(e,t){var c;return e+C(t.BoughtPrice,null===(c=f[f.findIndex((function(e){return e.sym===t.MaCK}))])||void 0===c?void 0:c.lastPrice,t.Amount)[0]}),0),T=a.reduce((function(e,t){return e+t.BoughtPrice*t.Amount*1e3}),0);function C(e,t,c){var n=(1e3*parseFloat(t)-1e3*parseFloat(e))*c-(parseFloat(e)+parseFloat(t))*c*2-parseFloat(t)*c;return[n,(n/(10*parseFloat(e)*c)).toFixed(2)+"%"]}var L=function(e){return e&&e.map((function(e,t){var c,n,i;return Object(j.jsxs)("div",{className:"stocks",children:[Object(j.jsx)("div",{className:"mack",children:e.MaCK}),Object(j.jsx)("div",{className:"buyprice",children:e.BoughtPrice}),Object(j.jsx)("div",{className:"sell",children:e.IsSold?e.SoldPrice:null===(c=f[f.findIndex((function(t){return t.sym===e.MaCK}))])||void 0===c?void 0:c.lastPrice}),Object(j.jsx)("div",{className:"Amount",children:e.Amount.toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(j.jsx)("div",{className:"lailo",children:e.IsSold?e.Gain.toLocaleString("en-US",{style:"decimal",currency:"USD"}):C(e.BoughtPrice,null===(n=f[f.findIndex((function(t){return t.sym===e.MaCK}))])||void 0===n?void 0:n.lastPrice,e.Amount)[0].toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(j.jsx)("div",{className:"tyle",children:e.IsSold?e.Percent.toLocaleString("en-US",{style:"decimal",currency:"USD"}):C(e.BoughtPrice,null===(i=f[f.findIndex((function(t){return t.sym===e.MaCK}))])||void 0===i?void 0:i.lastPrice,e.Amount)[1].toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(j.jsx)("div",{className:"sellbutton",children:e.IsSold?"":Object(j.jsx)(w,{stockitem:e})})]},t)}))};return Object(j.jsxs)("div",{className:"buysell",children:[Object(j.jsx)("div",{className:"addstockform",children:Object(j.jsxs)("form",{children:[Object(j.jsxs)("div",{className:"stockadd",children:[Object(j.jsx)("div",{children:Object(j.jsx)(U.a,{id:"StockCodeID",label:"Stock Code",style:{marginTop:5},placeholder:"0",variant:"outlined",size:"small",onChange:function(e){e.target.value=e.target.value.toUpperCase()}})}),Object(j.jsx)("div",{children:Object(j.jsx)(U.a,{id:"StockAmount",label:"Stock Amount",style:{marginTop:5},placeholder:"0",variant:"outlined",size:"small",onChange:function(e){}})}),Object(j.jsx)("div",{children:Object(j.jsx)(U.a,{id:"BuyPrice",label:"Buy Price",style:{marginTop:5},placeholder:"0",size:"small",variant:"outlined",onChange:function(e){}})})]}),Object(j.jsx)(I.a,{variant:"outlined",style:{marginTop:5,fontSize:"12px"},size:"small",onClick:function(e){e.preventDefault(),_.collection("Stocks").add({MaCK:document.getElementById("StockCodeID").value.toUpperCase(),SoldPrice:0,BoughtPrice:parseFloat(document.getElementById("BuyPrice").value),IsSold:!1,Amount:parseInt(document.getElementById("StockAmount").value),Gain:0,Percent:0,DayBought:y()[0],MonthBought:y()[1],YearBought:y()[2],DaySold:0,MonthSold:0,YearSold:0})},children:"Add Stock"})]})}),Object(j.jsxs)("div",{className:"buysell__title",children:[Object(j.jsx)("h2",{children:"Bought Stocks"}),L(a)]}),Object(j.jsxs)("div",{className:"total",children:[Object(j.jsx)("div",{className:"totalitemleft",children:k.toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(j.jsx)("div",{className:"totalitemright",children:T.toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(j.jsx)("div",{className:"totalpercent",children:(100*k/T).toFixed(2)+"%"})]}),Object(j.jsxs)("div",{className:"buysell__title",children:[Object(j.jsxs)("div",{className:"showbought",children:[Object(j.jsx)("h2",{children:"Sold Stocks"}),Object(j.jsx)("div",{className:"showlable",children:Object(j.jsx)(H.a,{control:Object(j.jsx)(P.a,{checked:x,onChange:function(){v(!x)},inputProps:{"aria-label":"secondary checkbox"},color:"primary"})})})]}),x?L(u):null,Object(j.jsx)("div",{className:"total",children:M.toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(j.jsx)(N.b,{to:"/HistoryTransactions",children:Object(j.jsx)("div",{children:Object(j.jsx)("span",{className:"Header-cartCount",children:"Chart"})})})]})]})};var z=function(){return Object(j.jsx)("div",{})};var J=function(){var e=g(),t=Object(m.a)(e,2),c=t[0].Stocklist,n=t[1];return Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{children:[" ",c.join(",")]}),Object(j.jsxs)("div",{children:[Object(j.jsx)(U.a,{id:"StockCodeIDtoList",label:"Stock Code",style:{marginTop:5},placeholder:"0",variant:"outlined",size:"small",onChange:function(e){e.target.value=e.target.value.toUpperCase()}}),Object(j.jsx)(I.a,{variant:"outlined",style:{marginTop:8,marginLeft:8,fontSize:"12px"},size:"medium",onClick:function(e){e.preventDefault(),n({type:"ADD_STOCK_TO_LIST",item:document.getElementById("StockCodeIDtoList").value.toUpperCase()})},children:"Add"}),Object(j.jsx)(I.a,{variant:"outlined",style:{marginTop:8,marginLeft:8,fontSize:"12px"},size:"medium",onClick:function(e){n({type:"DEL_STOCK_TO_LIST",item:document.getElementById("StockCodeIDtoList").value.toUpperCase()})},children:"Delete"})]})]})};var W=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsx)(N.a,{children:Object(j.jsx)("div",{className:"app",children:Object(j.jsxs)(C.c,{children:[Object(j.jsx)(C.a,{path:"/StockManager",children:Object(j.jsx)(T,{})}),Object(j.jsx)(C.a,{path:"/StyleTest",children:Object(j.jsx)(z,{})}),Object(j.jsx)(C.a,{path:"/VnIndexChart",children:Object(j.jsx)(k,{})}),Object(j.jsx)(C.a,{path:"/HistoryTransactions",children:Object(j.jsx)(V,{})}),Object(j.jsx)(C.a,{path:"/CodeView",children:Object(j.jsx)(J,{})}),Object(j.jsxs)(C.a,{path:"/",children:[Object(j.jsx)(T,{}),Object(j.jsx)(R,{})]})]})})})})},Y=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,374)).then((function(t){var c=t.getCLS,n=t.getFID,i=t.getFCP,r=t.getLCP,s=t.getTTFB;c(e),n(e),i(e),r(e),s(e)}))},X=c(157),$={basket:["hungtd","tdhung"],user:null,currentstockprice:[],socket:c.n(X)()("https://bgdatafeed.vps.com.vn/")},Q=function(e,t){var c;switch(t.type){case"ADD_STOCK_TO_LIST":return(c=e.Stocklist.findIndex((function(e){return e===t.item})))>=0?Object(a.a)(Object(a.a)({},e),{},{Stocklist:Object(d.a)(e.Stocklist)}):Object(a.a)(Object(a.a)({},e),{},{Stocklist:[].concat(Object(d.a)(e.Stocklist),[t.item])});case"DEL_STOCK_TO_LIST":var n=Object(d.a)(e.Stocklist);return-1===(c=n.indexOf(t.item))?Object(a.a)(Object(a.a)({},e),{},{Stocklist:Object(d.a)(e.Stocklist)}):(n.splice(c,1),Object(a.a)(Object(a.a)({},e),{},{Stocklist:n}));case"UPDATE_TO_CURRENTSTOCKPRICE":c=e.currentstockprice.findIndex((function(e){return e.sym===t.item.sym}));var i=Object(d.a)(e.currentstockprice);return c>=0?i[c].lastPrice=t.item.lastPrice:i=[].concat(Object(d.a)(e.currentstockprice),[t.item]),Object(a.a)(Object(a.a)({},e),{},{currentstockprice:i});default:return e}};s.a.render(Object(j.jsx)(i.a.StrictMode,{children:Object(j.jsx)(h,{initialState:$,reducer:Q,children:Object(j.jsx)(W,{})})}),document.getElementById("root")),Y()}},[[326,1,2]]]);
//# sourceMappingURL=main.a777f300.chunk.js.map