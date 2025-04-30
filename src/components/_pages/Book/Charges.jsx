import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { API_URL } from "../../../constants/config";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../Loader/Loader";
import { priceFormat } from "../../../constants/general";
import { chargeTypes } from "../../../constants/ports";
import { calculateChargePrice } from "../../../services/pricing/chargeCalculation";

const { FIXED_CHARGE, CALCULATED_CHARGE, PERCENTAGE_CHARGE } = chargeTypes;

export default function Charges({ amount, totalGoods, setSubtotal }) {
  const [open, setOpen] = useState(false);
  const {
    data: chargesData,
    loading: chargesLoading,
    fetchData: fetchCharges,
  } = useFetch();


  const fixedCharges = useMemo(() => {
    return chargesData?.charges
      ?.filter((charge) => charge.chargeType?.name === FIXED_CHARGE)
      ?.reduce((acc, charge) => acc + charge.price, 0);
  }, [chargesData]);

  const calculatedCharges = useMemo(() => {
    return chargesData?.charges
      ?.filter((charge) => charge.chargeType?.name === CALCULATED_CHARGE)
      ?.reduce(
        (acc, charge) =>
          acc +
          calculateChargePrice(
            charge.price,
            amount,
            charge.chargeType?.name,
            charge.minPrice,
          ),
        0,
      );
  }, [chargesData, amount]);

  const percentageCharges = useMemo(() => {
    return chargesData?.charges
      ?.filter((charge) => charge.chargeType?.name === PERCENTAGE_CHARGE)
      ?.reduce(
        (acc, charge) =>
          acc +
          calculateChargePrice(
            charge.price,
            totalGoods + fixedCharges + calculatedCharges,
            charge.chargeType?.name,
            charge.minPrice,
          ),
        0,
      );
  }, [chargesData, totalGoods, fixedCharges, calculatedCharges]);

  const toggleCharges = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchCharges(`${API_URL}charge/list`, "get", undefined, true);
  }, []);

  const rows = useMemo(() => {
    return (
      chargesData?.charges
        ?.filter((charge) => charge.price > 0)
        ?.sort((a, b) => a.name.localeCompare(b.name))
        ?.map((charge) => (
          <tr key={charge.id}>
            <td>{charge.name}</td>
            <td>
              {priceFormat(
                calculateChargePrice(
                  charge.price,
                  charge.chargeType?.name === PERCENTAGE_CHARGE
                    ? totalGoods + fixedCharges + calculatedCharges
                    : amount,
                  charge.chargeType?.name,
                  charge.minPrice,
                ),
              )}
            </td>
            <td>{
              charge.chargeType?.name === 'fixed' ? 'Fixed, per BL' :
                charge.chargeType?.name === 'calculated' ? 'Calculated' :
                  charge.chargeType?.name === 'percentage' ? 'Calculated' :
                    charge.chargeType?.name
            }</td>
          </tr>
        )) || []
    );
  }, [chargesData, amount, totalGoods, fixedCharges, calculatedCharges]);
  const localCharge = fixedCharges + calculatedCharges + percentageCharges;

  useEffect(() => {
    if (!chargesLoading) {
      setSubtotal(localCharge + totalGoods);
    }
  }, [localCharge, totalGoods, setSubtotal, chargesLoading]);

  return (
    <div className="charges_block">
      <button
        onClick={toggleCharges}
        className={`charges_block_title ${open ? "open" : ""}`}
        type="button"
      >
        {chargesLoading ? (
          <Loader />
        ) : (
          <>Local Charges: {priceFormat(localCharge)}</>
        )}
      </button>
      {open ? (
        chargesLoading ? (
          <Loader />
        ) : (
          <div className="charges_block_table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
}

Charges.propTypes = {
  amount: PropTypes.number.isRequired,
  totalGoods: PropTypes.number.isRequired,
  setSubtotal: PropTypes.func.isRequired,
};
