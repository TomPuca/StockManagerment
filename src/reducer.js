export const initialState = {
  basket: ["hungtd", "tdhung"],
  user: null,
  currentstockprice: [],
  // hoseindex: [],
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((Gain, item) => item.price + Gain, 0);

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        currentstockprice: [...state.currentstockprice, action.item],
      };
    // console.log(currentstockprice);
    case "UPDATE_TO_CURRENTSTOCKPRICE":
      const index = state.currentstockprice.findIndex(
        (currentstockpriceItem) => currentstockpriceItem.sym === action.item.sym
      );
      let newcurrentstockprice = [...state.currentstockprice];

      if (index >= 0) {
        // newBasket.splice(index, 1);
        // console.warn(newcurrentstockprice[index].lastPrice);
        newcurrentstockprice[index].lastPrice = action.item.lastPrice;
        // console.warn(newcurrentstockprice[index].mat);
      } else {
        //khong co can add them
        newcurrentstockprice = [...state.currentstockprice, action.item];
      }

      return {
        ...state,
        currentstockprice: newcurrentstockprice,
      };

    // case "SET_STOCK_INDEX":

    default:
      return state;
  }
};

export default reducer;
