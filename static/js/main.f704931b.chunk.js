(this.webpackJsonpstockmanagerment=this.webpackJsonpstockmanagerment||[]).push([[0],{326:function(e,t,c){},327:function(e,t,c){},329:function(e,t,c){},354:function(e,t){},357:function(e,t,c){},371:function(e,t){},373:function(e,t){},383:function(e,t){},385:function(e,t){},410:function(e,t){},412:function(e,t){},413:function(e,t){},418:function(e,t){},420:function(e,t){},439:function(e,t){},451:function(e,t){},454:function(e,t){},459:function(e,t){},461:function(e,t){},484:function(e,t){},575:function(e,t,c){},582:function(e,t,c){},583:function(e,t,c){},679:function(e,t,c){"use strict";c.r(t);var n=c(4),i=c(1),a=c.n(i),s=c(23),r=c.n(s),o=(c(326),c.p,c(327),c(45)),l=c.n(o),d=c(70),u=c(76),j=c(57),m=c(25),b=(c(329),c(303)),h=c.n(b),g=Object(i.createContext)(),p=function(e){var t=e.reducer,c=e.initialState,a=e.children;return Object(n.jsx)(g.Provider,{value:Object(i.useReducer)(t,c),children:a})},x=function(){return Object(i.useContext)(g)};function f(e){if(e.length>2){var t=(10*parseInt(e)).toLocaleString("en-US",{style:"decimal",currency:"USD"});return t=t.substring(0,t.length-1)}return e}function v(){var e=new Date;return[e.getDate(),e.getMonth()+1,e.getFullYear()]}function O(e,t){var c=Object(i.useRef)();Object(i.useEffect)((function(){c.current=e}),[e]),Object(i.useEffect)((function(){if(null!==t){var e=setInterval((function(){c.current()}),t);return function(){return clearInterval(e)}}}),[t])}function y(e,t,c){var n=(1e3*parseFloat(t)-1e3*parseFloat(e))*c-(parseFloat(e)+parseFloat(t))*c*2-parseFloat(t)*c;return[n,(n/(10*parseFloat(e)*c)).toFixed(2)+"%"]}c(357);var S=c(187),k=c.n(S),N=c(304),C=c.n(N);var P=function(){var e,t="https://bgapidatafeed.vps.com.vn/getchartindexdata/",c={open:0,series:[],volume:[]},a=Object(i.useState)({options:{}}),s=Object(m.a)(a,2),r=s[0],o=s[1],d=Object(i.useState)(!1),j=Object(m.a)(d,2),b=j[0],h=j[1],g=new Date,p=g.getFullYear(),x=g.getMonth()+1,f=g.getDate(),v=g.getFullYear(),y=g.getMonth()+1,S=g.getDate(),N=11,P=0;function T(e){return I.apply(this,arguments)}function I(){return(I=Object(u.a)(l.a.mark((function e(n){var i,a,s,r,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t+n);case 2:return i=e.sent,e.next=5,i.json();case 5:a=e.sent,(N=g.getHours())>12?(N=14,P=16):N=g.getHours()+2,null!=a&&(a.marketCode,s=0,a.hasOwnProperty("openIndex")&&(s=a.openIndex),r=0,o=0,a.data.map((function(e,t){if(0===t)r=e.vol;else if(null!==e.time&&"null"!==e.time){var i=e.time.split(":"),a=Date.UTC(p,x,f,i[0],i[1]),l={x:a,y:e.cIndex},d={x:a,y:e.vol-r};if(("13"===i[0]&&"00"===i[1]||"12"===i[0]&&"59"===i[1])&&0===o){var u=Date.UTC(p,x,f,11,31),j=Date.UTC(p,x,f,12,59),m={x:u,y:e.cIndex},b={x:u,y:0},h={x:j,y:e.cIndex},g={x:j,y:0};"10"===n&&(c.series.push(m),c.series.push(h),c.volume.push(b),c.volume.push(g)),o++}e.vol-r>0&&"10"===n&&(0===c.series.length||a-c.series[c.series.length-1].x>=6e4?(c.open=s,c.series.push(l),c.volume.push(d),r=e.vol):(c.series[c.series.length-1]=l,c.volume[c.volume.length-1]=d))}})),A("containerHSX",n,c.series,s,c.volume));case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(t,c,n,i,a){e={chart:{renderTo:t,backgroundColor:"#111217",animation:!1,marginLeft:2,marginRight:2,marginBottom:22,marginTop:2,borderRadius:5,height:90,width:250},title:{text:""},xAxis:{type:"datetime",gridLineColor:"#C0C0C0",gridLineWidth:0,labels:{style:{color:"#B6BDCD",fontSize:"10px"}}},yAxis:[{title:{text:""},gridLineColor:"#C0C0C0",gridLineWidth:0,labels:{enabled:!1}},{title:{text:""},opposite:!0,gridLineColor:"#C0C0C0",gridLineWidth:0,labels:{enabled:!1}}],plotOptions:{line:{animation:!1,lineWidth:1.5,marker:{enabled:!1},threshold:i},area:{animation:!1,lineWidth:1,marker:{enabled:!1},shadow:!1,states:{hover:{lineWidth:1}}},series:{connectNulls:!0}},legend:{enabled:!1},credits:{enabled:!1},series:[{type:"line",color:"#d1af54",data:[[Date.UTC(p,x,f,9,15),i],[Date.UTC(v,y,S,N,P),i]],pointInterval:6e5,pointStart:Date.UTC(2021,2,3,9,0),pointEnd:Date.UTC(2021,2,3,14,0),marker:{enabled:!1},dashStyle:"shortdash",enableMouseTracking:!1,dataLabels:[{enabled:!0,style:{color:"#B6BDCD",fontSize:"9px"},x:120},{enabled:!0,style:{color:"#FFF",fontSize:"9px",opacity:.001},x:248}]},{type:"area",name:"Volume",yAxis:1,color:"#67CDF0",pointInterval:6e5,pointStart:Date.UTC(p,x,f,9,15),pointEnd:Date.UTC(v,y,S,N,P),data:a,selected:!0,connectNulls:!1,enableMouseTracking:!1,dataGrouping:{second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"]}},{type:"line",threshold:i,color:D("i"),negativeColor:D("d"),name:"VN-INDEX",pointInterval:6e5,pointStart:Date.UTC(p,x,f,9,15),pointEnd:Date.UTC(v,y,S,N,P),data:n,selected:!0,connectNulls:!0,enableMouseTracking:!1,dataGrouping:{second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"]}}]},o({options:e})}function D(e){return"d"===e||"txt-red"===e?"red":"i"===e||"txt-lime"===e?"#0f0":"e"===e?"#ffd900":"c"===e||"ceiling"===e?"#ff25ff":"f"===e||"floor"===e?"#1eeeee":"#f0f0f0"}return Object(i.useEffect)((function(){(function(){var e=Object(u.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:h(!0),T("10"),h(!1);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),O((function(){T("10"),console.log("HSX update:",Date())}),6e4),Object(n.jsx)("div",{children:b?Object(n.jsx)("div",{children:"Loading ..."}):Object(n.jsx)(C.a,{highcharts:k.a,options:r.options})})};var T=function(){var e,t,a="https://bgdatafeed.vps.com.vn/",s=Object(i.useState)("Begin"),r=Object(m.a)(s,2),o=r[0],b=r[1],g=Object(i.useState)([]),p=Object(m.a)(g,2),v=p[0],y=p[1],S=Object(i.useState)([]),k=Object(m.a)(S,2),N=k[0],C=k[1],T=x(),I=Object(m.a)(T,2),A=(I[0].currentstockprice,I[1]),D=["TCM","HPG","VGT","BID","DXG"],B=Object(i.useState)(!1),_=Object(m.a)(B,2),w=_[0],U=_[1],M=Object(i.useState)(!1),E=Object(m.a)(M,2),F=E[0],L=E[1];function G(){c(205)({method:"GET",url:"https://bgapidatafeed.vps.com.vn/getlistindexdetail/10"},(function(e,t,c){if(e)throw new Error(e);var n=Object(j.a)({},N);void 0!==c&&(n.idx=JSON.parse(c)[0].cIndex,n.idxopen=JSON.parse(c)[0].oIndex,n.idxchg=JSON.parse(c)[0].ot.split("|")[0],n.idxpct=JSON.parse(c)[0].ot.split("|")[1],n.tval=JSON.parse(c)[0].ot.split("|")[2],n.tvol=JSON.parse(c)[0].vol,n.status=c[0].status,C(n))}))}function K(){return(K=Object(u.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=c(205),n={method:"GET",url:"https://bgapidatafeed.vps.com.vn/getliststockdata/"+D.join(",")},e.next=4,t(n,(function(e,t,c){if(e)throw new Error(e);y(JSON.parse(c)),U(!0)}));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(e,t){return parseFloat(e)===t.f?"txt-gia-san":parseFloat(e)===t.c?"txt-gia-tran":0===parseFloat(e)?"txt-gia-tc":parseFloat(e)<t.r?"txt-gia-thap":parseFloat(e)>t.r?"txt-gia-cao":"txt-gia-tc"}function H(){var t='{"action":"join","list":"'+D.join(",")+'"}';e.emit("regs",t),e.on("board",(function(e){!function(e){if(console.log("Board",e),!0===w)if(3210===e.id){var t=v,c=D.indexOf(e.sym),n=Object(j.a)({},v[c]);"B"===e.side?(n.g1.split("|")[1]!==e.g1.split("|")[1]&&R("#"+e.sym+"-g1-vol"),n.g1.split("|")[0]!==e.g1.split("|")[0]&&R("#"+e.sym+"-g1-price"),n.g2.split("|")[1]!==e.g2.split("|")[1]&&R("#"+e.sym+"-g2-vol"),n.g2.split("|")[0]!==e.g2.split("|")[0]&&R("#"+e.sym+"-g2-price"),n.g3.split("|")[1]!==e.g3.split("|")[1]&&R("#"+e.sym+"-g3-vol"),n.g3.split("|")[0]!==e.g3.split("|")[0]&&R("#"+e.sym+"-g3-price"),n.g1=e.g1,n.g2=e.g2,n.g3=e.g3,t[c]=n,y(Object(d.a)(t))):(n.g4.split("|")[1]!==e.g1.split("|")[1]&&R("#"+e.sym+"-g4-vol"),n.g4.split("|")[0]!==e.g1.split("|")[0]&&R("#"+e.sym+"-g4-price"),n.g5.split("|")[1]!==e.g2.split("|")[1]&&R("#"+e.sym+"-g5-vol"),n.g5.split("|")[0]!==e.g2.split("|")[0]&&R("#"+e.sym+"-g5-price"),n.g6.split("|")[1]!==e.g3.split("|")[1]&&R("#"+e.sym+"-g6-vol"),n.g6.split("|")[0]!==e.g3.split("|")[0]&&R("#"+e.sym+"-g6-price"),n.g4=e.g1,n.g5=e.g2,n.g6=e.g3,t[c]=n,y(Object(d.a)(t)))}else 3220===e.id&&J(e)}(e.data)})),e.on("index",(function(e){})),e.on("stock",(function(e){J(e.data)}))}function R(e){var t=document.querySelector(e);t.classList.replace("backgroundwhite","backgroundgray");setTimeout((function(){t.classList.replace("backgroundgray","backgroundwhite")}),3e3)}function J(e){if(!0===w){var t=new Date,c=t.getHours(),n=t.getMinutes(),i=t.getSeconds(),a=v,s=D.indexOf(e.sym);b(c+":"+n+":"+i+": "+JSON.stringify(e)),A({type:"UPDATE_TO_CURRENTSTOCKPRICE",item:{sym:e.sym,lastPrice:e.lastPrice}});var r=Object(j.a)({},v[s]);r.ot!==e.change&&(r.ot=e.change,R("#"+e.sym+"-ot")),r.lastPrice!==e.lastPrice&&(r.lastPrice=e.lastPrice,R("#"+e.sym+"-lastPrice")),r.lastVolume!==e.lastVol&&(r.lastVolume=e.lastVol,R("#"+e.sym+"-lastVolume")),r.changePc!==e.changePc&&(r.changePc=e.changePc,R("#"+e.sym+"-changePc")),r.lot!==e.totalVol&&(r.lot=e.totalVol,R("#"+e.sym+"-lot")),r.highPrice=e.hp,r.lowPrice=e.lp,a[s]=r,y(Object(d.a)(a))}}return Object(i.useEffect)((function(){console.log("init stock items"),function(){K.apply(this,arguments)}(),G()}),[]),Object(i.useEffect)((function(){!0===w&&(!function(){if(null==e||"undefined"===typeof e)e=h()(a),console.log("initial websocket"),e.on("connect",(function(e){console.log("CONNECT"),L(!0),document.querySelector("#connectioncircle").style.backgroundColor="blue";var t=setTimeout((function(){L(!1)}),3e3);return function(){return clearTimeout(t)}}));else if(null!=D&&"undefined"!==typeof D){var t='{"action":"leave","list":"'+D.join(",")+'"}';e.emit("regs",t)}e.on("disconnect",(function(){e.removeAllListeners(),L(!1),document.querySelector("#connectioncircle").style.backgroundColor="gray"})),e.on("connect_error",(function(){})),e.on("reconnect_error",(function(){})),e.on("reconnect",(function(){H()}))}(),H())}),[w]),Object(i.useEffect)((function(){v.map((function(e){return A({type:"UPDATE_TO_CURRENTSTOCKPRICE",item:{sym:e.sym,lastPrice:e.lastPrice}})}))}),[w]),O((function(){G(),console.log("index update",Date())}),6e4),Object(n.jsxs)("div",{children:[Object(n.jsxs)("div",{className:"VNIndexContain",children:[Object(n.jsx)("div",{children:Object(n.jsx)(P,{})}),Object(n.jsxs)("div",{className:"VNIndexContent",style:{color:N.idx<N.idxopen?"red":N.idx>N.idxopen?"blue":"black"},children:[Object(n.jsxs)("div",{className:"VnIndex",children:[" ",void 0!==N.idx?parseFloat(N.idx).toLocaleString("en-US",{style:"decimal",currency:"USD"}):"0"," "]}),Object(n.jsxs)("div",{className:"VnIndex",children:["      ",void 0!==N.idxchg?N.idxchg:"0","   "]}),Object(n.jsxs)("div",{className:"VnIndex",children:["      ",void 0!==N.idxpct?N.idxpct:"0","   "]}),Object(n.jsxs)("div",{className:"VnIndex",children:[void 0!==N.tval?parseInt(N.tval).toLocaleString("en-US",{style:"decimal",currency:"USD"}):"0"," "]}),Object(n.jsxs)("div",{children:[" ",Object(n.jsx)("a",{className:"connection-circle notconnected",id:"connectioncircle"})," "]})]})]}),Object(n.jsx)("div",{className:"realtime",children:(t=v,t&&t.map((function(e,t){return Object(n.jsxs)("div",{className:"stockCard",children:[Object(n.jsxs)("div",{className:"stockCard__Header "+V(e.lastPrice,e),id:e.sym,children:[Object(n.jsx)("div",{children:e.sym}),Object(n.jsx)("div",{className:"backgroundwhite",id:e.sym+"-ot",children:e.ot}),Object(n.jsx)("div",{className:"backgroundwhite",id:e.sym+"-lastPrice",children:e.lastPrice}),Object(n.jsx)("div",{className:"backgroundwhite",id:e.sym+"-lastVolume",children:f(e.lastVolume.toString())}),Object(n.jsxs)("div",{className:"backgroundwhite",id:e.sym+"-changePc",children:[e.changePc,"%"]}),Object(n.jsx)("div",{className:"backgroundwhite",id:e.sym+"-lot",children:f(e.lot.toString())})]}),Object(n.jsxs)("div",{className:"stockCard__Buy",children:[Object(n.jsxs)("div",{className:"BuyAmount",children:[Object(n.jsx)("div",{children:"Amount"})," ",Object(n.jsx)("div",{children:"Price"})]}),Object(n.jsxs)("div",{className:"BuyAmount "+V(e.g1.split("|")[0],e),id:e.sym+"-g1",children:[Object(n.jsx)("div",{className:"backgroundwhite",id:e.sym+"-g1-vol",children:f(e.g1.split("|")[1])}),Object(n.jsx)("div",{className:"backgroundwhite",id:e.sym+"-g1-price",children:e.g1.split("|")[0]})]}),Object(n.jsxs)("div",{className:"BuyAmount "+V(e.g2.split("|")[0],e),id:e.sym+"-g2",children:[Object(n.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g2-vol",children:f(e.g2.split("|")[1])}),Object(n.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g2-price",children:e.g2.split("|")[0]})]}),Object(n.jsxs)("div",{className:"BuyAmount "+V(e.g3.split("|")[0],e),id:e.sym+"-g3",children:[Object(n.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g3-vol",children:f(e.g3.split("|")[1])}),Object(n.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g3-price",children:e.g3.split("|")[0]})]}),Object(n.jsxs)("div",{className:"BuyAmount backgroundwhite "+V(e.lowPrice,e),style:{borderTopWidth:1,borderTopColor:"#A9A9A9",borderTopStyle:"solid"},children:[Object(n.jsx)("div",{children:"Min"})," ",Object(n.jsx)("div",{children:e.lowPrice})]})]}),Object(n.jsxs)("div",{className:"stockCard__Sell",children:[Object(n.jsxs)("div",{className:"BuyAmount",children:[Object(n.jsx)("div",{children:"Amount"})," ",Object(n.jsx)("div",{children:"Price"})]}),Object(n.jsxs)("div",{className:"SellAmount "+V(e.g4.split("|")[0],e),id:e.sym+"-g4",children:[Object(n.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g4-vol",children:f(e.g4.split("|")[1])}),Object(n.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g4-price",children:e.g4.split("|")[0]})]}),Object(n.jsxs)("div",{className:"SellAmount "+V(e.g5.split("|")[0],e),id:e.sym+"-g5",children:[Object(n.jsx)("div",{className:"backgroundwhite",id:e.sym+"-g5-vol",children:f(e.g5.split("|")[1])}),Object(n.jsx)("div",{className:"backgroundwhite",id:e.sym+"-g5-price",children:e.g5.split("|")[0]})]}),Object(n.jsxs)("div",{className:"SellAmount "+V(e.g6.split("|")[0],e),id:e.sym+"-g6",children:[Object(n.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g6-vol",children:f(e.g6.split("|")[1])}),Object(n.jsx)("div",{className:"backgroundwhite ",id:e.sym+"-g6-price",children:e.g6.split("|")[0]})]}),Object(n.jsxs)("div",{className:"BuyAmount backgroundwhite "+V(e.highPrice,e),style:{borderTopWidth:1,borderTopColor:"#A9A9A9",borderTopStyle:"solid"},children:[Object(n.jsx)("div",{children:"Max"})," ",Object(n.jsx)("div",{children:e.highPrice})]})]})]},t)})))}),Object(n.jsx)("div",{className:"jsonValue",children:o}),Object(n.jsx)("div",{className:F?"alert alert-success connection-alert connected-alert text-center fadeIn":"fadeOut",children:Object(n.jsx)("strong",{children:"Connected!"})})]})},I=c(306),A=c(26),D=(c(575),c(307).a.initializeApp({apiKey:"AIzaSyDl0oKQRCOHexa-EloSX_pJFN-lkSqibtc",authDomain:"stockrealtime-5c049.firebaseapp.com",databaseURL:"https://stockrealtime-5c049.firebaseio.com",projectId:"stockrealtime-5c049",storageBucket:"stockrealtime-5c049.appspot.com",messagingSenderId:"144010414262",appId:"1:144010414262:web:322dbb3aa4889756587e17",measurementId:"G-J2YJH55K7K"}).firestore()),B=D.collection("Stocks"),_=D,w=c(723),U=c(720),M=c(712),E=c(721),F=c(724),L=c(719),G=c(718),K=c(717);function V(e){var t=a.a.useState(!1),c=Object(m.a)(t,2),i=c[0],s=c[1];var r=function(){s(!1);var t=parseFloat(document.getElementById("StockID").value),c=parseFloat(document.getElementById("StockAmountID").value);(console.log(t),isNaN(t))||B.where("MaCK","==",e.stockitem.MaCK).where("IsSold","==",!1).where("Amount","==",e.stockitem.Amount).where("BoughtPrice","==",e.stockitem.BoughtPrice).onSnapshot((function(n){n.docs.map((function(n){!function(e,t,c,n,i){var a=B.doc(e);a.get().then((function(e){e.exists?a.update({SoldPrice:t,DaySold:v()[0],MonthSold:v()[1],YearSold:v()[2],IsSold:!0,Gain:c,Amount:i,Percent:n}):console.log("No such document!")})).catch((function(e){console.log("Error getting document:",e)}))}(n.id,t,y(e.stockitem.BoughtPrice,t,e.stockitem.Amount)[0],y(e.stockitem.BoughtPrice,t,e.stockitem.Amount)[1],c)}))}))};return Object(n.jsxs)("div",{children:[Object(n.jsx)(M.a,{variant:"outlined",style:{fontSize:"12px"},size:"small",onClick:function(){s(!0)},children:" Sell  "}),Object(n.jsxs)(F.a,{open:i,onClose:r,"aria-labelledby":"form-dialog-title",disableBackdropClick:!0,children:[Object(n.jsxs)(K.a,{id:"form-dialog-title",children:["Sell ",e.stockitem.MaCK]}),Object(n.jsxs)(G.a,{children:[Object(n.jsx)(E.a,{id:"StockID",autoFocus:!0,margin:"dense",label:"Sell Price",type:"email",fullWidth:!0}),Object(n.jsx)(E.a,{id:"StockAmountID",margin:"dense",label:"Volume",defaultValue:e.stockitem.Amount,fullWidth:!0})]}),Object(n.jsxs)(L.a,{children:[Object(n.jsx)(M.a,{onClick:function(){s(!1)},color:"primary",children:" Cancel  "}),Object(n.jsx)(M.a,{onClick:r,color:"primary",children:" Submit "})]})]})]})}var H=function(){var e=Object(i.useState)([]),t=Object(m.a)(e,2),c=t[0],a=t[1],s=Object(i.useState)([]),r=Object(m.a)(s,2),o=r[0],l=r[1],d=Object(i.useState)([]),u=Object(m.a)(d,2),j=u[0],b=u[1],h=Object(i.useState)(!1),g=Object(m.a)(h,2),p=g[0],f=g[1],O=x(),y=Object(m.a)(O,2),S=y[0].currentstockprice;y[1],Object(i.useEffect)((function(){_.collection("Stocks").orderBy("MaCK").onSnapshot((function(e){a(e.docs.map((function(e){return e.data()})))}))}),[]),Object(i.useEffect)((function(){var e=null===c||void 0===c?void 0:c.filter((function(e){return!1===e.IsSold})).map((function(e){return{MaCK:e.MaCK,SoldPrice:e.SoldPrice,BoughtPrice:e.BoughtPrice,Amount:e.Amount,Gain:e.Gain,Percent:e.Percent,IsSold:e.IsSold}}));l(e.sort((function(e,t){return e.MaCK.localeCompare(t.MaCK)}))),e=null===c||void 0===c?void 0:c.filter((function(e){return!0===e.IsSold})).map((function(e){return{MaCK:e.MaCK,SoldPrice:e.SoldPrice,BoughtPrice:e.BoughtPrice,Amount:e.Amount,Gain:e.Gain,Percent:e.Percent,IsSold:e.IsSold}})),b(e)}),[c]);var k=j.reduce((function(e,t){return e+t.Gain}),0),N=o.reduce((function(e,t){var c;return e+P(t.BoughtPrice,null===(c=S[S.findIndex((function(e){return e.sym===t.MaCK}))])||void 0===c?void 0:c.lastPrice,t.Amount)[0]}),0),C=o.reduce((function(e,t){return e+t.BoughtPrice*t.Amount*1e3}),0);function P(e,t,c){var n=(1e3*parseFloat(t)-1e3*parseFloat(e))*c-(parseFloat(e)+parseFloat(t))*c*2-parseFloat(t)*c;return[n,(n/(10*parseFloat(e)*c)).toFixed(2)+"%"]}var T=function(e){return e&&e.map((function(e,t){var c,i,a;return Object(n.jsxs)("div",{className:"stocks",children:[Object(n.jsx)("div",{className:"mack",children:e.MaCK}),Object(n.jsx)("div",{className:"buyprice",children:e.BoughtPrice}),Object(n.jsx)("div",{className:"sell",children:e.IsSold?e.SoldPrice:null===(c=S[S.findIndex((function(t){return t.sym===e.MaCK}))])||void 0===c?void 0:c.lastPrice}),Object(n.jsx)("div",{className:"Amount",children:e.Amount.toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(n.jsx)("div",{className:"lailo",children:e.IsSold?e.Gain.toLocaleString("en-US",{style:"decimal",currency:"USD"}):P(e.BoughtPrice,null===(i=S[S.findIndex((function(t){return t.sym===e.MaCK}))])||void 0===i?void 0:i.lastPrice,e.Amount)[0].toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(n.jsx)("div",{className:"tyle",children:e.IsSold?e.Percent.toLocaleString("en-US",{style:"decimal",currency:"USD"}):P(e.BoughtPrice,null===(a=S[S.findIndex((function(t){return t.sym===e.MaCK}))])||void 0===a?void 0:a.lastPrice,e.Amount)[1].toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(n.jsx)("div",{className:"sellbutton",children:e.IsSold?"":Object(n.jsx)(V,{stockitem:e})})]},t)}))};return Object(n.jsxs)("div",{className:"buysell",children:[Object(n.jsx)("div",{className:"addstockform",children:Object(n.jsxs)("form",{children:[Object(n.jsxs)("div",{className:"stockadd",children:[Object(n.jsx)("div",{children:Object(n.jsx)(E.a,{id:"StockCodeID",label:"Stock Code",style:{marginTop:5},placeholder:"0",variant:"outlined",size:"small",onChange:function(e){e.target.value=e.target.value.toUpperCase()}})}),Object(n.jsx)("div",{children:Object(n.jsx)(E.a,{id:"StockAmount",label:"Stock Amount",style:{marginTop:5},placeholder:"0",variant:"outlined",size:"small",onChange:function(e){}})}),Object(n.jsx)("div",{children:Object(n.jsx)(E.a,{id:"BuyPrice",label:"Buy Price",style:{marginTop:5},placeholder:"0",size:"small",variant:"outlined",onChange:function(e){}})})]}),Object(n.jsx)(M.a,{variant:"outlined",style:{marginTop:5,fontSize:"12px"},size:"small",onClick:function(e){e.preventDefault(),_.collection("Stocks").add({MaCK:document.getElementById("StockCodeID").value.toUpperCase(),SoldPrice:0,BoughtPrice:parseFloat(document.getElementById("BuyPrice").value),IsSold:!1,Amount:parseInt(document.getElementById("StockAmount").value),Gain:0,Percent:0,DayBought:v()[0],MonthBought:v()[1],YearBought:v()[2],DaySold:0,MonthSold:0,YearSold:0})},children:"Add Stock"})]})}),Object(n.jsxs)("div",{className:"buysell__title",children:[Object(n.jsx)("h2",{children:"Bought Stocks"}),T(o)]}),Object(n.jsxs)("div",{className:"total",children:[Object(n.jsx)("div",{className:"totalitemleft",children:N.toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(n.jsx)("div",{className:"totalitemright",children:C.toLocaleString("en-US",{style:"decimal",currency:"USD"})}),Object(n.jsx)("div",{className:"totalpercent",children:(100*N/C).toFixed(2)+"%"})]}),Object(n.jsxs)("div",{className:"buysell__title",children:[Object(n.jsxs)("div",{className:"showbought",children:[Object(n.jsx)("h2",{children:"Sold Stocks"}),Object(n.jsx)("div",{className:"showlable",children:Object(n.jsx)(U.a,{control:Object(n.jsx)(w.a,{checked:p,onChange:function(){f(!p)},inputProps:{"aria-label":"secondary checkbox"},color:"primary"})})})]}),p?T(j):null,Object(n.jsx)("div",{className:"total",children:k.toLocaleString("en-US",{style:"decimal",currency:"USD"})})]})]})};c(582),c(583);var R=function(e){return Object(n.jsxs)("div",{className:"item_border",children:[Object(n.jsxs)("div",{className:"date_frame",children:[Object(n.jsx)("div",{className:"date_frame_day",children:e.stockitem.DayBought}),Object(n.jsx)("div",{className:"date_frame_month",children:e.stockitem.MonthBought}),Object(n.jsx)("div",{className:"date_frame_year",children:e.stockitem.YearBought})]}),Object(n.jsxs)("div",{className:"common_frame",children:[Object(n.jsx)("div",{className:"common_frame_name",children:"Symbol"}),Object(n.jsx)("div",{className:"common_frame_value",children:e.stockitem.MaCK})]}),Object(n.jsxs)("div",{className:"common_frame_Gain",children:[Object(n.jsx)("div",{children:"Gain"}),Object(n.jsx)("div",{className:"common_frame_value",children:e.stockitem.Amount.toLocaleString("en-US",{style:"decimal",currency:"USD"})})]}),Object(n.jsxs)("div",{className:"common_frame",children:[Object(n.jsx)("div",{children:"Bought Price"}),Object(n.jsx)("div",{className:"common_frame_value",children:e.stockitem.BoughtPrice})]}),Object(n.jsxs)("div",{className:"common_frame",children:[Object(n.jsx)("div",{children:"Sold Price"}),Object(n.jsx)("div",{className:"common_frame_value",children:e.stockitem.SoldPrice})]}),Object(n.jsxs)("div",{className:"common_frame_gain",children:[Object(n.jsx)("div",{children:"Gain"}),Object(n.jsx)("div",{className:"common_frame_value",children:0===e.stockitem.SoldPrice?0:e.stockitem.Gain.toLocaleString("en-US",{style:"decimal",currency:"USD"})})]}),Object(n.jsxs)("div",{className:"common_frame_end",children:[Object(n.jsx)("div",{children:"Gain %"}),Object(n.jsxs)("div",{className:"common_frame_value",children:[0===e.stockitem.SoldPrice?0:e.stockitem.Percent.toLocaleString("en-US",{style:"decimal",currency:"USD"}),"%"]})]})]})},J=c(305);c(677);var z=function(e){var t=Object(i.useState)({}),c=Object(m.a)(t,2),a=c[0],s=c[1];return Object(i.useEffect)((function(){s({labels:["January","February","March","April","May","June","July","August","September","October","November","December"],datasets:[{type:"line",label:"Total Gain",borderColor:"rgb(54, 162, 235)",borderWidth:1,fill:!1,data:[e.Total,e.Total,e.Total,e.Total,e.Total,e.Total,e.Total,e.Total,e.Total,e.Total,e.Total,e.Total]},{label:"Gain",backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(201, 203, 207, 0.2)","rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)"],borderColor:["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)"],borderWidth:1,data:e.data}]})}),[e]),Object(n.jsx)("div",{children:Object(n.jsx)(J.Bar,{data:a,options:{title:{display:!0,text:"Gain per month",fontSize:20},legend:{display:!0,position:"right"},scales:{yAxes:[{ticks:{callback:function(e){return"$"+e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}}}]},tooltips:{callbacks:{label:function(e,t){return"$"+Number(e.yLabel).toFixed(0).replace(/./g,(function(e,t,c){return t>0&&"."!==e&&(c.length-t)%3===0?","+e:e}))}}},plugins:{datalabels:{display:!1,color:"red"}}}})})};var W=function(){var e=Object(i.useState)([]),t=Object(m.a)(e,2),c=t[0],a=t[1];function s(e){var t=c.reduce((function(t,c){return c.MonthSold===e&c.SoldPrice>0?t+c.Gain:t}),0);return parseInt(t)}Object(i.useEffect)((function(){_.collection("Stocks").orderBy("Percent","desc").onSnapshot((function(e){a(e.docs.map((function(e){return e.data()})))}))}),[]);var r,o=c.reduce((function(e,t){return t.SoldPrice>0?e+t.Gain:e}),0);return Object(n.jsxs)("div",{children:[Object(n.jsxs)("ul",{className:"nav nav-tabs",role:"tablist",children:[Object(n.jsx)("li",{role:"presentation",className:"active",children:Object(n.jsx)("a",{href:"#listening","aria-controls":"profile",role:"tab","data-toggle":"tab",children:"Listening"})}),Object(n.jsx)("li",{role:"presentation",children:Object(n.jsx)("a",{href:"#emiting","aria-controls":"home",role:"tab","data-toggle":"tab",children:"Emiting"})}),Object(n.jsx)("li",{role:"presentation",children:Object(n.jsx)("a",{href:"#emitHistory","aria-controls":"history",role:"tab","data-toggle":"tab",children:"Emit History"})}),Object(n.jsx)("li",{role:"presentation",children:Object(n.jsx)("a",{href:"#emitAckRes","aria-controls":"ackRes",role:"tab","data-toggle":"tab",children:"Emiting AckRes"})})]}),Object(n.jsxs)("div",{style:{color:"blue",display:"flex"},children:[Object(n.jsx)("div",{className:"Transactions",children:"Transactions: "}),Object(n.jsx)("div",{children:o.toLocaleString("en-US",{style:"decimal",currency:"USD"})})]}),Object(n.jsx)("div",{children:Object(n.jsx)(z,{data:[s(1),s(2),s(3),s(4),s(5),s(6),s(7),s(8),s(9),s(10),s(11),s(12)],Total:o})}),(r=c,r&&r.map((function(e,t){return Object(n.jsx)("div",{children:Object(n.jsx)(R,{stockitem:e})},t)})))]})};var Y=function(){return Object(n.jsx)("div",{})};var X=function(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsx)(I.a,{children:Object(n.jsx)("div",{className:"app",children:Object(n.jsxs)(A.c,{children:[Object(n.jsx)(A.a,{path:"/StockManager",children:Object(n.jsx)(T,{})}),Object(n.jsx)(A.a,{path:"/StyleTest",children:Object(n.jsx)(Y,{})}),Object(n.jsx)(A.a,{path:"/VnIndexChart",children:Object(n.jsx)(P,{})}),Object(n.jsx)(A.a,{path:"/HistoryTransactions",children:Object(n.jsx)(W,{})}),Object(n.jsxs)(A.a,{path:"/",children:[Object(n.jsx)(T,{}),Object(n.jsx)(H,{})]})]})})})})},q=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,726)).then((function(t){var c=t.getCLS,n=t.getFID,i=t.getFCP,a=t.getLCP,s=t.getTTFB;c(e),n(e),i(e),a(e),s(e)}))},$=function(e,t){switch(t.type){case"ADD_TO_BASKET":return Object(j.a)(Object(j.a)({},e),{},{currentstockprice:[].concat(Object(d.a)(e.currentstockprice),[t.item])});case"UPDATE_TO_CURRENTSTOCKPRICE":var c=e.currentstockprice.findIndex((function(e){return e.sym===t.item.sym})),n=Object(d.a)(e.currentstockprice);return c>=0?n[c].lastPrice=t.item.lastPrice:n=[].concat(Object(d.a)(e.currentstockprice),[t.item]),Object(j.a)(Object(j.a)({},e),{},{currentstockprice:n});default:return e}};r.a.render(Object(n.jsx)(a.a.StrictMode,{children:Object(n.jsx)(p,{initialState:{basket:["hungtd","tdhung"],user:null,currentstockprice:[]},reducer:$,children:Object(n.jsx)(X,{})})}),document.getElementById("root")),q()}},[[679,1,2]]]);
//# sourceMappingURL=main.f704931b.chunk.js.map