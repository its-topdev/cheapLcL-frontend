import ActionsBtn from "./ActionsBtn";
import { priceFormat } from "../../../constants/general";
import PropTypes from "prop-types";

export default function DiscountRow({ discount, onFetchDiscounts, num }) {
  return (
    <>
      <tr>
        {/* <td>{discount.startDate ? dateFormatUtc(discount.startDate) : ""}</td>
        <td>{discount.endDate ? dateFormatUtc(discount.endDate) : ""}</td> */}
        <td>{discount.id}</td>
        <td>
          {discount.discount}
        </td>
        <td className="actions">
          <ActionsBtn discount={discount} onFetchDiscounts={onFetchDiscounts} />
        </td>
      </tr>
    </>
  );
}

DiscountRow.propTypes = {
  discount: PropTypes.object.isRequired,
  onFetchDiscounts: PropTypes.func.isRequired,
};
