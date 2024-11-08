import { useState } from "react";

export const useCounter = (initialValue = 1) => {
  const [counter, setcounter] = useState(initialValue);

  const incrementar = () => {
    setcounter(counter + 1);
  };

  const restar = () => {
    if (counter === 0) return;
    setcounter(counter - 1);
  };

  const reset = () => {
    setcounter(initialValue);
  };

  return {
    counter,
    incrementar,
    restar,
    reset,
  };
};
