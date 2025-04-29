import ActionsBtn from "./ActionsBtn";
import { useMemo } from "react";
import {
  BookRequestPrefix,
  dateTimeFormat,
  priceFormat,
} from "../../../constants/general";
import { calculateChargePrice } from "../../../services/pricing/chargeCalculation";
import { chargeTypes } from "../../../constants/ports";
const { FIXED_CHARGE, CALCULATED_CHARGE, PERCENTAGE_CHARGE } = chargeTypes;

export default function QuoteRow({ quote, onfetchQuotes, charges }) {
  const chargesData = {
    charges: charges,
  };
  const amount = quote.weight > quote.cbm ? quote.weight : quote.cbm;
  const totalGoods = quote.basePrice;
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
  // const statuses = {
  //     created: {color: '#AC8B06', background: '#FFFAE6'},
  //     cancelled: {color: '#B61B25',  background: '#FFFAE6'},
  //     Booked: {color: '#003E8B', background: '#F8F9FD'},
  // };

  return (
    <tr className="quote-row">
      <td>
        {BookRequestPrefix}-{quote.id}
      </td>
      <td>{quote.user && quote.user.name}</td>
      <td>{quote.basePrice && priceFormat(quote.basePrice)}</td>
      <td>{quote.weight}MT</td>
      <td>{quote.cbm}M³</td>
      <td>{priceFormat(totalGoods * amount + fixedCharges + calculatedCharges + percentageCharges)}</td>
      <td>{quote.vessel}</td>
      <td>{quote.voyage}</td>
      <td>{quote.price && quote.price.polObj && quote.price.polObj.name}</td>
      <td>{quote.price && quote.price.podObj && quote.price.podObj.name}</td>
      {/* <td>{quote.bookStatus && quote.bookStatus.name && <span style={{color: statuses[quote.bookStatus.name]['color'], background: statuses[quote.bookStatus.name]['background']}}>{quote.bookStatus.name}</span>}</td> */}
      <td>{quote.createdAt && dateTimeFormat(quote.createdAt)}</td>
      <td>
        {quote.bookStatus &&
          quote.bookStatus.name &&
          quote.bookStatus.name.toUpperCase()}
      </td>
      {
        currentUser.isAdmin && (
          <td>
            <ActionsBtn quote={quote} onfetchQuotes={onfetchQuotes} />
          </td>
        )
      }
    </tr>
  );
}
