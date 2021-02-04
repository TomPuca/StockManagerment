import React from "react";

import Realtime from "./Realtime";
import BuySell from "./BuySell";
// import { Route } from "react-router-dom";

function StyleTest() {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Active
          </a>
          <Realtime />
          <BuySell />
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#">
            Disabled
          </a>
        </li>
      </ul>
    </div>
  );
}

export default StyleTest;
