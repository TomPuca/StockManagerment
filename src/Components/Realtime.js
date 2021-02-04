import React, { useState, useEffect, useRef } from "react";
import "./Realtime.css";
import io from "socket.io-client";
import { useStateValue } from "../StateProvider";
import { strimstring, useInterval } from "./Functions";
import VnIndexChart from "./VNIndexChart";

//index link: https://bgapidatafeed.vps.com.vn/getlistindexdetail/10

function Realtime() {
  let socketLink = "https://bgdatafeed.vps.com.vn/";
  const [newstockvalue, setnewstockvalue] = useState("Begin");
  const [StockItems, setStockItems] = useState([]);
  const [VNIndex, setVNIndex] = useState([]);
  // const [WebSocketInitState, setWebSocketInitState] = useState(false);
  const [{ currentstockprice }, dispatch] = useStateValue();
  var Stocklist = ["TCM", "HPG", "VGT", "BID", "DXG"];
  const [InitStockItems, setInitStockItems] = useState(false);
  const [IsConnected, setIsConnected] = useState(false);
  let vStockPs;
  let socket;

  // socketConnect();
  useEffect(() => {
    console.log("init stock items");
    initstockitems();
    getVNindex();
    // initWebsocket();
    // socketConnect();
  }, []);
  useEffect(() => {
    // initstockitems();
    if (InitStockItems === true) {
      // console.log(StockItems);
      initWebsocket();
      socketConnect();
    }
  }, [InitStockItems]);

  //sau khi có du lieu thi update thong tin gia ban
  useEffect(() => {
    // console.log(StockItems);
    StockItems.map((item) =>
      dispatch({
        type: "UPDATE_TO_CURRENTSTOCKPRICE",
        item: {
          sym: item.sym,
          lastPrice: item.lastPrice,
        },
      })
    );
  }, [InitStockItems]);
  // console.log("star dispach", currentstockprice);

  useInterval(() => {
    // Your custom logic here
    getVNindex();
    console.log("index update", Date());
  }, 60000);

  //thiet lap vong lap lay du lieu

  function getVNindex() {
    const request = require("request");
    const options = {
      method: "GET",
      url: "https://bgapidatafeed.vps.com.vn/getlistindexdetail/10",
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      // console.log(body.id);
      // JSON.parse(body).content.forEach((indexcontent) => {
      //   if (indexcontent.brd === "HOSE") {
      let tempindex = { ...VNIndex };
      if (body !== undefined) {
        tempindex.idx = JSON.parse(body)[0].cIndex;
        tempindex.idxopen = JSON.parse(body)[0].oIndex;
        tempindex.idxchg = JSON.parse(body)[0].ot.split("|")[0];
        tempindex.idxpct = JSON.parse(body)[0].ot.split("|")[1];
        // tempindex.ttrd = indexcontent.ttrd;
        tempindex.tval = JSON.parse(body)[0].ot.split("|")[2];
        tempindex.tvol = JSON.parse(body)[0].vol;
        tempindex.status = body[0].status;
        setVNIndex(tempindex);
      }
    });
  }
  async function initstockitems() {
    const request = require("request");
    const options = {
      method: "GET",
      // url: "https://bgapidatafeed.vps.com.vn/getliststockdata/VGT,TCM,DXG",
      url:
        "https://bgapidatafeed.vps.com.vn/getliststockdata/" +
        Stocklist.join(","),
    };

    await request(options, function (error, response, body) {
      if (error) throw new Error(error);
      setStockItems(JSON.parse(body));
      setInitStockItems(true);
      // console.log(JSON.stringify(body));
    });
  }

  function ColorText(item1, item2) {
    //{{ color: item.lastPrice < item.r ? "red" : item.lastPrice > item.r ? "blue" : item.lastPrice = item.c ? "#ff25ff" : item.lastPrice = item.f ? "#1eeeee" : "black", }}
    if (parseFloat(item1) === item2.f) {
      return "txt-gia-san";
    } else if (parseFloat(item1) === item2.c) {
      return "txt-gia-tran";
    } else if (parseFloat(item1) === 0) {
      return "txt-gia-tc";
    } else if (parseFloat(item1) < item2.r) {
      return "txt-gia-thap";
    } else if (parseFloat(item1) > item2.r) {
      return "txt-gia-cao";
    } else {
      return "txt-gia-tc";
    }
  }

  const StockRows = (arr) =>
    arr &&
    arr.map((item, index) => (
      <div className="stockCard" key={index}>
        {/*prettier-ignore*/}
        <div className={ "stockCard__Header " +  ColorText(item.lastPrice, item) } id = {item.sym} >
          <div>{item.sym}</div>
          <div className="backgroundwhite" id = {item.sym + "-ot"} >{item.ot}</div>
          <div className="backgroundwhite" id = {item.sym + "-lastPrice"}>{item.lastPrice}</div>
          <div className="backgroundwhite" id = {item.sym + "-lastVolume"}>{strimstring(item.lastVolume.toString())}</div>
          <div className="backgroundwhite" id = {item.sym + "-changePc"}>{item.changePc}%</div>
          <div className="backgroundwhite" id = {item.sym + "-lot"}>{strimstring(item.lot.toString())}</div>
        </div>
        <div className="stockCard__Buy">
          <div className="BuyAmount">
            <div>Amount</div> <div>Price</div>
          </div>
          {/*prettier-ignore*/}
          <div className={"BuyAmount " + ColorText(item.g1.split("|")[0], item)} id = {item.sym + "-g1"}>
            <div className="backgroundwhite" id = {item.sym + "-g1-vol"}>{strimstring(item.g1.split("|")[1])}</div>
            <div className="backgroundwhite" id = {item.sym + "-g1-price"}>{item.g1.split("|")[0]}</div>
          </div>
          {/*prettier-ignore*/}
          <div className={"BuyAmount " + ColorText(item.g2.split("|")[0], item)} id = {item.sym + "-g2"}>
            <div className="backgroundwhite " id = {item.sym + "-g2-vol"}>{strimstring(item.g2.split("|")[1])}</div>
            <div className="backgroundwhite " id = {item.sym + "-g2-price"}>{item.g2.split("|")[0]}</div>
          </div>
          {/*prettier-ignore*/}
          <div className={"BuyAmount " + ColorText(item.g3.split("|")[0], item)} id = {item.sym + "-g3"}>
            <div className="backgroundwhite " id = {item.sym + "-g3-vol"}>{strimstring(item.g3.split("|")[1])}</div>
            <div className="backgroundwhite " id = {item.sym + "-g3-price"}>{item.g3.split("|")[0]}</div>
          </div>
          {/*prettier-ignore*/}
          <div className={"BuyAmount backgroundwhite "+ ColorText(item.lowPrice, item)} style={{  borderTopWidth: 1, borderTopColor: "#A9A9A9",borderTopStyle: "solid",}}>
            <div>Min</div> <div>{item.lowPrice}</div>
          </div>
        </div>
        <div className="stockCard__Sell">
          <div className="BuyAmount">
            <div>Amount</div> <div>Price</div>
          </div>
          {/*prettier-ignore*/}
          <div className={"SellAmount " + ColorText(item.g4.split("|")[0], item)} id = {item.sym + "-g4"}>
            <div className="backgroundwhite " id = {item.sym + "-g4-vol"}>{strimstring(item.g4.split("|")[1])}</div>
            <div className="backgroundwhite " id = {item.sym + "-g4-price"}>{item.g4.split("|")[0]}</div>
          </div>
          {/*prettier-ignore*/}
          <div className={"SellAmount " + ColorText(item.g5.split("|")[0], item)} id = {item.sym + "-g5"}>
            <div className="backgroundwhite" id = {item.sym + "-g5-vol"}>{strimstring(item.g5.split("|")[1])}</div>
            <div className="backgroundwhite" id = {item.sym + "-g5-price"}>{item.g5.split("|")[0]}</div>
          </div>
          {/*prettier-ignore*/}
          <div className={"SellAmount " + ColorText(item.g6.split("|")[0], item)} id = {item.sym + "-g6"}>
            <div className="backgroundwhite " id = {item.sym + "-g6-vol"}>{strimstring(item.g6.split("|")[1])}</div>
            <div  className="backgroundwhite " id = {item.sym + "-g6-price"}>{item.g6.split("|")[0]}</div>
          </div>
          {/*prettier-ignore*/}
          <div className={"BuyAmount backgroundwhite "+ ColorText(item.highPrice, item)} style={{  borderTopWidth: 1, borderTopColor: "#A9A9A9",borderTopStyle: "solid",}}>
            <div>Max</div> <div>{item.highPrice}</div>
          </div>
        </div>
      </div>
    ));

  function initWebsocket() {
    if (socket == null || typeof socket === "undefined") {
      socket = io(socketLink);
      console.log("initial websocket");
      socket.on("connect", function (data) {
        console.log("CONNECT");
        setIsConnected(true);
        const connectioncircleID = document.querySelector("#connectioncircle");
        // console.log(connectioncircleID);
        connectioncircleID.style.backgroundColor = "blue";
        // connectioncircleID.classList.replace("notconnected", "connected");
        const timeout = setTimeout(() => {
          setIsConnected(false);
        }, 3000);
        return () => clearTimeout(timeout);
        // socket.emit("regs", msg);
        // console.log(data);
        // this.('#status-connect').text('Connected').css('color', '#50C979');
      });
    } else {
      if (Stocklist != null && typeof Stocklist !== "undefined") {
        // đăng ký lại room
        let msg = '{"action":"leave","list":"' + Stocklist.join(",") + '"}';
        socket.emit("regs", msg);
      }
    }

    socket.on("disconnect", () => {
      socket.removeAllListeners();
      setIsConnected(false);
      const connectioncircleID = document.querySelector("#connectioncircle");
      // console.log(connectioncircleID);
      connectioncircleID.style.backgroundColor = "gray";
      // $('#status-connect').text('Disconnect').css('color', '#DA5664');
    });
    socket.on("connect_error", () => {
      // $('#status-connect').text('Disconnect').css('color', '#DA5664');
    });
    socket.on("reconnect_error", () => {
      // $('#status-connect').text('Disconnect').css('color', '#DA5664');
    });

    socket.on("reconnect", () => {
      socketConnect();
      // $('#status-connect').text('Connected').css('color', '#50C979');
    });

    //socketConnect();
  }

  function socketConnect() {
    // var dmck = $.jStorage.get("DANH-MUC-CHUNG-KHOAN", []);
    // var stockHandle = _.find(dmck, function (o) { return o.active == true });
    // if (!stockHandle) {
    //     return;
    // }
    // var msg = "{\"action\":\"join\",\"list\":\""+ "TCM" +"\"}";
    let msg = '{"action":"join","list":"' + Stocklist.join(",") + '"}';
    // console.log(msg);
    socket.emit("regs", msg);

    socket.on("board", function (zdata) {
      // sendQueue(zdata.data);
      // console.log("board:", zdata.data);
      //Cap nhat thong tin bang gia
      // 42["board",{"data":{"id":3210,"sym":"REE","side":"S","g1":"34.90|314|i","g2":"35.00|1|i","g3":"35.10|259|i","vol4":0}}]
      //42["board",{"data":{"id":3310,"sym":"VCG","BVolume":43820,"SVolume":28860,"Total":13770,"AvePrice":17.2,"APColor":"e"}}]
      updatestock(zdata.data);
    });

    socket.on("index", function (zdata) {
      // console.log(zdata.data);
    });
    //Nếu khớp lệnh trả về thông tin khớp, chỉ trả về thông tin mã khớp
    socket.on("stock", function (zdata) {
      //{"id":3220,"sym":"TCB","lastPrice":25.3,"lastVol":100,"cl":"i","change":"0.50","changePc":"2.02","totalVol":108810,"time":"10:49:56","hp":25.3,"ch":"i","lp":24.9,"lc":"i","ap":25.1,"ca":"i"}
      updatestockmatch(zdata.data);
    });
  }

  //Cap nhat thong tin ve bang gia, neu ben ban thi la S, mua la B
  function updatestock(item) {
    // console.log("Board", item);
    if (InitStockItems === true && item.id === 3210) {
      let newStockItems = StockItems;
      let indexnum = Stocklist.indexOf(item.sym);
      //xac dinh chung khoan co thong tin thay doi
      let tempstock = { ...StockItems[indexnum] };
      if (item.side === "B") {
        // console.log(tempstock);
        //prettier-ignore
        if (tempstock.g1.split("|")[1] !== item.g1.split("|")[1]) { ChangeBackground("#" + item.sym + "-g1-vol")}
        // console.log("#" + item.sym + "-g1-vol");
        //prettier-ignore
        if (tempstock.g1.split("|")[0] !== item.g1.split("|")[0]) { ChangeBackground("#" + item.sym + "-g1-price")}
        //prettier-ignore
        if (tempstock.g2.split("|")[1] !== item.g2.split("|")[1]) { ChangeBackground("#" + item.sym + "-g2-vol")}
        //prettier-ignore
        if (tempstock.g2.split("|")[0] !== item.g2.split("|")[0]) { ChangeBackground("#" + item.sym + "-g2-price")}
        //prettier-ignore
        if (tempstock.g3.split("|")[1] !== item.g3.split("|")[1]) { ChangeBackground("#" + item.sym + "-g3-vol")}
        //prettier-ignore
        if (tempstock.g3.split("|")[0] !== item.g3.split("|")[0]) { ChangeBackground("#" + item.sym + "-g3-price")}
        tempstock.g1 = item.g1;
        tempstock.g2 = item.g2;
        tempstock.g3 = item.g3;
        newStockItems[indexnum] = tempstock;
        setStockItems([...newStockItems]);
        // console.log("temp", tempstock);
        // console.log("new: ", item);
        // volume
        //prettier-ignore
      } else {
        //prettier-ignore
        if (tempstock.g4.split("|")[1] !== item.g1.split("|")[1]) { ChangeBackground("#" + item.sym + "-g4-vol")}
        //prettier-ignore
        if (tempstock.g4.split("|")[0] !== item.g1.split("|")[0]) { ChangeBackground("#" + item.sym + "-g4-price")}
        //prettier-ignore
        if (tempstock.g5.split("|")[1] !== item.g2.split("|")[1]) { ChangeBackground("#" + item.sym + "-g5-vol")}
        //prettier-ignore
        if (tempstock.g5.split("|")[0] !== item.g2.split("|")[0]) { ChangeBackground("#" + item.sym + "-g5-price")}
        //prettier-ignore
        if (tempstock.g6.split("|")[1] !== item.g3.split("|")[1]) { ChangeBackground("#" + item.sym + "-g6-vol")}
        //prettier-ignore
        if (tempstock.g6.split("|")[0] !== item.g3.split("|")[0]) { ChangeBackground("#" + item.sym + "-g6-price")}
        tempstock.g4 = item.g1;
        tempstock.g5 = item.g2;
        tempstock.g6 = item.g3;
        newStockItems[indexnum] = tempstock;
        setStockItems([...newStockItems]);
      }

      // console.log("Temp: ", tempstock);
      // StockItems[indexnum].lastPrice = item.lastPrice;

      // console.log(item);
    }
  }
  //doi nen background sang gray khi co thay doi
  function ChangeBackground(DivID) {
    //boi den thong so neu co thay doi
    // let temp = "#" + item.sym + "-lastPrice";
    let connectioncircleID = document.querySelector(DivID);
    // console.log(connectioncircleID);
    // connectioncircleID.style.backgroundColor = "lightgray";
    // prettier-ignore
    connectioncircleID.classList.replace("backgroundwhite" , "backgroundgray");
    const timeout = setTimeout(() => {
      // prettier-ignore
      connectioncircleID.classList.replace("backgroundgray","backgroundwhite");
    }, 3000);
  }
  //Cap nhat thong tin ve khop lenh
  function updatestockmatch(item) {
    if (InitStockItems === true) {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let newStockItems = StockItems;
      let indexnum = Stocklist.indexOf(item.sym);
      // prettier-ignore
      setnewstockvalue(hours + ":" + minutes + ":" + seconds + ": " + JSON.stringify(item) );
      //update thông tin giá các mã đã mua
      dispatch({
        type: "UPDATE_TO_CURRENTSTOCKPRICE",
        item: {
          sym: item.sym,
          lastPrice: item.lastPrice,
        },
      });
      //uddate thong tin ck
      // console.log(item);
      let tempstock = { ...StockItems[indexnum] };
      if (tempstock.ot !== item.change) {
        tempstock.ot = item.change;
        ChangeBackground("#" + item.sym + "-ot");
      }
      if (tempstock.lastPrice !== item.lastPrice) {
        tempstock.lastPrice = item.lastPrice;
        ChangeBackground("#" + item.sym + "-lastPrice");
      }
      if (tempstock.lastVolume !== item.lastVol) {
        tempstock.lastVolume = item.lastVol;
        ChangeBackground("#" + item.sym + "-lastVolume");
      }
      if (tempstock.changePc !== item.changePc) {
        tempstock.changePc = item.changePc;
        ChangeBackground("#" + item.sym + "-changePc");
      }
      if (tempstock.lot !== item.totalVol) {
        tempstock.lot = item.totalVol;
        ChangeBackground("#" + item.sym + "-lot");
      }

      tempstock.highPrice = item.hp;
      tempstock.lowPrice = item.lp;

      // console.log("Temp: ", tempstock);
      // StockItems[indexnum].lastPrice = item.lastPrice;
      newStockItems[indexnum] = tempstock;
      setStockItems([...newStockItems]);
      // console.log(indexnum);
      var dnow = new Date();
      // console.log("stock", item.timeServer + "ToT" + dnow.getTime());
    }
  }

  return (
    <div>
      {/* kiem tra co du lieu moi xuat ko bi loi */}
      {/*prettier-ignore*/}
      <div className="VNIndexContain">
        <div>{<VnIndexChart />}</div>
        <div className="VNIndexContent" style={{ color: VNIndex.idx < VNIndex.idxopen ? "red" :  VNIndex.idx > VNIndex.idxopen ? "blue" : "black", }} >
          {/*prettier-ignore*/}
          <div className="VnIndex"> {VNIndex.idx !== undefined ? parseFloat(VNIndex.idx).toLocaleString("en-US", { style: "decimal", currency: "USD", }) : "0"} </div>
          {/*prettier-ignore*/}
          <div className="VnIndex">      {VNIndex.idxchg !== undefined ? VNIndex.idxchg : "0"}   </div>
          {/*prettier-ignore*/}
          <div className="VnIndex">      {VNIndex.idxpct !== undefined ? VNIndex.idxpct : "0"}   </div>
          {/*prettier-ignore*/}
          <div className="VnIndex">{VNIndex.tval !== undefined ? parseInt(VNIndex.tval).toLocaleString("en-US", {style: "decimal",currency: "USD",}) : "0"} </div>
          {/*prettier-ignore*/}
          <div> <a className="connection-circle notconnected" id="connectioncircle"></a> </div>
        </div>

      </div>
      <div className="realtime">{StockRows(StockItems)}</div>
      <div className="jsonValue">{newstockvalue}</div>
      {/*prettier-ignore*/}
      <div  className= {IsConnected ? "alert alert-success connection-alert connected-alert text-center fadeIn":  "fadeOut"}>
        <strong>Connected!</strong>
      </div>
    </div>
  );
}

export default Realtime;
