import { useState, useEffect } from "react";
import PortalReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Checkbox from "../../Checkbox";
import CloseModal from "../../CloseModal";
import { API_URL } from "../../../constants/config";
import { dateFormatUtc, priceFormat } from "../../../constants/general";
import { Calendar, Location, Ship, Box, Star } from "../../../constants/icons";
import Loader from "../../Loader/Loader";
import Charges from "./Charges";
import ShipperSelect from "../../Shipper/ShipperSelect";
import useFetch from "../../../hooks/useFetch";

import "./style.scss";

export default function Book({ onCloseButtonClick, offer }) {
  const [shipper, setShipper] = useState();
  const [notice, setNotice] = useState();
  const [subTotal, setSubtotal] = useState(0);
  const {
    data: bookData,
    loading: bookLoading,
    fetchData: fetchCreateBook,
  } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    if (bookData) {
      navigate("/book-confirmation", {
        state: { bookNumber: bookData && bookData.id },
      });
    }
  }, [bookData, navigate]);

  const submitBook = async () => {
    if (!shipper || !notice) {
      return;
    }
    const payload = {
      priceId: offer.id,
      basePrice: offer.price,
      weight: offer.weight,
      cbm: offer.cbm,
      shipperId: shipper.id,
    };
    fetchCreateBook(`${API_URL}book/create`, "post", payload);
  };

  const oceanFreight = parseFloat(offer.price) * parseFloat(offer.amount);

  return PortalReactDOM.createPortal(
    <div className="book_page modal-wrapper show-modal">
      <div className="modal">
        <CloseModal onClose={onCloseButtonClick} />
        <div className="book-titles">
          <h2 className="book-title">Book Now</h2>
          <h3 className="book-second-title">
            Quote details are given below...
          </h3>
        </div>
        <div className="book-details">
          {offer && (
            <div className="book-item">
              <span className="book-item-carrier">{offer.carrierName}</span>
              <div className="book-item-wrap-blocks row">
                <div className="book-item-block col-md-6">
                  <div className="book-item-block-row">
                    <Location className="book-item-icon" />
                    <span className="book-item-title">From:</span>
                    <span className="book-item-content">{offer.polName}</span>
                  </div>
                  <div className="book-item-block-row">
                    <Star className="book-item-icon" />
                    <span className="book-item-title">
                      {offer.amountTitle}:{" "}
                    </span>
                    <span className="book-item-content">
                      {offer.amount}
                      {offer.amountSymbol}
                    </span>
                  </div>
                  <div className="book-item-block-row">
                    <Star className="book-item-icon" />
                    <span className="book-item-title">
                      Price Per {offer.amountTitle}:{" "}
                    </span>
                    <span className="book-item-content">
                      {offer.price && priceFormat(offer.price)}
                    </span>
                  </div>

                  <div className="book-item-block-row">
                    <Calendar className="book-item-icon" />
                    <span className="book-item-title">Departure Date: </span>
                    <span className="book-item-content">
                      {offer.departureDate &&
                        dateFormatUtc(offer.departureDate)}
                    </span>
                  </div>
                </div>
                <div className="book-item-block col-md-6">
                  <div className="book-item-block-row">
                    <Location className="book-item-icon" />
                    <span className="book-item-title">To:</span>
                    <span className="book-item-content">{offer.podName}</span>
                  </div>
                  <div className="book-item-block-row">
                    <Ship className="book-item-icon" />
                    <span className="book-item-title">Vessel:</span>
                    <span className="book-item-content">
                      {offer.vesselName}
                    </span>
                  </div>
                  <div className="book-item-block-row">
                    <Box className="book-item-icon" />
                    <span className="book-item-title">Voyage:</span>
                    <span className="book-item-content">{offer.voyage}</span>
                  </div>
                  <div className="book-item-block-row">
                    <Calendar className="book-item-icon" />
                    <span className="book-item-title">Arrival Date: </span>
                    <span className="book-item-content">
                      {offer.arrivalDate && dateFormatUtc(offer.arrivalDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="shipper-block">
          <ShipperSelect shipper={shipper} onSetShipper={setShipper} />
        </div>
        <hr />
        <div className="book-total">
          <div className="book-total-oceam-freight">
            Ocean Freight: {priceFormat(oceanFreight)}
          </div>
          <Charges
            amount={offer.amount}
            totalGoods={oceanFreight}
            setSubtotal={setSubtotal}
          />
          <div className="book-total-subtotal">
            Subtotal: {priceFormat(subTotal)}
          </div>
        </div>
        <hr />
        <div className="book_notice">
          <Checkbox
            checkboxValue={notice}
            onSetCheckboxValue={setNotice}
            label="The goods that you want to be transport are <strong>non-hazardous</strong>!"
          />
        </div>
        <div className="book_submit">
          {!shipper || !notice ? (
            <Tooltip
              id="pay-message"
              style={{
                backgroundColor: "#153356",
                color: "white",
                borerRadius: "20px",
                maxWidth: "95%",
              }}
            />
          ) : (
            ""
          )}
          <button
            data-tooltip-id="pay-message"
            data-tooltip-content={`${!shipper ? "Select a Shipper" : ""}${
              !shipper && !notice ? " / " : ""
            }${!notice ? "Confirm notification of dangerous containers" : ""}`}
            className="button-blue-1"
            type="button"
            onClick={submitBook}
          >
            {bookLoading ? <Loader /> : "Pay By Invoice"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
