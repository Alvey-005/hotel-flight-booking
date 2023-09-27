// CounterInput.js
import React from "react";

const CounterInput = ({ name, value, onIncrement, onDecrement, disabled }) => {
  return (
    <div className="optionCounter">
      <button
        disabled={disabled}
        className="optionCounterButton"
        onClick={onDecrement}
      >
        -
      </button>
      <span className="optionCounterNumber">{value}</span>
      <button className="optionCounterButton" onClick={onIncrement}>
        +
      </button>
    </div>
  );
};

export default CounterInput;