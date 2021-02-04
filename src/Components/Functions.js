import { useEffect, useRef } from "react";

export function strimstring(stringitem) {
  if (stringitem.length > 2) {
    let temp = (parseInt(stringitem) * 10).toLocaleString("en-US", {
      style: "decimal",
      currency: "USD",
    });
    // console.log(temp);
    temp = temp.substring(0, temp.length - 1);
    return temp;
  } else {
    return stringitem;
  }
}

export function getCurrentDate() {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return [date, month, year];
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
