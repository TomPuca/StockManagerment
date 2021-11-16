import React, { useEffect, useState } from "react";
import "./HistoryTransactions.css";
import TransactionItem from "./TransactionItem";
import db from "./firebase";
import FormDialog from "./FormDialog";
import Chart from "./Chart/BarChart";
import { Link } from "react-router-dom";
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
      <Link to="/">
        <div>
          <span className="Header-cartCount">Main</span>
        </div>
      </Link>

      {/*prettier-ignore*/}
      <div style={{ color: "blue", display: "flex",width: "700px"  }}>
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

      <div className="Month_all">
        <div className="Month">
          <div className="Month_text">January :</div>
          <div className="Month_value">
            {GainTotalPerMonth(1).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">February :</div>
          <div className="Month_value">
            {GainTotalPerMonth(2).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">March :</div>
          <div className="Month_value">
            {GainTotalPerMonth(3).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">April :</div>
          <div className="Month_value">
            {GainTotalPerMonth(4).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">May :</div>
          <div className="Month_value">
            {GainTotalPerMonth(5).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">June :</div>
          <div className="Month_value">
            {GainTotalPerMonth(6).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">July :</div>
          <div className="Month_value">
            {GainTotalPerMonth(7).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">August :</div>
          <div className="Month_value">
            {GainTotalPerMonth(8).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">September :</div>
          <div className="Month_value">
            {GainTotalPerMonth(9).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">October :</div>
          <div className="Month_value">
            {GainTotalPerMonth(10).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">November :</div>
          <div className="Month_value">
            {GainTotalPerMonth(11).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">December :</div>
          <div className="Month_value">
            {GainTotalPerMonth(12).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
        </div>
      </div>

      {ShowBuyStock(stocks)}
    </div>
  );
}

export default HistoryTransactions;
