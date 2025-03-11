import Select from "react-select";
import "./style.scss";

export default function Weight({
  weightAmountKg,
  onWeightAmountKgChange,
  weightAmountCbm,
  onWeightAmountCbmChange,
}) {
  const min = 0;
  const maxKg = 15;
  const maxCbm = 10;

  const mathMax = (event, maxValue) => {
    return Math.max(min, Math.min(maxValue, Number(event.target.value)));
  };

  const handleChangeKg = (event) => {
    onWeightAmountKgChange(mathMax(event, maxKg));
  };

  const handleChangeCbm = (event) => {
    onWeightAmountCbmChange(mathMax(event, maxCbm));
  };

  return (
    <div className="searchbox-pod searchbox-content-block">
      <div className="searchbox-content-block-title">
        What are you Shipping?
      </div>
      <div className="searchbox-content-block-weight">
        <div className="searchbox-input">
          <input
            id="searchbox-weight-amount-kg"
            type="number"
            value={weightAmountKg || ""}
            onChange={handleChangeKg}
            placeholder={`Please enter the metric ton amount up to ${maxKg}`}
          />
          <label
            htmlFor="searchbox-weight-amount-kg"
            className="searchbox-input-label"
          >
            WEIGHT, MT
          </label>
        </div>
        <div className="searchbox-input">
          <input
            id="searchbox-weight-amount-cbm"
            type="number"
            value={weightAmountCbm || ""}
            onChange={handleChangeCbm}
            placeholder={`Please enter the cbm amount up to ${maxCbm}`}
          />
          <label
            htmlFor="searchbox-weight-amount-cbm"
            className="searchbox-input-label"
          >
            VOLUME, CBM
          </label>
        </div>
      </div>
    </div>
  );
}
