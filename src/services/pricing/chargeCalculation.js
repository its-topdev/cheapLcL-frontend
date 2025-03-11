import { chargeTypes } from "../../constants/ports";

const { FIXED_CHARGE, CALCULATED_CHARGE, PERCENTAGE_CHARGE } = chargeTypes;

export const calculateChargePrice = (charge, amount, type, minValue = 0) => {
  if (type === FIXED_CHARGE) {
    return charge;
  }

  if (type === CALCULATED_CHARGE) {
    return charge * amount > minValue ? charge * amount : minValue;
  }

  if (type === PERCENTAGE_CHARGE) {
    console.log(charge, amount, type, minValue, "charge and amount");
    return (charge * amount) / 100 > minValue
      ? (charge * amount) / 100
      : minValue;
  }
};
