import React, { useEffect, useState } from "react";
import "./AnnualIncome.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CurrencyFormat from "react-currency-format";
import db from "../firebase";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Chart from "../Chart/BarChart";
import ListItemIncome from "./ListItemIncome";
import { VNCurrency } from "../Functions";
import {Stack} from "@mui/material";


function AnnualIncome() {
  const [year, setYear] = useState("Income");
  const [dateincome, setDateIncome] = React.useState(new Date());
  const [TotalIncomes, setTotalIncomes] = useState([]);
  const [BeforeTotalIncomes, setBeforeTotalIncomes] = useState([]);
  const [IsAddIncome, setIsAddIncome] = useState(false);
  // let TotalIncome = 10000000;

  let TotalIncome = TotalIncomes.reduce(function (prev, cur) {
    return prev + cur.Income;
  }, 0);

  let BeforeTotalIncome = BeforeTotalIncomes.reduce(function (prev, cur) {
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
        <div>
          <ListItemIncome IncomeItem={item} />
        </div>
      </div>
    ));

  // Do at load page and each time year change
  useEffect(() => {
    //  Get data from Firebase
    let now = new Date();
    let BeforeYear = now.getFullYear() - 1;
    if (year === "Income") {
      db.collection("Income" + now.getFullYear())
        .orderBy("Month", "asc")
        .orderBy("Day", "asc")
        .onSnapshot((snapshot) => {
          setTotalIncomes(snapshot.docs.map((doc) => doc.data()));
        });
    } else {
      db.collection(year)
        .orderBy("Month", "asc")
        .orderBy("Day", "asc")
        .onSnapshot((snapshot) => {
          setTotalIncomes(snapshot.docs.map((doc) => doc.data()));
        });
      BeforeYear = parseInt(year.substr(6, 4)) - 1;
    }
    db.collection("Income" + BeforeYear)
      .orderBy("Month", "asc")
      .orderBy("Day", "asc")
      .onSnapshot((snapshot) => {
        setBeforeTotalIncomes(snapshot.docs.map((doc) => doc.data()));
      });
  }, [year]);

  useEffect(() => {
    const now = new Date();
    const BeforeYear = now.getFullYear() - 1;
    // console.log(BeforeYear);
    // console.log("Income" + BeforeYear);
    setYear("Income" + now.getFullYear());
    db.collection("Income" + BeforeYear)
      .orderBy("Month", "asc")
      .orderBy("Day", "asc")
      .onSnapshot((snapshot) => {
        setBeforeTotalIncomes(snapshot.docs.map((doc) => doc.data()));
      });
    // console.log(BeforeTotalIncomes);
  }, []);

  const datehandleChange = (newValue) => {
    setDateIncome(newValue);
    // console.log(dateincome.getFullYear());
  };

  const addincomeclick = (e) => {
    e.preventDefault();
    // console.log(
    //   parseFloat(document.getElementById("IncomeID").value.replace(",", "."))
    // );
    // console.log(year);
    db.collection(year).add({
      Income: parseFloat(
        document.getElementById("IncomeID").value.replaceAll(",", "")
      ),
      Day: dateincome.getDate(),
      Month: dateincome.getMonth() + 1,
      Year: dateincome.getFullYear(),
    });
    setIsAddIncome(true);
    // const timeout = setTimeout(() => {
    //   setIsAddIncome(false);
    //   console.log(IsAddIncome);
    // }, 3000);
    // console.log(dateincome.getMonth());
  };

  function YearButton(year) {
    // console.log("Income" + year);
    return (
      <div>
        <button className="YearButton" onClick={() => setYear("Income" + year)}>
          {year}
        </button>
      </div>
    );
  }

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
        {YearButton("2024")}
        {YearButton("2023")}
        {YearButton("2022")}
      </div>
      {/*prettier-ignore*/}
      <div style={{ color: "blue", display: "flex", width: "700px" ,fontWeight : "bold", marginLeft:"10px" , marginTop : "10px" }}>
        <div>Total Income: </div>
        {/*prettier-ignore*/}
        <div style={{marginLeft:"10px",marginRight : "10px"}}>{VNCurrency(TotalIncome)} ({VNCurrency(TotalIncome/12)})</div>
        <div style={{marginLeft:"10px",marginRight : "10px"}}>({VNCurrency(TotalIncome - BeforeTotalIncome ) })</div>
      {/*    {
            parseInt(TotalIncome/12).toLocaleString("en-US", {style: "decimal",currency: "USD",})}*/}
      </div>
      {/*  Input Area*/}
      <div className="input-container">
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DatePicker
                label="Date Income"
                inputFormat="MM/dd/yyyy"

                value={dateincome}
                onChange={datehandleChange}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>

        <CurrencyFormat
          id="IncomeID"
          label="Income"
          customInput={TextField}
          thousandSeparator
          prefix=""
          style={{ marginTop: 10, fontSize: "12px", marginLeft: 10 }}
          // decimalScale={0}
          variant="outlined"
          size="small"
          // onChange={handleNewAmount}
        />
        <Button
          variant="outlined"
          style={{ marginTop: 10, fontSize: "12px", marginLeft: 10 }}
          size="small"
          onClick={addincomeclick}
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
      <div className="anualIncomeCard">{ShowIncome(TotalIncomes)}</div>
      {/*prettier-ignore*/}
      <div  className= {IsAddIncome ? "alert alert-success connection-alert connected-alert text-center fadeIn":  "fadeOut"}>
            <strong>Added!</strong>
        </div>
    </div>
  );
}

export default AnnualIncome;
