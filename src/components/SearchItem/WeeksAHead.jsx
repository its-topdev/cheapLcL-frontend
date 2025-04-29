import Select from "react-select";
import "./style.scss";
import { useEffect, useRef } from "react";

const options = [
  { value: 1, label: "1 week" },
  { value: 2, label: "2 weeks" },
  { value: 3, label: "3 weeks" },
  { value: 4, label: "4 weeks" },
];

export default function WeeksAHead({ weeks, onWeeksChange }) {
  const weeksRef = useRef();

  useEffect(() => {
    weeksRef?.current?.focus();
  }, [weeksRef]);

  return (
    <div className="searchbox-weeks searchbox-content-block">
      <div className="searchbox-content-block-title">How many weeks ahead?</div>
      <div className="searchbox-select">
        <Select
          ref={weeksRef}
          openMenuOnFocus={true}
          classNamePrefix="cheap"
          value={weeks}
          options={options}
          placeholder="Please select a number of weeks"
          onChange={(e) => onWeeksChange(e)}
          isClearable
        />
        <label className="searchbox-select-label">weeks</label>
      </div>
    </div>
  );
}
