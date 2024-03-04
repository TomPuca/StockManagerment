import React from "react";
import { Link } from "react-router-dom";

function Version() {
  return (
    <div>
      <Link to="/">
        <div>
          <span className="Header-cartCount">Main</span>
        </div>
      </Link>
      <div style={{ color: "blue", display: "flex", marginLeft: 10 }}>
        <h1> Version: 1.0.2</h1>
      </div>
      <div style={{ display: "flex", marginLeft: 10 }}>
        <h2>Date Change: 04/03/2024</h2>
      </div>
      <div style={{ display: "flex", marginLeft: 10 }}>
        Change log: Fix Chart Stocks.
      </div>
      <div style={{ color: "blue", display: "flex", marginLeft: 10 }}>
        <h1> Version: 1.0.1</h1>
      </div>
      <div style={{ display: "flex", marginLeft: 10 }}>
        <h2>Date Change: 28/02/2024</h2>
      </div>
      <div style={{ display: "flex", marginLeft: 10 }}>
        Change log: Fix Sell Stocks.
      </div>
    </div>
  );
}

export default Version;
