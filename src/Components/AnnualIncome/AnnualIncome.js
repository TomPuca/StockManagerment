import React, { useEffect, useRef, useState } from "react";
import "./AnnualIncome.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import db from "../firebase";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Chart from "../Chart/BarChart";
import ListItemIncome from "./ListItemIncome";
import { VNCurrency } from "../Functions";

function AnnualIncome() {
  const [year, setYear] = useState("Income");
  const [dateincome, setDateIncome] = React.useState(new Date());
  const [TotalIncomes, setTotalIncomes] = useState([]);
  const [IsAddIncome, setIsAddIncome] = useState(false);
  // let TotalIncome = 10000000;

  let TotalIncome = TotalIncomes.reduce(function (prev, cur) {
    return prev + cur.Income;
  }, 0);

  function IncomeTotalPerMonth(i) {
    let GainTotal = TotalIncomes.reduce(function (prev, cur) {
      if (cur.Month === i) {
        return prev + cur.Income;
      } else {
        return prev;
      }
    }, 0);
    return parseInt(GainTotal);
  }

  const ShowIncome = (items) =>
    items &&
    items.map((item, index) => (
      <div key={index}>
        <ListItemIncome IncomeItem={item} />
      </div>
    ));

  // Do at load page
  useEffect(() => {
    // print(year);
    //  Get data from Firebase
    db.collection(year)
      .orderBy("Month", "asc")
      .orderBy("Day", "asc")
      .onSnapshot((snapshot) => {
        setTotalIncomes(snapshot.docs.map((doc) => doc.data()));
      });
    console.log(year);
  }, [year]);

  const datehandleChange = (newValue) => {
    setDateIncome(newValue);
    // console.log(dateincome.getFullYear());
  };

  const addstockclick = (e) => {
    e.preventDefault();
    db.collection("Income").add({
      Income: parseFloat(document.getElementById("IncomeID").value),
      Day: dateincome.getDate(),
      Month: dateincome.getMonth() + 1,
      Year: dateincome.getFullYear(),
    });
    setIsAddIncome(true);
    const timeout = setTimeout(() => {
      setIsAddIncome(false);
      console.log(IsAddIncome);
    }, 3000);
    // console.log(dateincome.getMonth());
  };

  function IncomePerMonth() {
    return (
      <div className="Month_all">
        <div className="Month">
          <div className="Month_text">January :</div>
          <div className="Month_value">
            {VNCurrency(IncomeTotalPerMonth(1))}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">February :</div>
          <div className="Month_value">
            {VNCurrency(IncomeTotalPerMonth(2))}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">March :</div>
          <div className="Month_value">
            {VNCurrency(IncomeTotalPerMonth(3))}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">April :</div>
          <div className="Month_value">
            {VNCurrency(IncomeTotalPerMonth(4))}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">May :</div>
          <div className="Month_value">
            {VNCurrency(IncomeTotalPerMonth(5))}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">June :</div>
          <div className="Month_value">
            {VNCurrency(IncomeTotalPerMonth(6))}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">July :</div>
          <div className="Month_value">
            {VNCurrency(IncomeTotalPerMonth(7))}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">August :</div>
          <div className="Month_value">
            {VNCurrency(IncomeTotalPerMonth(8))}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">September :</div>
          <div className="Month_value">
            {VNCurrency(IncomeTotalPerMonth(9))}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">October :</div>
          <div className="Month_value">
            {VNCurrency(IncomeTotalPerMonth(10))}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">November :</div>
          <div className="Month_value">
            {VNCurrency(IncomeTotalPerMonth(11))}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">December :</div>
          <div className="Month_value">
            {VNCurrency(IncomeTotalPerMonth(12))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ color: "blue", display: "flex", marginLeft: 10 }}>
        <Link to="/">
          <div>
            <span className="Header-cartCount">Main</span>
          </div>
        </Link>
        <div>
          <button className="YearButton" onClick={() => setYear("Income")}>
            Current
          </button>
        </div>
        <div>
          <button className="YearButton" onClick={() => setYear("Income2021")}>
            2021
          </button>
        </div>
      </div>
      {/*Total*/}
      {/*prettier-ignore*/}
      <div style={{ color: "blue", display: "flex", width: "700px" ,fontWeight : "bold", marginLeft:"10px" , marginTop : "10px" }}>
        <div>Total Income: </div>
        {/*prettier-ignore*/}
        <div style={{marginLeft:"10px",marginRight : "10px"}}>{VNCurrency(TotalIncome)} ({VNCurrency(TotalIncome/12)})</div>
      {/*    {
            parseInt(TotalIncome/12).toLocaleString("en-US", {style: "decimal",currency: "USD",})}*/}
      </div>
      {/*  Input Area*/}
      <div className="input-container">
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Date Income"
                inputFormat="MM/dd/yyyy"
                value={dateincome}
                onChange={datehandleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>
        <TextField
          id="IncomeID"
          label="Income"
          style={{ marginTop: 10, marginLeft: 10 }}
          placeholder="0"
          // margin="normal"
          size="small"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          variant="outlined"
          // value={stockrecentbuy.BoughtPrice}
          onChange={(e) => {
            const re = /^[0-9,.\b]+$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              // e.target.value = e.target.value.substr(0,e.target.value.length-1)
            } else {
              e.target.value = e.target.value.substr(
                0,
                e.target.value.length - 1
              );
            }
          }}
        />
        <Button
          variant="outlined"
          style={{ marginTop: 10, fontSize: "12px", marginLeft: 10 }}
          size="small"
          onClick={addstockclick}
        >
          Add Income
        </Button>
      </div>
      {/*Chart income per month*/}
      <div>
        <Chart
          data={[
            IncomeTotalPerMonth(1),
            IncomeTotalPerMonth(2),
            IncomeTotalPerMonth(3),
            IncomeTotalPerMonth(4),
            IncomeTotalPerMonth(5),
            IncomeTotalPerMonth(6),
            IncomeTotalPerMonth(7),
            IncomeTotalPerMonth(8),
            IncomeTotalPerMonth(9),
            IncomeTotalPerMonth(10),
            IncomeTotalPerMonth(11),
            IncomeTotalPerMonth(12),
          ]}
          // Total={TotalIncome}
          Total={TotalIncome / 12}
          MainLabel="Total Income"
          SubLabel="Income Per Month"
        />
      </div>
      {/*  List Income per month*/}
      <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
        {IncomePerMonth()}
      </div>
      {/*    List all Income*/}
      {ShowIncome(TotalIncomes)}
      {/*prettier-ignore*/}
      <div  className= {IsAddIncome ? "alert alert-success connection-alert connected-alert text-center fadeIn":  "fadeOut"}>
            <strong>Added!</strong>
        </div>
    </div>
  );
}

export default AnnualIncome;
