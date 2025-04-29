import PropTypes from "prop-types";

import useModal from "../../hooks/useModal";
import { Calendar, Location, Ship, Box, Star } from "../../constants/icons";
import { dateFormatUtc, priceFormat } from "../../constants/general";
import Book from "../_pages/Book";
import "./style.scss";

function ResultItem({ offer }) {
  const [isShowing, toggle, setIsShowing] = useModal("");

  return (
    <div className={`result-item ${offer.isLowPrice ? "cheapest" : ""}`}>
      <div className="result-item-wrap-carrier">
        <div className="result-item-carrier">{offer.carrierName}</div>
        <div className="result-total display-mobile-640">
          Total (est.){" "}
          <span className="result-total-price">
            ${offer.price * offer.amount}
          </span>
        </div>
        <div className="clearfix"></div>
      </div>
      <div className="result-item-wrap-blocks">
        <div className="result-item-block">
          <div className="result-item-block-row">
            <Location className="result-icon" />
            <span className="result-title">From:</span>
            <span className="result-content">{offer.polName}</span>
          </div>
          <div className="result-item-block-row">
            <Star className="result-icon" />
            <span className="result-title">{offer.amountTitle}: </span>
            <span className="result-content">
              {offer.amount}
              {offer.amountSymbol}
            </span>
          </div>
          <div className="result-item-block-row">
            <Star className="result-icon" />
            <span className="result-title">
              Price Per {offer.amountTitle} Measurement:{" "}
            </span>
            <span className="result-content">
              {offer.price && priceFormat(offer.price)}
            </span>
          </div>

          <div className="result-item-block-row">
            <Calendar className="result-icon" />
            <span className="result-title">Departure Date: </span>
            <span className="result-content">
              {offer.departureDate && dateFormatUtc(offer.departureDate)}
            </span>
          </div>
        </div>
        <div className="result-item-block">
          <div className="result-item-block-row">
            <Location className="result-icon" />
            <span className="result-title">To:</span>
            <span className="result-content">{offer.podName}</span>
          </div>
          <div className="result-item-block-row">
            <Ship className="result-icon" />
            <span className="result-title">Vessel:</span>
            <span className="result-content">{offer.vesselName}</span>
          </div>
          <div className="result-item-block-row">
            <Box className="result-icon" />
            <span className="result-title">Voyage:</span>
            <span className="result-content">{offer.voyage}</span>
          </div>
          <div className="result-item-block-row">
            <Calendar className="result-icon" />
            <span className="result-title">Arrival Date: </span>
            <span className="result-content">
              {offer.arrivalDate && dateFormatUtc(offer.arrivalDate)}
              {offer.period && ` (${offer.period} days)`}
            </span>
          </div>
        </div>
        <div className="result-item-block result-total-block">
          <div className="result-total display-desktop-640">
            Total (est.){" "}
            <span className="result-total-price">
              ${offer.price * offer.amount}
            </span>
          </div>
          <div className="result-buttons">
            <button
              onClick={() => setIsShowing(true)}
              className="button-blue-1"
              type="button"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      {isShowing && <Book onCloseButtonClick={toggle} offer={offer} />}
    </div>
  );
}

ResultItem.propTypes = {
  offer: PropTypes.shape({
    carrierName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    amountTitle: PropTypes.string.isRequired,
    amountSymbol: PropTypes.string.isRequired,
    polName: PropTypes.string.isRequired,
    podName: PropTypes.string.isRequired,
    vesselName: PropTypes.string.isRequired,
    voyage: PropTypes.string.isRequired,
    departureDate: PropTypes.string,
    arrivalDate: PropTypes.string,
    isLowPrice: PropTypes.bool,
  }).isRequired,
};

export default ResultItem;
