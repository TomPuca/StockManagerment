import React from "react";
import "./ListItemIncome.css";

function ListItemIncome(props) {
  return (
    // prettier-ignore
    <div style={{ border: "1px solid lightgray", display: "flex", marginLeft: 10, width :230 }}>
        <div style={{ borderRight: "1px solid lightgray", width :100 , textAlign : "center"}}>
          {/*prettier-ignore*/}
          {props.IncomeItem.Day}/{props.IncomeItem.Month}/
          {props.IncomeItem.Year}
        </div>
        <div style={{textAlign : "right" ,  width :130}}>
          {props.IncomeItem.Income.toLocaleString("en-US", {
           style: "decimal",
          currency: "USD",
          })}
        </div>
    </div>
  );
}

export default ListItemIncome;
