export function ExpectedInterest(buyprice, sellprice, Amount) {
  let expectedprofit =
    (parseFloat(sellprice) * 1000 - parseFloat(buyprice) * 1000) * Amount -
    (parseFloat(buyprice) + parseFloat(sellprice)) * Amount * 2 -
    parseFloat(sellprice) * Amount;

  let expectedpercent =
    (expectedprofit / (parseFloat(buyprice) * 10 * Amount)).toFixed(2) + "%";
  return [expectedprofit, expectedpercent];
}
