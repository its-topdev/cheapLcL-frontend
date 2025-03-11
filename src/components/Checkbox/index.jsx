import { useState } from "react";
import "./style.scss";

const Checkbox = ({ label, checkboxValue, onSetCheckboxValue }) => {
  function handleChange() {
    onSetCheckboxValue(!checkboxValue);
  }
  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          checked={checkboxValue || ""}
          onChange={handleChange}
          className="input"
          type="checkbox"
        />
        <span className="text" dangerouslySetInnerHTML={{ __html: label }} />
      </label>
    </div>
  );
};
export default Checkbox;
