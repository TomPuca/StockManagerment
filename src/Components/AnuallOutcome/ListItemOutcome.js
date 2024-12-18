import React from "react";
import "./ListItemOutcome.css";

function ListItemOutcome(props) {
  return (
    // prettier-ignore
    <div className={"outcomeItemContainer"}>
        <div className={"dateContainer"}>
          {/*prettier-ignore*/}
          {props.OutcomeItem.Day}/{props.OutcomeItem.Month}/
          {props.OutcomeItem.Year}
        </div>
        <div className={"outcomeContainer"}>
          {props.OutcomeItem.Outcome.toLocaleString("en-US", {
           style: "decimal",
          currency: "USD",
          })}
        </div>
    </div>
  );
}

export default ListItemOutcome;
