import React, { useEffect, useState } from "react";
import "./AnnuallOutcome.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CurrencyFormat from "react-currency-format";
import db from "../firebase";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Chart from "../Chart/BarChart";
import ListItemOutcome from "./ListItemOutcome";
import { VNCurrency } from "../Functions";

function AnnuallOutcome() {
  const [year, setYear] = useState("Outcome");
  const [dateOutcome, setDateOutcome] = React.useState(new Date());
  const [TotalOutcomes, setTotalOutcomes] = useState([]);
  const [BeforeTotalOutcomes, setBeforeTotalOutcomes] = useState([]);
  const [IsAddOutcome, setIsAddOutcome] = useState(false);
  // let TotalOutcome = 10000000;

  let TotalOutcome = TotalOutcomes.reduce(function (prev, cur) {
    return prev + cur.Outcome;
  }, 0);

  let BeforeTotalOutcome = BeforeTotalOutcomes.reduce(function (prev, cur) {
    return prev + cur.Outcome;
  }, 0);

  function OutcomeTotalPerMonth(i) {
    let GainTotal = TotalOutcomes.reduce(function (prev, cur) {
      if (cur.Month === i) {
        return prev + cur.Outcome;
      } else {
        return prev;
      }
    }, 0);
    return parseInt(GainTotal);
  }

  const ShowOutcome = (items) =>
    items &&
    items.map((item, index) => (
      <div key={index}>
        <div>
          <ListItemOutcome OutcomeItem={item} />
        </div>
      </div>
    ));

  // Do at load page and each time year change
  useEffect(() => {
    //  Get data from Firebase
    let now = new Date();
    let BeforeYear = now.getFullYear() - 1;
    if (year === "Outcome") {
      db.collection("Outcome" + now.getFullYear())
        .orderBy("Month", "asc")
        .orderBy("Day", "asc")
        .onSnapshot((snapshot) => {
          setTotalOutcomes(snapshot.docs.map((doc) => doc.data()));
        });
    } else {
      db.collection(year)
        .orderBy("Month", "asc")
        .orderBy("Day", "asc")
        .onSnapshot((snapshot) => {
          setTotalOutcomes(snapshot.docs.map((doc) => doc.data()));
        });
      BeforeYear = parseInt(year.substr(6, 4)) - 1;
    }
    db.collection("Outcome" + BeforeYear)
      .orderBy("Month", "asc")
      .orderBy("Day", "asc")
      .onSnapshot((snapshot) => {
        setBeforeTotalOutcomes(snapshot.docs.map((doc) => doc.data()));
      });
  }, [year]);

  useEffect(() => {
    const now = new Date();
    const BeforeYear = now.getFullYear() - 1;
    // console.log(BeforeYear);
    // console.log("Outcome" + BeforeYear);
    setYear("Outcome" + now.getFullYear());
    db.collection("Outcome" + BeforeYear)
      .orderBy("Month", "asc")
      .orderBy("Day", "asc")
      .onSnapshot((snapshot) => {
        setBeforeTotalOutcomes(snapshot.docs.map((doc) => doc.data()));
      });
    // console.log(BeforeTotalOutcomes);
  }, []);

  const datehandleChange = (newValue) => {
    setDateOutcome(newValue);
    // console.log(dateOutcome.getFullYear());
  };

  const addOutcomeclick = (e) => {
    e.preventDefault();
    // console.log(
    //   parseFloat(document.getElementById("OutcomeID").value.replace(",", "."))
    // );
    // console.log(year);
    db.collection(year).add({
      Outcome: parseFloat(
        document.getElementById("OutcomeID").value.replaceAll(",", "")
      ),
      Day: dateOutcome.getDate(),
      Month: dateOutcome.getMonth() + 1,
      Year: dateOutcome.getFullYear(),
    });
    setIsAddOutcome(true);
    // const timeout = setTimeout(() => {
    //   setIsAddOutcome(false);
    //   console.log(IsAddOutcome);
    // }, 3000);
    // console.log(dateOutcome.getMonth());
  };

  function YearButton(year) {
    // console.log("Outcome" + year);
    return (
      <div>
        <button className="YearButton" onClick={() => setYear("Outcome" + year)}>
          {year}
        </button>
      </div>
    );
  }

  function OutcomePerMonth() {
    return (
      <div className="Month_all">
        <div className="Month">
          <div className="Month_text">January :</div>
          <div className="Month_value">
            {VNCurrency(OutcomeTotalPerMonth(1))}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">February :</div>
          <div className="Month_value">
            {VNCurrency(OutcomeTotalPerMonth(2))}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">March :</div>
          <div className="Month_value">
            {VNCurrency(OutcomeTotalPerMonth(3))}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">April :</div>
          <div className="Month_value">
            {VNCurrency(OutcomeTotalPerMonth(4))}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">May :</div>
          <div className="Month_value">
            {VNCurrency(OutcomeTotalPerMonth(5))}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">June :</div>
          <div className="Month_value">
            {VNCurrency(OutcomeTotalPerMonth(6))}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">July :</div>
          <div className="Month_value">
            {VNCurrency(OutcomeTotalPerMonth(7))}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">August :</div>
          <div className="Month_value">
            {VNCurrency(OutcomeTotalPerMonth(8))}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">September :</div>
          <div className="Month_value">
            {VNCurrency(OutcomeTotalPerMonth(9))}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">October :</div>
          <div className="Month_value">
            {VNCurrency(OutcomeTotalPerMonth(10))}
          </div>
        </div>
        <div className="Month">
          <div className="Month_text">November :</div>
          <div className="Month_value">
            {VNCurrency(OutcomeTotalPerMonth(11))}
          </div>
          <span className="tab"> </span>
          <div className="Month_text">December :</div>
          <div className="Month_value">
            {VNCurrency(OutcomeTotalPerMonth(12))}
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
        {/*{YearButton("2023")}*/}
        {/*{YearButton("2022")}*/}
      </div>
      {/*prettier-ignore*/}
      <div style={{ color: "blue", display: "flex", width: "700px" ,fontWeight : "bold", marginLeft:"10px" , marginTop : "10px" }}>
        <div>Total Outcome: </div>
        {/*prettier-ignore*/}
        <div style={{marginLeft:"10px",marginRight : "10px"}}>{VNCurrency(TotalOutcome)} ({VNCurrency(TotalOutcome/12)})</div>
        <div style={{marginLeft:"10px",marginRight : "10px"}}>({VNCurrency(TotalOutcome - BeforeTotalOutcome ) })</div>
      {/*    {
            parseInt(TotalOutcome/12).toLocaleString("en-US", {style: "decimal",currency: "USD",})}*/}
      </div>
      {/*  Input Area*/}
      <div className="input-container">
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Date Outcome"
                inputFormat="MM/dd/yyyy"
                value={dateOutcome}
                onChange={datehandleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </div>

        <CurrencyFormat
          id="OutcomeID"
          label="Outcome"
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
          onClick={addOutcomeclick}
        >
          Add Outcome
        </Button>
      </div>
      {/*Chart Outcome per month*/}
      <div>
        <Chart
          data={[
            OutcomeTotalPerMonth(1),
            OutcomeTotalPerMonth(2),
            OutcomeTotalPerMonth(3),
            OutcomeTotalPerMonth(4),
            OutcomeTotalPerMonth(5),
            OutcomeTotalPerMonth(6),
            OutcomeTotalPerMonth(7),
            OutcomeTotalPerMonth(8),
            OutcomeTotalPerMonth(9),
            OutcomeTotalPerMonth(10),
            OutcomeTotalPerMonth(11),
            OutcomeTotalPerMonth(12),
          ]}
          // Total={TotalOutcome}
          Total={TotalOutcome / 12}
          MainLabel="Total Outcome"
          SubLabel="Outcome Per Month"
        />
      </div>
      {/*  List Outcome per month*/}
      <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
        {OutcomePerMonth()}
      </div>
      {/*    List all Outcome*/}
      <div className="anualOutcomeCard">{ShowOutcome(TotalOutcomes)}</div>
      {/*prettier-ignore*/}
      <div  className= {IsAddOutcome ? "alert alert-success connection-alert connected-alert text-center fadeIn":  "fadeOut"}>
            <strong>Added!</strong>
        </div>
    </div>
  );
}

export default AnnuallOutcome;
