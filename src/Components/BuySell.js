import React, { useState, useEffect } from "react";
import "./BuySell.css";
import "./firebase";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import db from "./firebase";
import TextField from "@material-ui/core/TextField";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useStateValue } from "../StateProvider";
import { getCurrentDate } from "./Functions";
// import { ExpectedInterest } from "./TransactionItem";
import SellDialog from "./SellDialog";
// import HistoryTransactions from "./HistoryTransactions";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

//import db from "../firebase.js";
//twitter 2:36:00

function BuySell() {
  const [stocks, setStocks] = useState([]);
  const [buystocks, setBuyStocks] = useState([]);
  const [sellstocks, setSellStocks] = useState([]);
  const [showbought, setshowbought] = useState(false);
  // const [ExpectProfit, setExpectProfit] = useState(0);
  // var ExpectProfit = 0;
  const [{ currentstockprice }] = useStateValue();
  // const [{ currentstockprice }, dispatch] = useStateValue();
  // const [soldTotal, setsoldTotal] = useState(0);
  // var stockrecentbuy = {
  //   MaCK: "",
  //   SoldPrice: 0,
  //   BoughtPrice: 0,
  //   Amount: 0,
  //   Gain: 0,
  //   Percent: 0,
  //   IsSold: false,
  // };
  // const [buytemp, setbuytemp] = useState();
  // const [soldtemp, setsoldtemp] = useState();
  // const [ratiotemp, setratiotemp] = useState("0");
  // const tempstock = {
  //   buytemp: 0,
  //   soldtemp: 0,
  //   ratiotemp: 0,
  // };
  const [ratiopercent, setratiopercent] = useState("0");
  const [ratiotemp, setRatiotemp] = useState({
    buytemp: 0,
    soldtemp: 0,
    // ratiotemp: 0,
  });

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

  useEffect(() => {
    // console.log(ratiotemp);
    setratiopercent(
      ExpectedInterest(
        ratiotemp.buytemp,
        ratiotemp.soldtemp,
        1
      )[1].toLocaleString("en-US", {
        style: "decimal",
        currency: "USD",
      })
    );
  }, [ratiotemp]);
  // console.log(stockrecentbuy);
  // console.log("current price :", currentstockprice);
  useEffect(() => {
    db.collection("Stocks")
      .orderBy("MonthSold", "desc")
      .orderBy("DaySold", "desc")
      .onSnapshot((snapshot) => {
        setStocks(snapshot.docs.map((doc) => doc.data()));
      });

    // let data = [ { id: 1, name: 'Mike', city: 'philps', state:'New York'}, { id: 2, name: 'Steve', city: 'Square', state: 'Chicago'}, { id: 3, name: 'Jhon', city: 'market', state: 'New York'}, { id: 4, name: 'philps', city: 'booket', state: 'Texas'}, { id: 5, name: 'smith', city: 'brookfield', state: 'Florida'}, { id: 6, name: 'Broom', city: 'old street', state: 'Florida'}, ]
    // data = data.filter((item) => item.state == 'New York').map(({id, name, city}) => ({id, name, city}));
    // console.log(data);
  }, []);

  useEffect(() => {
    // prettier-ignore
    let data = stocks
        ?.filter((item) => item.IsSold === false)
        .map(({MaCK,SoldPrice,BoughtPrice,Amount,Gain,Percent,IsSold,DayBought,MonthBought,YearBought,}) =>
            ({MaCK,SoldPrice,BoughtPrice,Amount,Gain,Percent,IsSold,DayBought,MonthBought,YearBought,})
        );
    // objs.sort(function(a, b) {
    // return a.last_nom.localeCompare(b.last_nom)
    // });
    setBuyStocks(
      data.sort(function (a, b) {
        return a.MaCK.localeCompare(b.MaCK);
      })
    );
    // console.log("CK chua ban", data);
    // prettier-ignore
    data = stocks
        ?.filter((item) => item.IsSold === true).map(
            ({MaCK,SoldPrice,BoughtPrice,Amount,Gain,Percent,IsSold,DaySold,MonthSold,}) =>
                ({MaCK,SoldPrice,BoughtPrice,Amount,Gain,Percent,IsSold,DaySold,MonthSold,})
        );
    setSellStocks(data);
    //get buy/sell total

    // console.log("CK da ban", data);
  }, [stocks]);
  //
  // var soldTotal = sellstocks.reduce(function (prev, cur) {
  //   return prev + cur.Gain;
  // }, 0);

  var GainTotal = sellstocks.reduce(function (prev, cur) {
    return prev + cur.Gain;
  }, 0);

  var soldTotal = sellstocks.reduce(function (prev, cur) {
    return prev + cur.BoughtPrice * cur.Amount * 1000;
  }, 0);

  let BuyTotal = buystocks.reduce(function (prev, cur) {
    return prev + cur.BoughtPrice * cur.Amount * 1000;
  }, 0);

  var expectTotal = buystocks.reduce(function (prev, cur) {
    return (
      prev +
      ExpectedInterest(
        cur.BoughtPrice,
        currentstockprice[
          currentstockprice.findIndex((CRItem) => CRItem.sym === cur.MaCK)
        ]?.lastPrice,
        cur.Amount
      )[0]
    );
  }, 0);

  // console.log(BuyTotal);
  // console.log(soldTotal);
  // let data = stocks
  //   .filter((item) => item.IsSold === false)
  //   .map(({ MaCK, SoldPrice, BoughtPrice, Amount }) => ({
  //     MaCK,
  //     SoldPrice,
  //     BoughtPrice,
  //     Amount,
  //   }));
  // console.log("CK chua ban", data);
  //console.log(sellstocks);
  // End load data

  const addstockclick = (e) => {
    e.preventDefault();
    db.collection("Stocks").add({
      MaCK: document.getElementById("StockCodeID").value.toUpperCase(),
      SoldPrice: 0,
      BoughtPrice: parseFloat(document.getElementById("BuyPrice").value),
      IsSold: false,
      Amount: parseInt(document.getElementById("StockAmount").value),
      Gain: 0,
      Percent: 0,
      DayBought: getCurrentDate()[0],
      MonthBought: getCurrentDate()[1],
      YearBought: getCurrentDate()[2],
      DaySold: 0,
      MonthSold: 0,
      YearSold: 0,
    });
    // console.log(document.getElementById("StockCodeID").value);
    // console.log(document.getElementById("StockAmount").value);
    // console.log(document.getElementById("BuyPrice").value);
    // console.log(stockrecentbuy);

    // console.log("Add Stock Clicked !!!");
  };

  function showboughtClick() {
    showbought ? setshowbought(false) : setshowbought(true);
    // setshowbought
    // setChecked((prev) => !prev);
  }

  // const soldstockclick = (e, mack, khoiluong, giamua) => {
  //   e.preventDefault();
  //   // db.collection("Stocks").onSnapshot((snapshot) => {
  //   //   setStocks(snapshot.docs.map((doc) => doc.data()));
  //   // }
  //   const cityRef = db.collection("Stocks").where();
  //   const doc = cityRef.get();
  //   if (!doc.exists) {
  //     console.log("No such document!");
  //   } else {
  //     console.log("Document data:", doc.data());
  //   }
  //   // console.log(db);
  // };

  function ExpectedInterest(buyprice, sellprice, Amount) {
    let expectedprofit =
      (parseFloat(sellprice) * 1000 - parseFloat(buyprice) * 1000) * Amount -
      (parseFloat(buyprice) + parseFloat(sellprice)) * Amount * 2 -
      parseFloat(sellprice) * Amount;

    let expectedpercent =
      (expectedprofit / (parseFloat(buyprice) * 10 * Amount)).toFixed(2) + "%";
    return [expectedprofit, expectedpercent];
  }
  // console.log(stocks);

  const ShowBuyStock = (items, buysell) =>
    items &&
    items.map((item, index) => (
      <div className="stocks" key={index}>
        <div>
          {/*Tooltip bought date*/}
          {buysell ? (
            <LightTooltip title={item.DayBought + "/" + item.MonthBought}>
              <div className="mack">{item.MaCK}</div>
            </LightTooltip>
          ) : (
            <LightTooltip title={item.DaySold + "/" + item.MonthSold}>
              <div className="mack">{item.MaCK}</div>
            </LightTooltip>
          )}
        </div>
        <div className="buyprice">{item.BoughtPrice}</div>
        <div className="sell">
          {item.IsSold
            ? item.SoldPrice
            : currentstockprice[
                currentstockprice.findIndex(
                  (CRItem) => CRItem.sym === item.MaCK
                )
              ]?.lastPrice}
        </div>
        <div className="Amount">
          {item.Amount.toLocaleString("en-US", {
            style: "decimal",
            currency: "USD",
          })}
        </div>
        <div className="lailo">
          {item.IsSold
            ? item.Gain.toLocaleString("en-US", {
                style: "decimal",
                currency: "USD",
              })
            : // ExpectedInterest(
              //   item.BoughtPrice,
              //   item.SoldPrice,
              //   item.Amount
              // )[0].toLocaleString("en-US", {
              //   style: "decimal",
              //   currency: "USD",
              // })
              ExpectedInterest(
                item.BoughtPrice,
                currentstockprice[
                  currentstockprice.findIndex(
                    (CRItem) => CRItem.sym === item.MaCK
                  )
                ]?.lastPrice,
                item.Amount
              )[0].toLocaleString("en-US", {
                style: "decimal",
                currency: "USD",
              })}
        </div>
        <div className="tyle">
          {item.IsSold
            ? item.Percent.toLocaleString("en-US", {
                style: "decimal",
                currency: "USD",
              })
            : ExpectedInterest(
                item.BoughtPrice,
                currentstockprice[
                  currentstockprice.findIndex(
                    (CRItem) => CRItem.sym === item.MaCK
                  )
                ]?.lastPrice,
                item.Amount
              )[1].toLocaleString("en-US", {
                style: "decimal",
                currency: "USD",
              })}
        </div>
        {/* <div>
          {ExpectedInterest(item.BoughtPrice, item.SoldPrice, item.Amount)[0]}
        </div> */}

        {item.IsSold ? (
          <div className="datesold" style={{ textAlign: "right !importance" }}>
            {item.DaySold + "/" + item.MonthSold}
          </div>
        ) : (
          <div className="sellbutton">
            <SellDialog stockitem={item} />
          </div>
        )}
      </div>
      // console.log(random(5)),
    ));

  return (
    <div className="buysell">
      <div className="addstockform">
        <form>
          <div className="stockadd">
            {/*prettier-ignore*/}
            {/*<input className="form-control form-control-sm" type="text" placeholder=".form-control-sm" aria-label=".form-control-sm example" />*/}
            <div>
              <TextField
                id="StockCodeID"
                label="Stock Code"
                style={{ marginTop: 5 }}
                placeholder="0"
                // margin="dense"
                variant="outlined"
                size="small"
                // value={stockrecentbuy.MaCK}
                onChange={(e) => {
                  // stockrecentbuy.MaCK = e.target.value.toUpperCase();
                  // e.target.value = stockrecentbuy.MaCK;
                  // console.log(stockrecentbuy);
                  e.target.value = e.target.value.toUpperCase();
                  // console.log(document.getElementById("StockCodeID").value);
                }}
              />
            </div>
            <div>
              <TextField
                id="StockAmount"
                label="Volume"
                style={{ marginTop: 5 }}
                placeholder="0"
                // margin="normal"
                variant="outlined"
                size="small"
                // value={stockrecentbuy.Amount}
                onChange={(e) => {
                  // stockrecentbuy.Amount = parseInt(e.target.value);
                  // console.log(stockrecentbuy);
                  // console.log(document.getElementById("StockAmount").value);
                }}
              />
            </div>
            <div>
              <TextField
                id="BuyPrice"
                label="Purchase Price"
                style={{ marginTop: 5 }}
                placeholder="0"
                // margin="normal"
                size="small"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                variant="outlined"
                // value={stockrecentbuy.BoughtPrice}
                onChange={(e) => {
                  // stockrecentbuy.BoughtPrice = parseFloat(e.target.value);
                  // console.log(stockrecentbuy);
                  // console.log(document.getElementById("BuyPrice").value);
                }}
              />
            </div>

            {/* <input
              // value=""
              onChange={(e) => {
                stockrecentbuy.MaCK = e.target.value.toUpperCase();
                e.target.value = stockrecentbuy.MaCK;
                console.log(stockrecentbuy);
              }}
              className="profit__Input"
              placeholder={"0"}
            /> */}
          </div>
          <Button
            variant="outlined"
            style={{ marginTop: 5, fontSize: "12px" }}
            size="small"
            onClick={addstockclick}
          >
            Add Stock
          </Button>
          {/* <button className="addstock" onClick={addstockclick}>
            Add Stock
          </button> */}
        </form>
      </div>
      <div className="buysell__title">
        <h2>Purchased Stocks</h2>
        {ShowBuyStock(buystocks, true)}
      </div>
      <div className="total">
        <div className="totalitemleft">
          {expectTotal.toLocaleString("en-US", {
            style: "decimal",
            currency: "USD",
          })}
        </div>
        <div className="totalitemright">
          {BuyTotal.toLocaleString("en-US", {
            style: "decimal",
            currency: "USD",
          })}
        </div>
        <div className="totalpercent">
          {((expectTotal * 100) / BuyTotal).toFixed(2) + "%"}
        </div>
      </div>

      <div className="buysell__title">
        <div className="showbought">
          <h2>Sold Stocks</h2>
          <div className="showlable">
            {/*prettier-ignore*/}
            <FormControlLabel control={<Switch checked={showbought} onChange={showboughtClick} inputProps={{ "aria-label": "secondary checkbox" }} color="primary" />}/>
          </div>
          {/* <div className="minusstock1" onClick={showboughtClick}></div> */}
        </div>

        {showbought ? ShowBuyStock(sellstocks, false) : null}
        <div style={{ display: "flex" }}>
          {/*<div className="total" style={{ width: "150px" }}>*/}
          <div className="totalitemleft">
            {GainTotal.toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          {/*<div className="total" style={{ width: "150px" }}>*/}
          <div className="totalitemright">
            {soldTotal.toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          {/*<div className="total">*/}
          <div className="totalpercent">
            {((GainTotal * 100) / soldTotal).toFixed(2) + "%"}
          </div>
        </div>

        {/*prettier-ignore*/}
        <div style={{  marginTop: 10,}}>
          <TextField
            id="BuyPriceTemp"
            label="Purchase Price"
            style={{ marginTop: 5, width: 130 }}
            placeholder="0"
            // margin="normal"
            size="small"
            // InputLabelProps={{
            //   shrink: true,
            // }}
            variant="outlined"
            // value={stockrecentbuy.BoughtPrice}
            onChange={(e) => {
              let tempvalue = { ...ratiotemp };
              tempvalue.buytemp = parseFloat(e.target.value);

              // console.log(tempvalue);
              setRatiotemp(tempvalue);
            }}
          />
          <TextField
            id="SoldPriceTemp"
            label="Sale Price"
            style={{ marginTop: 5, width: 130 }}
            placeholder="0"
            // margin="normal"
            size="small"
            // InputLabelProps={{
            //   shrink: true,
            // }}
            variant="outlined"
            // value={stockrecentbuy.BoughtPrice}
            onChange={(e) => {
              let tempvalue = { ...ratiotemp };
              tempvalue.soldtemp = parseFloat(e.target.value);

              console.log(tempvalue);
              setRatiotemp(tempvalue);
            }}
          />
          <TextField
            disabled
            id="RatioTemp"
            label=""
            style={{ marginTop: 5, width: 90 }}
            // placeholder={{ratiopercent}!=='NaN' ? {ratiopercent} : 0}
            placeholder={ratiopercent}
            // placeholder={ratiopercent != NaN ? "1" : "0"}
            // margin="normal"
            size="small"
            // InputLabelProps={{
            //   shrink: true,
            // }}
            variant="outlined"
            // value={stockrecentbuy.BoughtPrice}
            onChange={(e) => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default BuySell;
