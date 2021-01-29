import React, { useState, useEffect } from "react";
import "./Utils.css";
import db, { StockRef } from "./firebase";
import FormDialog from "./FormDialog";
import Button from "@material-ui/core/Button";
import { getCurrentDate } from "./DateMonthYear";
// import writeJsonFile from "../node_modulewrite-json-file";
// import data from "../Data/Data2020.json"

function Utils() {
  // const [userDetails, setUserDetails] = useState("");
  // const [idstockchange, setidstockchange] = useState();
  // const StockRef = db.collection("Stocks");
  // const writeJsonFile = require("write-json-file");
  // const writeJsonFile = require("bit/global/write-json-file");
  const getData = () => {
    fetch("Data2020.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
      });
  };

  function UpdateDataTime() {
    StockRef.onSnapshot((snapshot) => {
      // snapshot.docs.map((doc) => UpdateDataTimeByID(doc.id));
    });
  }

  function UpdateGain() {
    StockRef.onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        // console.log("Document ID:", doc.id);
        UpdateGainByID(doc.id);
      });
    });
  }
  async function UpdateGainByID(id) {
    // console.log("Props ID:", id);
    let StockQueries = StockRef.doc(id);
    await StockQueries.get().then(async (snapshot) => {
      StockQueries.update({
        Gain: ExpectedInterest(
          snapshot.data().BoughtPrice,
          snapshot.data().SoldPrice,
          snapshot.data().Amount
        )[0],
        Percent: ExpectedInterest(
          snapshot.data().BoughtPrice,
          snapshot.data().SoldPrice,
          snapshot.data().Amount
        )[1],
      });

      await console.log("Queries data:", snapshot.data());
      await console.log(
        id,
        ExpectedInterest(
          snapshot.data().BoughtPrice,
          snapshot.data().SoldPrice,
          snapshot.data().Amount
        )[0],
        ExpectedInterest(
          snapshot.data().BoughtPrice,
          snapshot.data().SoldPrice,
          snapshot.data().Amount
        )[1]
      );
    });
  }
  function UpdateDataTimeByID(id) {
    var StockQueries = StockRef.doc(id);

    StockQueries.get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          StockQueries.update({
            MonthBought: 11,
            MonthSold: 12,
            YearBought: 2020,
            YearSold: 2020,
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });

    // first : get ID of stock data
    // const StockQueries = StockRef.where("MaCK", "==", "TCM")
    //   .where("IsSold", "==", false)
    //   .where("Gain", "==", 9000);
    // console.log(StockQueries.get);
    // StockQueries.onSnapshot((snapshot) => {
    //   snapshot.docs.map((doc) => {
    //     setidstockchange(doc.id);
    //     console.log(doc.id);

    //   });
    // });
  }

  function Backupstockclick() {
    console.log("Backup Processing !!!");
    db.collection("Stock2020").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        // console.log("Document ID:", doc.id);
        // const response = JSON.parse(event.data);
        console.log(JSON.stringify(doc.data()));
      });
    });
  }

  function Loadstockclick() {
    console.log("Start processing load file");
    getData();
  }

  function AddStockToCollection() {
    console.log("Start Add Stock from loaded file");
    let StockQuries = db.collection("Stock2020");
    // let StockQuries = db.collection("Stocks");
    fetch("Data2020.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        myJson.map((item) => {
          StockQuries.add({
            MaCK: item.MaCK,
            SoldPrice: item.SoldPrice,
            BoughtPrice: item.BoughtPrice,
            IsSold: item.IsSold,
            Gain: item.Gain,
            Amount: item.Amount,
            Percent: item.Percent,
            DayBought: item.DayBought ? item.DayBought : 0,
            MonthBought: item.MonthBought ? item.MonthBought : 0,
            YearBought: item.YearBought ? item.YearBought : 0,
            DaySold: item.DaySold ? item.DaySold : 0,
            MonthSold: item.MonthSold ? item.MonthSold : 0,
            YearSold: item.YearSold ? item.YearSold : 0,
          });
          console.log(item.MaCK);
        });
      });
  }

  function ExpectedInterest(buyprice, sellprice, Gain) {
    let expectedprofit =
      (parseFloat(sellprice) * 1000 - parseFloat(buyprice) * 1000) * Gain -
      (parseFloat(buyprice) + parseFloat(sellprice)) * Gain * 2 -
      parseFloat(sellprice) * Gain;

    let expectedpercent =
      (expectedprofit / (parseFloat(buyprice) * 10 * Gain)).toFixed(2) + "%";
    return [expectedprofit, expectedpercent];
  }

  return (
    <div className="historyhomeframe">
      <h1>Sell Sotck ID : </h1>
      {/*{UpdateGain()}*/}
      <FormDialog StockCodeID={"1"} />
      {/*prettier-ignore*/}
      <Button  variant="outlined" style={{ marginTop: 5, fontSize: "12px" }} size="small" onClick={AddStockToCollection}>
        Update Gain For All
      </Button>
      {/*prettier-ignore*/}
      <Button  variant="outlined" style={{ marginTop: 5, fontSize: "12px" }} size="small" onClick={AddStockToCollection}>
        Backup Stock To Json
      </Button>
      {/*prettier-ignore*/}
      <Button  variant="outlined" style={{ marginTop: 5, fontSize: "12px" }} size="small" onClick={AddStockToCollection}>
        Load Stock Data File
      </Button>
      {/*prettier-ignore*/}
      <Button  variant="outlined" style={{ marginTop: 5, fontSize: "12px" }} size="small" onClick={AddStockToCollection}>
        Add Stock from Data File
      </Button>
    </div>
  );
}

export default Utils;
