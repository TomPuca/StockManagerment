import React from "react";
// import "./StockCodeView.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useStateValue } from "../StateProvider";

function StockCodeView() {
  const [{ Stocklist }, dispatch] = useStateValue();
  const addstockclick = (e) => {
    e.preventDefault();
    // console.log("click");
    dispatch({
      type: "ADD_STOCK_TO_LIST",
      item: document.getElementById("StockCodeIDtoList").value.toUpperCase(),
    });
  };
  const deletestockclick = (e) => {
    // console.log("delete stock");
    dispatch({
      type: "DEL_STOCK_TO_LIST",
      item: document.getElementById("StockCodeIDtoList").value.toUpperCase(),
    });
  };
  return (
    <div>
      <div> {Stocklist.join(",")}</div>
      <div>
        <TextField
          id="StockCodeIDtoList"
          label="Stock Code"
          style={{ marginTop: 5 }}
          placeholder="0"
          // margin="dense"
          variant="outlined"
          size="small"
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
          }}
        />
        <Button
          variant="outlined"
          style={{ marginTop: 8, marginLeft: 8, fontSize: "12px" }}
          size="medium"
          onClick={addstockclick}
        >
          Add
        </Button>
        <Button
          variant="outlined"
          style={{ marginTop: 8, marginLeft: 8, fontSize: "12px" }}
          size="medium"
          onClick={deletestockclick}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default StockCodeView;
