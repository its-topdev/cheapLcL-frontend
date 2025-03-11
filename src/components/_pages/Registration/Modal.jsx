import React from "react";
import PortalReactDOM from "react-dom";
import { ViIcon } from "../../../constants/icons";

const Modal = ({ onCloseButtonClick }) => {
  // if (!show) {
  //   return null;
  // }

  return PortalReactDOM.createPortal(
    <div className="modal-wrapper congratulations">
      <div className="modal">
        <div className="modal-body-block">
          <ViIcon />
          <h3 className="modal-title-block">Congratulations!</h3>
          <p className="modal-text">
            Thank you for your submission, we will review the information and
            get in touch with you via email to confirm your access
          </p>
        </div>
        <div className="modal-footer-block">
          <button
            type="button"
            className="button-blue-1"
            onClick={onCloseButtonClick}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
