import "./App.css";
import Realtime from "./Components/Realtime";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import BuySell from "./Components/BuySell";
import HistoryTransactions from "./Components/HistoryTransactions";
import VnIndexChart from "./Components/VNIndexChart";
import StockCodeView from "./Components/StockCodeView";
// import ReactSession from "./Components/Utils/ReactSession";
import AnnualIncome from "./Components/AnnualIncome/AnnualIncome";

// import "bootstrap/dist/css/bootstrap.min.css";

//https://bgapidatafeed.vps.com.vn/getliststockdata/DXG,VGT,TCM
//wss://bgdatafeed.vps.com.vn/socket.io
//var socketLink = 'https://bgdatafeed.vps.com.vn/';

function App() {
  // ReactSession.setStoreType("localStorage");
  // ReactSession.set("Stock_List", ["DIG", "VPH", "CTI", "CEO", "LDG", "IDG"]);
  return (
    <div className="App">
      <Router>
        <div className="app">
          <Switch>
            <Route path="/StockManager">{<Realtime />}</Route>
            <Route path="/VnIndexChart">{<VnIndexChart />}</Route>
            <Route path="/HistoryTransactions">{<HistoryTransactions />}</Route>
            <Route path="/CodeView">{<StockCodeView />}</Route>
            <Route path="/AnnualIncome">{<AnnualIncome />}</Route>
            <Route path="/">
              <Realtime />
              <BuySell />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
