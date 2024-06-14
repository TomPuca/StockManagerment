import React, { useState, useEffect } from "react";
import "./BuySell.css";
import "./firebase";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import db from "./firebase";
import TextField from "@material-ui/core/TextField";
import { useStateValue } from "../StateProvider";
import { getCurrentDate } from "./Functions";
import SellDialog from "./SellDialog";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

// prettier-ignore
function BuySell() {
  const [stocks, setStocks] = useState([]);
  const [buystocks, setBuyStocks] = useState([]);
  const [sellstocks, setSellStocks] = useState([]);
  const [showbought, setShowBought] = useState(false);
  const [{ currentstockprice }] = useStateValue();
  const [ratiopercent, setratiopercent] = useState("0");
  const [ratiotemp, setRatiotemp] = useState({ buytemp: 0, soldtemp: 0 });

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

  useEffect(() => {
    const fetchData = async () => {
      let now = new Date();
      let NowYear = now.getFullYear();
      db.collection("Stocks" + NowYear)
        .orderBy("MonthSold", "desc")
        .orderBy("DaySold", "desc")
        .onSnapshot((snapshot) => {
          setStocks(snapshot.docs.map((doc) => doc.data()));
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const data = stocks.filter((item) => !item.IsSold);
    setBuyStocks(data.sort((a, b) => a.MaCK.localeCompare(b.MaCK)));
    setSellStocks(stocks.filter((item) => item.IsSold));
  }, [stocks]);

  const GainTotal = sellstocks.reduce((prev, cur) => prev + cur.Gain, 0);
  const soldTotal = sellstocks.reduce((prev, cur) => prev + cur.BoughtPrice * cur.Amount * 1000, 0);
  const BuyTotal = buystocks.reduce((prev, cur) => prev + cur.BoughtPrice * cur.Amount * 1000, 0);

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

  const addstockclick = (e) => {
    e.preventDefault();
    let now = new Date();
    let NowYear = now.getFullYear();
    db.collection("Stocks" + NowYear).add({
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
  };

  function showboughtClick() {
    setShowBought(!showbought);
  }

  function ExpectedInterest(buyprice, sellprice, Amount) {
    let expectedprofit =
      (parseFloat(sellprice) * 1000 - parseFloat(buyprice) * 1000) * Amount -
      (parseFloat(buyprice) + parseFloat(sellprice)) * Amount * 2 -
      parseFloat(sellprice) * Amount;

    let expectedpercent =
      (expectedprofit / (parseFloat(buyprice) * 10 * Amount)).toFixed(2) + "%";

    return [
      expectedprofit,
      expectedpercent === "NaN%" ? "0%" : expectedpercent,
    ];
  }
  // console.log(stocks);

  const ShowBuyStock = (items, buysell) => (
      items && items.map((item, index) => {
        const currentPrice = currentstockprice.find((CRItem) => CRItem.sym === item.MaCK)?.lastPrice || 0;
        const expectedInterest = ExpectedInterest(item.BoughtPrice, currentPrice, item.Amount);

        return (
            <div className="stocks" key={index}>
              <div>
                <LightTooltip title={buysell ? `${item.DayBought}/${item.MonthBought}` : `${item.DaySold}/${item.MonthSold}`}>
                  <div className="mack">{item.MaCK}</div>
                </LightTooltip>
              </div>
              <div className="buyprice">{item.BoughtPrice}</div>
              <div className="sell">{item.IsSold ? item.SoldPrice : currentPrice}</div>
              <div className="Amount">{item.Amount.toLocaleString("en-US", { style: "decimal", currency: "USD" })}</div>
              <div className="lailo">{item.IsSold ? item.Gain.toLocaleString("en-US", { style: "decimal", currency: "USD" }) : expectedInterest[0].toLocaleString("en-US", { style: "decimal", currency: "USD" })}</div>
              <div className="tyle">{item.IsSold ? item.Percent.toLocaleString("en-US", { style: "decimal", currency: "USD" }) : expectedInterest[1]}</div>
              {item.IsSold ? (
                  <div className="datesold" style={{ textAlign: "right !importance" }}>
                    {item.DaySold}/{item.MonthSold}
                  </div>
              ) : (
                  <div className="sellbutton">
                    <SellDialog stockitem={item} />
                  </div>
              )}
            </div>
        );
      })
  );

  return (
    <div className="buysell">
      <div className="addstockform">
        <form>
          <div className="stockadd">
            <div>
            <TextField
                id="StockCodeID"
                label="Stock Code"
                style={{ marginTop: 5 }}
                placeholder="0"
                variant="outlined"
                size="small"
                onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
            />
            </div>
            <div>
            <TextField
                id="StockAmount"
                label="Volume"
                style={{ marginTop: 5 }}
                placeholder="0"
                variant="outlined"
                size="small"
            />
            </div>
            <div>
            <TextField
                id="BuyPrice"
                label="Purchase Price"
                style={{ marginTop: 5 }}
                placeholder="0"
                size="small"
                variant="outlined"
            />
            </div>
          </div>
          <Button
              variant="outlined"
              style={{ marginTop: 5, fontSize: "12px" }}
              size="small"
              onClick={addstockclick}
          >
            Add Stock
          </Button>
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

        {/*{showbought ? ShowBuyStock(sellstocks, false) : null}*/}
        {showbought && ShowBuyStock(sellstocks, false)}
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
            onChange={(e) =>
                setRatiotemp({ ...ratiotemp, buytemp: parseFloat(e.target.value) })
            }
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
            onChange={(e) =>
                setRatiotemp({ ...ratiotemp, soldtemp: parseFloat(e.target.value) })
            }
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
