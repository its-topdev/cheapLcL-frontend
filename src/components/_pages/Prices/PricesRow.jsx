import PropTypes from "prop-types";
import { priceFormat, dateFormatUtc } from "../../../constants/general";
import ActionsBtn from "./ActionBtn";

export default function PricesRow({ price, onFetchPrices }) {
  return (
    <>
      <tr>
        <td>{price.updatedAt ? dateFormatUtc(price.updatedAt) : ""}</td>
        <td>{price.validFrom ? dateFormatUtc(price.validFrom) : ""}</td>
        <td>{price.validTo ? dateFormatUtc(price.validTo) : ""}</td>
        <td>{price.polName}</td>
        <td>{price.podName}</td>
        <td>{price.price && priceFormat(price.price)}</td>
        <td className="action">
          <ActionsBtn priceData={price} onFetchPrices={onFetchPrices} />
        </td>
      </tr>
    </>
  );
}

PricesRow.propTypes = {
  price: PropTypes.object.isRequired,
  onFetchPrices: PropTypes.func.isRequired,
};
