import React, { useEffect, useState } from "react";
import db, { StockRef } from "./firebase";
import { getCurrentDate } from "./DateMonthYear";
import TransactionItem from "./TransactionItem";

function UpdateGain() {
  const [stocks, setStocks] = useState([]);

  // useEffect(() => {
  //   db.collection("Stocks")
  //     .orderBy("IsSold")
  //     .onSnapshot((snapshot) => {
  //       setStocks(snapshot.docs.map((doc) => doc.data()));
  //     });
  // }, []);

  UpdateStockGain();

  function UpdateStockGain() {
    StockRef.onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => UpdateStockByID(doc.id));
    });
  }

  function UpdateStockByID(id, stockSoldPrice) {
    let StockQueries = StockRef.doc(id);
    // console.log(getCurrentDate()[0]);
    StockQueries.get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          // StockQueries.update({
          //   SoldPrice: stockSoldPrice,
          //   DaySold: getCurrentDate()[0],
          //   MonthSold: getCurrentDate()[1],
          //   YearSold: getCurrentDate()[2],
          //   IsSold: true,
          // });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  function UpdateDateStockByID(id, stockSoldPrice) {
    let StockQueries = StockRef.doc(id);
    // console.log(getCurrentDate()[0]);
    StockQueries.get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          // StockQueries.update({
          //   SoldPrice: stockSoldPrice,
          //   DaySold: getCurrentDate()[0],
          //   MonthSold: getCurrentDate()[1],
          //   YearSold: getCurrentDate()[2],
          //   IsSold: true,
          // });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  function ExpectedInterest(buyprice, sellprice, Amount) {
    let expectedprofit =
      (parseFloat(sellprice) * 1000 - parseFloat(buyprice) * 1000) * Amount -
      (parseFloat(buyprice) + parseFloat(sellprice)) * Amount * 2 -
      parseFloat(sellprice) * Amount;

    let expectedpercent =
      (expectedprofit / (parseFloat(buyprice) * 10 * Amount)).toFixed(2) + "%";
    return [expectedprofit, expectedpercent];
  }

  return <div></div>;
}

export default UpdateGain;
