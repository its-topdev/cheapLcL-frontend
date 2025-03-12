export const DISCOUNT_EXCLUDE_PORTS = ["NHAVA SHEVA"];

export const calculateDiscount = (price, departureDate, discountData, port) => {
  if (DISCOUNT_EXCLUDE_PORTS.includes(port)) {
    return price;
  }

  const discount = discountData?.fixedDiscount || 0;
  const weeklyDiscount = discountData?.weeklyDiscount || 0;
  const discountStartDate = discountData?.startDate
    ? new Date(discountData?.startDate)
    : new Date();
  const discountEndDate = discountData?.endDate
    ? new Date(discountData?.endDate)
    : new Date();

  const weeklyPassed =
    departureDate - discountEndDate == 0
      ? 0
      : Math.floor(
          (departureDate - discountEndDate) / (7 * 24 * 60 * 60 * 1000),
        ) + 1;
  return departureDate < discountStartDate
    ? price
    : departureDate > discountEndDate
      ? price - discount - weeklyDiscount * weeklyPassed
      : price - discount;
};
