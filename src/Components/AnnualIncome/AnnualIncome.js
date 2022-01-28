import React, { useEffect, useState } from "react";
import "./AnnualIncome.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import db from "../firebase";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { strimstring } from "../Functions";
import ListComponent from "../ListComponent";
import Chart from "../Chart/BarChart";

function AnnualIncome() {
  const [year, setYear] = useState("Income");
  const [dateincome, setDateIncome] = React.useState(new Date());
  const [TotalIncomes, setTotalIncomes] = useState([]);
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

  // Do at load page
  useEffect(() => {
    //  Get data from Firebase
    db.collection(year)
      // .orderBy("Day", "asce")
      // .orderBy("Month", "asce")
      .onSnapshot((snapshot) => {
        setTotalIncomes(snapshot.docs.map((doc) => doc.data()));
      });
    // console.log(year);

    //  Load Data from Backup File
    // LoadDataFromFile();
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
    console.log(dateincome.getMonth());
  };

  function IncomePerMonth() {
    return (
      <div className="Month_all">
        <div className="Month">
          <div className="Month_text">January :</div>
          <div className="Month_value">
            {IncomeTotalPerMonth(1).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">February :</div>
          <div className="Month_value">
            {IncomeTotalPerMonth(2).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">March :</div>
          <div className="Month_value">
            {IncomeTotalPerMonth(3).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">April :</div>
          <div className="Month_value">
            {IncomeTotalPerMonth(4).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">May :</div>
          <div className="Month_value">
            {IncomeTotalPerMonth(5).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">June :</div>
          <div className="Month_value">
            {IncomeTotalPerMonth(6).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">July :</div>
          <div className="Month_value">
            {IncomeTotalPerMonth(7).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">August :</div>
          <div className="Month_value">
            {IncomeTotalPerMonth(8).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">September :</div>
          <div className="Month_value">
            {IncomeTotalPerMonth(9).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">October :</div>
          <div className="Month_value">
            {IncomeTotalPerMonth(10).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">November :</div>
          <div className="Month_value">
            {IncomeTotalPerMonth(11).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">December :</div>
          <div className="Month_value">
            {IncomeTotalPerMonth(12).toLocaleString("en-US", {
              style: "decimal",
              currency: "USD",
            })}
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
          <button className="YearButton" onClick={() => setYear("Stocks")}>
            Current
          </button>
        </div>
        <div>
          <button className="YearButton" onClick={() => setYear("Stocks2021")}>
            2021
          </button>
        </div>
      </div>
      {/*Total*/}
      {/*prettier-ignore*/}
      <div style={{ color: "blue", display: "flex", width: "700px" ,fontWeight : "bold", marginLeft:"10px" , marginTop : "10px" }}>
        <div>Total Income: </div>
        {/*prettier-ignore*/}
        <div style={{marginLeft:"10px",marginRight : "10px"}}>{TotalIncome.toLocaleString("en-US", {style: "decimal",currency: "USD",})}</div>
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
          Total={TotalIncome}
          MainLabel="Total Income"
          SubLabel="Income Per Month"
        />
      </div>
      {/*  List Income per month*/}
      <div className="realtime">{IncomePerMonth()}</div>
    </div>
  );
}

export default AnnualIncome;
