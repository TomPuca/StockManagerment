import React, { memo } from "react";
import { FixedSizeList } from "react-window";
import "./ListComponent.css";

// prettier-ignore
const ListComponent = memo(({ stockitem }) => {
    const propsLength = stockitem.length;

    const Row = ({ index, style }) => {
        const item = stockitem[propsLength - index - 1];
        return (
            <div className="MatchRow" style={style}>
                <div className="MatchRowTime" style={{ fontSize: 11 }}>
                    {item.timematch === "null" ? "ATC" : item.timematch}
                </div>
                <div
                    className={item.stockside === "B" ? "MatchSideBuy" : "MatchSideSell"}
                    style={{ fontSize: 11 }}
                >
                    {item.stockside}
                </div>
                <div className="MatchRowPrice" style={{ fontSize: 11 }}>
                    {item.pricematch}
                </div>
                <div className="MatchRowVolume" style={{ fontSize: 11 }}>
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
            width={120}
            itemSize={15}
            itemCount={stockitem.length}
        >
            {Row}
        </FixedSizeList>
    );
});

export default ListComponent;
