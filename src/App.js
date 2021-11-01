import logo from "./logo.svg";
import "./App.css";
import Realtime from "./Components/Realtime";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BuySell from "./Components/BuySell";
import HistoryTransactions from "./Components/HistoryTransactions";
import VnIndexChart from "./Components/VNIndexChart";
import StyleTest from "./Components/StyleTest";
import StockCodeView from "./Components/StockCodeView";
// import "bootstrap/dist/css/bootstrap.min.css";

//https://bgapidatafeed.vps.com.vn/getliststockdata/DXG,VGT,TCM
//wss://bgdatafeed.vps.com.vn/socket.io
//var socketLink = 'https://bgdatafeed.vps.com.vn/';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="app">
          <Switch>
            <Route path="/StockManager">{<Realtime />}</Route>
            <Route path="/StyleTest">{<StyleTest />}</Route>
            <Route path="/VnIndexChart">{<VnIndexChart />}</Route>
            <Route path="/HistoryTransactions">{<HistoryTransactions />}</Route>
            <Route path="/CodeView">{<StockCodeView />}</Route>
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
