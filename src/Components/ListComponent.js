import React from "react";
import { FixedSizeList } from "react-window";
import "./ListComponent.css";

export default function ListComponent(props) {
  // console.log("props");
  // console.log(props.stockitem);
  const propsleng = props.stockitem.length;
  const Row = ({ index, style }) => (
    <div className="MatchRow">
      <div style={{ style, fontSize: 11 }} className="MatchRowTime">
        {props.stockitem[propsleng - index - 1].timematch === "null"
          ? "ATC"
          : props.stockitem[propsleng - index - 1].timematch}
      </div>
      <div style={{ style, fontSize: 11 }} className="MatchRowPrice">
        {props.stockitem[propsleng - index - 1].pricematch}
      </div>
      <div style={{ style, fontSize: 11 }} className="MatchRowVolume">
        {(
          props.stockitem[propsleng - index - 1].volumematch * 10
        ).toLocaleString("en-US", {
          style: "decimal",
          currency: "USD",
        })}
      </div>
    </div>
    // <div style={{ style, fontSize: 11 }}>
    //   {props.stockitem[propsleng - index - 1].timematch +
    //   "   " +
    //   props.stockitem[propsleng - index - 1].pricematch +
    //   "  " +
    //   props.stockitem[propsleng - index - 1].volumematch}
    // </div>
  );
  return (
    <FixedSizeList
      height={100}
      width={120}
      itemSize={15}
      itemCount={props.stockitem.length}
      // itemCount={100}
    >
      {Row}
    </FixedSizeList>
  );
}
