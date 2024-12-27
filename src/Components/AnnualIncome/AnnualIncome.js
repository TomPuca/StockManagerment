import React, { useEffect, useState } from "react";
import "./AnnualIncome.css";
import { Link } from "react-router-dom";
import { Button, DatePicker, Input, Space, Typography } from "antd";
import CurrencyFormat from "react-currency-format";
import db from "../firebase";
import Chart from "../Chart/BarChart";
import ListItemIncome from "./ListItemIncome";
import { VNCurrency } from "../Functions";
import dayjs from "dayjs";

const { Title, Text } = Typography;

function AnnualIncome() {
    const [year, setYear] = useState("Income");
    const [dateincome, setDateIncome] = useState(dayjs());
    const [TotalIncomes, setTotalIncomes] = useState([]);
    const [BeforeTotalIncomes, setBeforeTotalIncomes] = useState([]);
    const [IsAddIncome, setIsAddIncome] = useState(false);

    let TotalIncome = TotalIncomes.reduce((prev, cur) => prev + cur.Income, 0);
    let BeforeTotalIncome = BeforeTotalIncomes.reduce((prev, cur) => prev + cur.Income, 0);

    function IncomeTotalPerMonth(i) {
        return TotalIncomes.reduce((prev, cur) => (cur.Month === i ? prev + cur.Income : prev), 0);
    }

    const ShowIncome = (items) =>
        items?.map((item, index) => (
            <div key={index}>
                <ListItemIncome IncomeItem={item} />
            </div>
        ));

    // Fetch data on load and year change
    useEffect(() => {
        let now = new Date();
        let BeforeYear = now.getFullYear() - 1;

        if (year === "Income") {
            db.collection(`Income${now.getFullYear()}`)
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

        db.collection(`Income${BeforeYear}`)
            .orderBy("Month", "asc")
            .orderBy("Day", "asc")
            .onSnapshot((snapshot) => {
                setBeforeTotalIncomes(snapshot.docs.map((doc) => doc.data()));
            });
    }, [year]);

    useEffect(() => {
        const now = new Date();
        const BeforeYear = now.getFullYear() - 1;

        setYear(`Income${now.getFullYear()}`);

        db.collection(`Income${BeforeYear}`)
            .orderBy("Month", "asc")
            .orderBy("Day", "asc")
            .onSnapshot((snapshot) => {
                setBeforeTotalIncomes(snapshot.docs.map((doc) => doc.data()));
            });
    }, []);

    const datehandleChange = (date) => {
        setDateIncome(date);
    };

    const addincomeclick = (e) => {
        e.preventDefault();
        db.collection(year).add({
            Income: parseFloat(document.getElementById("IncomeID").value.replaceAll(",", "")),
            Day: dateincome.date(),
            Month: dateincome.month() + 1,
            Year: dateincome.year(),
        });
        setIsAddIncome(true);
    };

    function YearButton(year) {
        return (
            <Button type="primary" style={{ marginLeft: '10px',marginTop: '5px', backgroundColor: 'transparent',color: 'black', borderColor: '#1890ff'  }} onClick={() => setYear(`Income${year}`)}>
                {year}
            </Button>
        );
    }

    function IncomePerMonth() {
        return (
            <div className="Month_all">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="Month">
                        <Text className="Month_text" >{dayjs().month(i).format("MMMM")}:</Text>
                        <Text className="Month_value">{VNCurrency(IncomeTotalPerMonth(i + 1))}</Text>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div style={{ border: "2px solid black",  width: "430px"}}>
        {/*// <div>*/}
            <div style={{marginBottom: 16, marginLeft: 10, display: 'flex', height: '30px',alignItems: 'center'}}>
                <Link to="/">
                    <Title level={4}>Main</Title>
                </Link>
                {YearButton("2024")}
                {YearButton("2023")}
                {YearButton("2022")}
            </div>

            <div style={{margin: "10px 0", marginLeft: 10, fontWeight: "bold" }}>
                <Text style={{ fontSize: "13px" }}>Total Income: </Text>
                <Text style={{ fontSize: "13px" }}>{VNCurrency(TotalIncome)}</Text>
                <Text
                    style={{
                        fontSize: "13px",
                        marginLeft: 10,
                        color: TotalIncome - BeforeTotalIncome > 0 ? 'blue' : 'red' // Màu xanh nếu dương, đỏ nếu âm
                    }}
                >
                    ({VNCurrency(TotalIncome / 12)})  ({VNCurrency(TotalIncome - BeforeTotalIncome)})
                </Text>
            </div>


            {/* Input Area */}
            <div className="input-container">
                <DatePicker value={dateincome} onChange={datehandleChange} format="MM/DD/YYYY"/>
                <CurrencyFormat
                    id="IncomeID"
                    customInput={Input}
                    thousandSeparator
                    prefix=""
                    style={{width: 150, marginLeft: '10px',}}
                />
                <Button type="primary"  style={{ marginLeft: '10px', backgroundColor: 'transparent',color: 'black', borderColor: '#1890ff'  }} onClick={addincomeclick}>
                    Add
                </Button>
            </div>

            {/* Chart Income Per Month */}
            <div className="chart-container" >
                <Chart
                    data={Array.from({ length: 12 }, (_, i) => IncomeTotalPerMonth(i + 1))}
                    Total={TotalIncome / 12}
                    MainLabel="Total Income"
                    SubLabel="Income Per Month"
                />
            </div>

            {/* List Income per month */}
            <div style={{ margin: "10px 0"}}>{IncomePerMonth()}</div>

            {/* List all Income */}
            <div className="anualIncomeCard">{ShowIncome(TotalIncomes)}</div>

            {IsAddIncome && (
                <div className="alert alert-success connection-alert connected-alert text-center fadeIn">
                    <strong>Added!</strong>
                </div>
            )}
        </div>
    );
}

export default AnnualIncome;
