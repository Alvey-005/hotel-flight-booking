import React from "react";
import CounterInput from "./CounterInput";

const OptionsPanel = ({ options, handleOption, optionData }) => {
  const { name, label, minValue, disabled } = optionData;

  return (
      <div className="optionItem">
        <span className="optionText">{label}</span>
        <CounterInput
          name={name}
          value={options[name]}
          onIncrement={() => handleOption(name, "i")}
          onDecrement={() => handleOption(name, "d")}
          disabled={options[name] <= minValue || disabled}
        />
      </div>

  );
};

export default OptionsPanel;
