import React, { memo } from "react";
import { FixedSizeList } from "react-window";
import "./ListComponent.css";

// prettier-ignore
const ListComponent = memo(({ stockitem }) => {
    const propsLength = stockitem.length;

    const Row = ({ index, style }) => {
        const item = stockitem[propsLength - index - 1];
        return (
            <div className={item.stockside === "B" ? "MatchRowBuy MatchRow" : "MatchRowSell MatchRow"}   style={style}>
                <div className="MatchRowTime" >
                    {item.timematch === "null" ? "ATC" : item.timematch}
                </div>
                <div
                    className="MatchSide"
                >
                    {item.stockside=== "null" ? "" : item.stockside}
                </div>
                <div className="MatchRowPrice" >
                    {item.pricematch}
                </div>
                <div className="MatchRowVolume" >
                    {(item.volumematch * 10).toLocaleString("en-US", {
                        style: "decimal",
                        currency: "USD",
                    })}
                </div>
            </div>
        );
    };

    return (
        <FixedSizeList
            height={100}
            width={130}
            itemSize={15}
            itemCount={stockitem.length}
        >
            {Row}
        </FixedSizeList>
    );
});

export default ListComponent;
