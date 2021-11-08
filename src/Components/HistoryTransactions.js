import React, { useEffect, useState } from "react";
import "./HistoryTransactions.css";
import TransactionItem from "./TransactionItem";
import db, { StockRef } from "./firebase";
import FormDialog from "./FormDialog";
import Chart from "./Chart/BarChart";
// import "./CSS/bootstrap.min.css";

function HistoryTransactions() {
  const [stocks, setStocks] = useState([]);
  // const tempdata = [];
  // const [DataState, setDataState] = useState(false);
  // const stocks = [];
  useEffect(() => {
    //  Get data from Firebase
    db.collection("Stocks")
      .orderBy("Percent", "desc")
      .onSnapshot((snapshot) => {
        setStocks(snapshot.docs.map((doc) => doc.data()));
      });
    //  Load Data from Backup File
    // LoadDataFromFile();
  }, []);

  async function LoadDataFromFile() {
    console.log("Start Add Stock from loaded file");
    await fetch("Data2020.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setStocks(myJson);
      });
    // console.log(stocks);
    // for (let i = 1; i < 13; i++) {
    //   let GainTotal = stocks.reduce(function (prev, cur) {
    //     if ((cur.MonthSold === i) & (cur.SoldPrice > 0)) {
    //       return prev + cur.Gain;
    //     } else {
    //       return prev;
    //     }
    //   }, 0);
    //   tempdata.push(GainTotal);
    // }
    // console.log("Temp Data:", tempdata);
    // setDataState(true);
  }
  function GainTotalPerMonth(i) {
    let GainTotal = stocks.reduce(function (prev, cur) {
      if ((cur.MonthSold === i) & (cur.SoldPrice > 0)) {
        return prev + cur.Gain;
      } else {
        return prev;
      }
    }, 0);
    return parseInt(GainTotal);
  }
  let GainTotal = stocks.reduce(function (prev, cur) {
    // console.log(cur.Gain);
    if (cur.SoldPrice > 0) {
      return prev + cur.Gain;
    } else {
      return prev;
    }
  }, 0);

  const ShowBuyStock = (items) =>
    items &&
    items.map((item, index) => (
      <div key={index}>
        <TransactionItem stockitem={item} />
      </div>
    ));

  return (
    <div>
      <div className="Back_Main">
        <a href="../">Main</a>
      </div>

      {/*prettier-ignore*/}
      <div style={{ color: "blue", display: "flex",  }}>
        <div className="Transactions">Transactions: </div>
        {/*prettier-ignore*/}
        <div>{GainTotal.toLocaleString("en-US", {style: "decimal",currency: "USD",})}</div>
      </div>
      <div>
        <Chart
          data={[
            GainTotalPerMonth(1),
            GainTotalPerMonth(2),
            GainTotalPerMonth(3),
            GainTotalPerMonth(4),
            GainTotalPerMonth(5),
            GainTotalPerMonth(6),
            GainTotalPerMonth(7),
            GainTotalPerMonth(8),
            GainTotalPerMonth(9),
            GainTotalPerMonth(10),
            GainTotalPerMonth(11),
            GainTotalPerMonth(12),
          ]}
          Total={GainTotal}
        />
      </div>
      {ShowBuyStock(stocks)}
    </div>
  );
}

export default HistoryTransactions;
