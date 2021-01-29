import React, { useState, useEffect, useRef } from "react";
import "./Realtime.css";
import io from "socket.io-client";
import { useStateValue } from "../StateProvider";
import { strimstring } from "./Functions";
//index link: https://bgapidatafeed.vps.com.vn/getlistindexdetail/10

function Realtime() {
  let socketLink = "https://bgdatafeed.vps.com.vn/";
  const [newstockvalue, setnewstockvalue] = useState("Begin");
  const [StockItems, setStockItems] = useState([]);
  const [VNIndex, setVNIndex] = useState([]);
  // const [WebSocketInitState, setWebSocketInitState] = useState(false);
  const [{ currentstockprice }, dispatch] = useStateValue();
  var Stocklist = ["TCM", "HPG", "VGT", "GIL", "DXG"];
  const [InitStockItems, setInitStockItems] = useState(false);
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
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
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
        tempindex.idxchg = JSON.parse(body)[0].ot.split("|")[0];
        tempindex.idxpct = JSON.parse(body)[0].ot.split("|")[1];
        // tempindex.ttrd = indexcontent.ttrd;
        tempindex.tval = JSON.parse(body)[0].ot.split("|")[2];
        tempindex.tvol = JSON.parse(body)[0].vol;
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
  const orderRows = (arr) =>
    arr &&
    arr.map((item, index) => (
      <div className="stockCard" key={index}>
        <div
          className="StockCard__Header"
          // prettier-ignore
          style={{ color: item.lastPrice < item.r ? "red" : item.lastPrice > item.r ? "blue" : "black", }}
        >
          <div>{item.sym}</div>
          <div>{item.ot}</div>
          <div>{item.lastPrice}</div>
          <div>{strimstring(item.lastVolume.toString())}</div>
          <div>{item.changePc}%</div>
          <div>{strimstring(item.lot.toString())}</div>
        </div>

        <div className="stockCard__Buy">
          <div
            className="BuyAmount"
            // style={{
            //   borderBottomWidth: 1,
            //   borderBottomColor: "#A9A9A9",
            //   borderBottomStyle: "solid",
            // }}
          >
            <div>Amount</div> <div>Price</div>
          </div>
          <div className="BuyAmount">
            <div>{strimstring(item.g1.split("|")[1])}</div>
            {/*prettier-ignore*/}
            <div style={{ color: (item.g1.split("|")[0]) < (item.r) ? "red" : (item.g1.split("|")[0]) > (item.r) ? "blue" : "black", }}>{item.g1.split("|")[0]}</div>
          </div>
          <div className="BuyAmount">
            <div>{strimstring(item.g2.split("|")[1])}</div>
            {/*prettier-ignore*/}
            <div style={{ color: parseFloat(item.g2.split("|")[0]) < parseFloat(item.r) ? "red" : parseFloat(item.g2.split("|")[0]) > parseFloat(item.r) ? "blue" : "black", }}>{item.g2.split("|")[0]}</div>
          </div>
          <div className="BuyAmount">
            <div>{strimstring(item.g3.split("|")[1])}</div>
            {/*prettier-ignore*/}
            <div style={{ color: parseFloat(item.g3.split("|")[0]) < parseFloat(item.r) ? "red" : parseFloat(item.g3.split("|")[0]) > parseFloat(item.r) ? "blue" : "black", }}>{item.g3.split("|")[0]}</div>
          </div>
          <div
            className="BuyAmount"
            style={{
              color: item.low < item.ref ? "red" : "blue",
              borderTopWidth: 1,
              borderTopColor: "#A9A9A9",
              borderTopStyle: "solid",
            }}
          >
            <div>Min</div> <div>{item.lowPrice}</div>
          </div>
        </div>
        <div className="stockCard__Sell">
          <div className="BuyAmount">
            <div>Amount</div> <div>Price</div>
          </div>
          <div className="SellAmount">
            <div>{strimstring(item.g4.split("|")[1])}</div>
            {/*prettier-ignore*/}
            <div style={{ color: parseFloat(item.g4.split("|")[0]) < parseFloat(item.r) ? "red" : parseFloat(item.g4.split("|")[0]) > parseFloat(item.r) ? "blue" : "black", }}>{item.g4.split("|")[0]}</div>
          </div>
          <div className="SellAmount">
            <div>{strimstring(item.g5.split("|")[1])}</div>
            {/*prettier-ignore*/}
            <div style={{ color: (item.g5.split("|")[0]) < (item.r) ? "red" : (item.g5.split("|")[0]) > (item.r) ? "blue" : "black", }}>{item.g5.split("|")[0]}</div>
          </div>
          <div className="SellAmount">
            <div>{strimstring(item.g6.split("|")[1])}</div>
            {/*prettier-ignore*/}
            <div style={{ color: (item.g6.split("|")[0]) < (item.r) ? "red" : (item.g6.split("|")[0]) > (item.r) ? "blue" : "black", }}>{item.g6.split("|")[0]}</div>
          </div>
          <div
            className="BuyAmount"
            style={{
              color: item.hig < item.ref ? "red" : "blue",
              borderTopWidth: 1,
              borderTopColor: "#A9A9A9",
              borderTopStyle: "solid",
            }}
          >
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
      let tempstock = { ...StockItems[indexnum] };
      if (item.side === "B") {
        tempstock.g1 = item.g1;
        tempstock.g2 = item.g2;
        tempstock.g3 = item.g3;
      } else {
        tempstock.g4 = item.g1;
        tempstock.g5 = item.g2;
        tempstock.g6 = item.g3;
      }

      // console.log("Temp: ", tempstock);
      // StockItems[indexnum].lastPrice = item.lastPrice;
      newStockItems[indexnum] = tempstock;
      setStockItems([...newStockItems]);
      // console.log(item);
    }
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
      console.log(item);
      let tempstock = { ...StockItems[indexnum] };
      tempstock.lastPrice = item.lastPrice;
      tempstock.lastVolume = item.lastVol;
      tempstock.change = item.change;
      tempstock.changePc = item.changePc;
      tempstock.lot = item.totalVol;
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
      <div
        className="VNIndexContent"
        style={{
          color: VNIndex.idxchg < 0 ? "red" : "blue",
        }}
      >
        <div className="VnIndex">
          {VNIndex.idx !== undefined
            ? parseFloat(VNIndex.idx).toLocaleString("en-US", {
                style: "decimal",
                currency: "USD",
              })
            : "0"}
        </div>
        <div className="VnIndex">
          {VNIndex.idxchg !== undefined ? VNIndex.idxchg : "0"}
        </div>
        <div>
          {VNIndex.tval !== undefined
            ? parseInt(VNIndex.tval).toLocaleString("en-US", {
                style: "decimal",
                currency: "USD",
              })
            : "0"}
        </div>
      </div>

      <div className="realtime">{orderRows(StockItems)}</div>
      <div className="jsonValue">{newstockvalue}</div>
    </div>
  );
}

export default Realtime;
