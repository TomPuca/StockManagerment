import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { StockRef } from "./firebase";
import { getCurrentDate } from "./Functions";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  function UpdateStockByID(id, stockSoldPrice, gain, gainpercent) {
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
    // console.log(Soldstock);
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
              props.stockitem.Amount
            )[0],
            ExpectedInterest(
              props.stockitem.BoughtPrice,
              Soldstock,
              props.stockitem.Amount
            )[1]
          );
          // console.log(doc.id);
        });
      });
    }
  };

  function ExpectedInterest(buyprice, sellprice, Amount) {
    let expectedprofit =
      (parseFloat(sellprice) * 1000 - parseFloat(buyprice) * 1000) * Amount -
      (parseFloat(buyprice) + parseFloat(sellprice)) * Amount * 2 -
      parseFloat(sellprice) * Amount;

    let expectedpercent =
      (expectedprofit / (parseFloat(buyprice) * 10 * Amount)).toFixed(2) + "%";
    return [expectedprofit, expectedpercent];
  }
  return (
    <div>
      <Button
        variant="outlined"
        style={{ fontSize: "12px" }}
        size="small"
        onClick={handleClickOpen}
      >
        Sell
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        // onEntering={handleEnter}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
      >
        <DialogTitle id="form-dialog-title">Sell Price</DialogTitle>
        <DialogContent>
          <TextField
            id={"StockID"}
            autoFocus
            margin="dense"
            // id="sellprice"
            label="Sell Price"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
