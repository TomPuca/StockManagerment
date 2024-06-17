import React from "react";
import "./ListItemIncome.css";

function ListItemIncome(props) {
  return (
    // prettier-ignore
    <div className={"incomeItemContainer"}>
        <div className={"dateContainer"}>
          {/*prettier-ignore*/}
          {props.IncomeItem.Day}/{props.IncomeItem.Month}/
          {props.IncomeItem.Year}
        </div>
        <div className={"incomeContainer"}>
          {props.IncomeItem.Income.toLocaleString("en-US", {
           style: "decimal",
          currency: "USD",
          })}
        </div>
    </div>
  );
}

export default ListItemIncome;
