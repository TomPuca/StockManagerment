import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { StockRef } from "./firebase";
import { getCurrentDate } from "./Functions";
import { ExpectedInterest } from "./Functions";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    // console.log("props", props);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  function UpdateStockByID(id, stockSoldPrice, gain, gainpercent, volume) {
    let StockQueries = StockRef.doc(id);
    // console.log(getCurrentDate()[0]);
    StockQueries.get()
      .then(function (doc) {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          // console.log(gain, gainpercent);
          StockQueries.update({
            SoldPrice: stockSoldPrice,
            DaySold: getCurrentDate()[0],
            MonthSold: getCurrentDate()[1],
            YearSold: getCurrentDate()[2],
            IsSold: true,
            Gain: gain,
            Amount: volume,
            Percent: gainpercent,
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }

  const handleClose = () => {
    setOpen(false);
    let Soldstock = parseFloat(document.getElementById("StockID").value);
    let StockAmount = parseFloat(
      document.getElementById("StockAmountID").value
    );
    // console.log(Soldstock, StockAmount);
    console.log(Soldstock);
    // If value entered was valid
    if (!isNaN(Soldstock)) {
      // first : get ID of stock data
      let StockQueries = StockRef.where("MaCK", "==", props.stockitem.MaCK)
        .where("IsSold", "==", false)
        .where("Amount", "==", props.stockitem.Amount)
        .where("BoughtPrice", "==", props.stockitem.BoughtPrice);
      //   console.log(StockQueries.get);
      StockQueries.onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          UpdateStockByID(
            doc.id,
            Soldstock,
            ExpectedInterest(
              props.stockitem.BoughtPrice,
              Soldstock,
              StockAmount
            )[0],
            ExpectedInterest(
              props.stockitem.BoughtPrice,
              Soldstock,
              StockAmount
            )[1],
            StockAmount
          );
          // console.log(doc.id);
        });
      });
    }
  };

  return (
    <div>
      {/*prettier-ignore*/}
      <Button variant="outlined" style={{ fontSize: "12px" }} size="small" onClick={handleClickOpen} > Sell  </Button>
      {/*prettier-ignore*/}
      <Dialog open={open} onClose={handleClose}  aria-labelledby="form-dialog-title"  disableBackdropClick={true}  >
        <DialogTitle id="form-dialog-title">
          Sell {props.stockitem.MaCK}
        </DialogTitle>
        <DialogContent>
          {/*prettier-ignore*/}
          <TextField id={"StockID"} autoFocus margin="dense" label="Sell Price" type="email" fullWidth />
          {/*prettier-ignore*/}
          <TextField id={"StockAmountID"} margin="dense" label="Volume" defaultValue={props.stockitem.Amount} fullWidth />
          {/*<TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" />*/}
        </DialogContent>
        <DialogActions>
          {/*prettier-ignore*/}
          <Button onClick={handleCancel} color="primary"> Cancel  </Button>
          {/*prettier-ignore*/}
          <Button onClick={handleClose} color="primary"> Submit </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
