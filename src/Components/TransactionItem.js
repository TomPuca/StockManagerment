import React from "react";
import "./TransactionItem.css";

function TransactionItem(props) {
  return (
    <div className="item_border">
      <div className="date_frame">
        <div className="date_frame_day">{props.stockitem.DaySold}</div>
        <div className="date_frame_month">{props.stockitem.MonthSold}</div>
        <div className="date_frame_year">{props.stockitem.YearSold}</div>
      </div>
      <div className="common_frame">
        <div className="common_frame_name">Symbol</div>
        <div className="common_frame_value">{props.stockitem.MaCK}</div>
      </div>
      <div className="common_frame_Gain">
        <div>Gain</div>
        <div className="common_frame_value">
          {props.stockitem.Amount.toLocaleString("en-US", {
            style: "decimal",
            currency: "USD",
          })}
        </div>
      </div>
      <div className="common_frame">
        <div>Bought Price</div>
        <div className="common_frame_value">{props.stockitem.BoughtPrice}</div>
      </div>
      <div className="common_frame">
        <div>Sold Price</div>
        <div className="common_frame_value">{props.stockitem.SoldPrice}</div>
      </div>
      <div className="common_frame_gain">
        <div>Gain</div>
        <div className="common_frame_value">
          {props.stockitem.SoldPrice === 0
            ? 0
            : props.stockitem.Gain.toLocaleString("en-US", {
                style: "decimal",
                currency: "USD",
              })}
        </div>
      </div>
      <div className="common_frame_end">
        <div>Gain %</div>
        <div className="common_frame_value">
          {props.stockitem.SoldPrice === 0
            ? 0
            : props.stockitem.Percent.toLocaleString("en-US", {
                style: "decimal",
                currency: "USD",
              })}
          %
        </div>
      </div>
    </div>
  );
}

export default TransactionItem;
