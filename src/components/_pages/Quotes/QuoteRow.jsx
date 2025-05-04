import ActionsBtn from "./ActionsBtn";
import { useMemo, useContext, useState, useRef, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";
import PropTypes from "prop-types";

import {
  BookRequestPrefix,
  dateTimeFormat,
  priceFormat,
} from "../../../constants/general";
import { calculateChargePrice } from "../../../services/pricing/chargeCalculation";
import { chargeTypes } from "../../../constants/ports";
const { FIXED_CHARGE, CALCULATED_CHARGE, PERCENTAGE_CHARGE } = chargeTypes;

QuoteRow.propTypes = {
  quote: PropTypes.shape({
    id: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    cbm: PropTypes.number.isRequired,
    basePrice: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
    vessel: PropTypes.string,
    voyage: PropTypes.string,
    price: PropTypes.shape({
      polObj: PropTypes.shape({
        name: PropTypes.string,
      }),
      podObj: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    createdAt: PropTypes.string,
    bookStatus: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  onfetchQuotes: PropTypes.func.isRequired,
  charges: PropTypes.array.isRequired,
};

export default function QuoteRow({ quote, onfetchQuotes, charges }) {
  const { currentUser } = useContext(UserContext);
  const chargesData = {
    charges: charges,
  };
  const amount = quote.weight > quote.cbm ? quote.weight : quote.cbm;
  const totalGoods = quote.basePrice * amount;

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

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [detailsPosition, setDetailsPosition] = useState({ x: 0, y: 0 });
  const detailsRef = useRef(null);

  const handleRowClick = (event) => {
    if (currentUser.isAdmin && event.target.closest("td:last-child")) return;

    const { clientX: x, clientY: y } = event;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const divWidth = 1000;
    const divHeight = 330; // Approximate height

    const adjustedX = x + divWidth > viewportWidth ? x - divWidth : x;
    const adjustedY = y + divHeight > viewportHeight ? y - divHeight : y;

    setDetailsPosition({ x: adjustedX, y: adjustedY });
    setDetailsVisible(true);
  };

  const handleClickOutside = (event) => {
    if (detailsRef.current && !detailsRef.current.contains(event.target)) {
      setDetailsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (<>
    <tr
      className="quote-row"
      onClick={handleRowClick}
      style={{ cursor: "pointer" }}
    >
      <td>
        {BookRequestPrefix}-{quote.id}
      </td>
      <td>{quote.user && quote.user.name}</td>
      <td>{quote.basePrice && priceFormat(quote.basePrice)}</td>
      <td>{quote.weight}MT</td>
      <td>{quote.cbm}M³</td>
      <td>
        {priceFormat(totalGoods + fixedCharges + calculatedCharges + percentageCharges)}
      </td>
      <td>{quote.vessel}</td>
      <td>{quote.voyage}</td>
      <td>{quote.price && quote.price.polObj && quote.price.polObj.name}</td>
      <td>{quote.price && quote.price.podObj && quote.price.podObj.name}</td>
      {/* <td>{quote.bookStatus && quote.bookStatus.name && <span style={{color: statuses[quote.bookStatus.name]['color'], background: statuses[quote.bookStatus.name]['background']}}>{quote.bookStatus.name}</span>}</td> */}
      <td>{quote.createdAt && dateTimeFormat(quote.createdAt)}</td>
      {currentUser.isAdmin ? (
        <>
          <td>
            {quote.bookStatus &&
              quote.bookStatus.name &&
              quote.bookStatus.name.toUpperCase()}
          </td>
          <td>
            <ActionsBtn quote={quote} onfetchQuotes={onfetchQuotes} />
          </td>
        </>
      ) : null}
    </tr>
    {detailsVisible && (
      <div
        ref={detailsRef}
        style={{
          position: "fixed",
          top: detailsPosition.y,
          left: detailsPosition.x,
          width: "1000px",
          backgroundColor: "white",
          border: "1px solid #ccc",
          zIndex: 1000,
        }}
      >
        <table>
          <tbody>
            <tr style={{ border: "0px" }}>
              <td style={{ padding: "0px" }}>
                <tr>
                  <td style={{ backgroundColor: "#f0f0f0" }}>Shipper Name</td>
                  <td>{quote.shipper && quote.shipper.name}</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#f0f0f0" }}>Shipper Address</td>
                  <td>{quote.shipper && quote.shipper.address}</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#f0f0f0" }}>Country</td>
                  <td>{quote.shipper && quote.shipper.countryObj && quote.shipper.countryObj.name}</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#f0f0f0" }}>City</td>
                  <td>{quote.shipper && quote.shipper.cityObj && quote.shipper.cityObj.name}</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#f0f0f0" }}>Zip Code</td>
                  <td>{quote.shipper && quote.shipper.zip}</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#f0f0f0" }}>Contact Name</td>
                  <td>{quote.shipper && quote.shipper.contactObj[0] && quote.shipper.contactObj[0].name}</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#f0f0f0" }}>Contact Number</td>
                  <td>{quote.shipper && quote.shipper.contactObj[0] && quote.shipper.contactObj[0].phone}</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#f0f0f0" }}>Contact Email</td>
                  <td>{quote.shipper && quote.shipper.contactObj[0] && quote.shipper.contactObj[0].email}</td>
                </tr>
              </td>
              <td style={{ padding: "0px" }}>
                <tr>
                  <td style={{ backgroundColor: "#f0f0f0" }}>Ocean Freight</td>
                  <td>{priceFormat(quote.basePrice * amount)}</td>
                </tr>
                {chargesData?.charges?.map((charge) => (
                  <tr key={charge.id}>
                    <td style={{ backgroundColor: "#f0f0f0" }}>{charge.name}</td>
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
                  </tr>
                ))}
                <tr>
                  <td style={{ backgroundColor: "#f0f0f0" }}>Total</td>
                  <td>{priceFormat(totalGoods + fixedCharges + calculatedCharges + percentageCharges)}</td>
                </tr>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    )}</>
  );
}