import React, { memo } from "react";
import { FixedSizeList } from "react-window";
import "./ListComponent.css";

const ListComponent = memo((props) => {
  const propsLength = props.stockitem.length;

  const Row = ({ index, style }) => (
    <div className="MatchRow" style={style}>
      <div className="MatchRowTime" style={{ fontSize: 11 }}>
        {props.stockitem[propsLength - index - 1].timematch === "null"
          ? "ATC"
          : props.stockitem[propsLength - index - 1].timematch}
      </div>
      <div className="MatchRowPrice" style={{ fontSize: 11 }}>
        {props.stockitem[propsLength - index - 1].pricematch}
      </div>
      <div className="MatchRowVolume" style={{ fontSize: 11 }}>
        {(
          props.stockitem[propsLength - index - 1].volumematch * 10
        ).toLocaleString("en-US", {
          style: "decimal",
          currency: "USD",
        })}
      </div>
    </div>
  );

  return (
    <FixedSizeList
      height={100}
      width={120}
      itemSize={15}
      itemCount={props.stockitem.length}
    >
      {Row}
    </FixedSizeList>
  );
});

export default ListComponent;
