import PortalReactDOM from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/config";
import ChargeForm from "./ChargeForm";
import useFetch from "../../../hooks/useFetch";
import CloseModal from "../../CloseModal";
import "./style.scss";

export default function ChargeEditModal({
  show,
  onFetchCharges,
  toggle,
  charge,
}) {
  const { data: chargeData, fetchData: fetchEditCharge } = useFetch();

  useEffect(() => {
    if (chargeData != null) {
      toast.success("edited successfully");
      onFetchCharges();
      toggle(true);
    }
  }, [chargeData]);

  const editCharge = async (data) => {
    const payload = {
      name: data.name,
      price: data.price,
      type: data.type && data.type.value,
    };
    await fetchEditCharge(
      `${API_URL}charge/${charge.id}/edit`,
      "post",
      payload,
      true,
    );
  };

  return PortalReactDOM.createPortal(
    <div
      className={`charge-modal modal-wrapper ${
        show ? "show-modal" : "hide-modal"
      }`}
    >
      <div className="modal">
        <CloseModal onClose={toggle} />
        <h2 className="charge-modal-first-title">Edit Charge</h2>
        <h3 className="charge-modal-second-title">
          Please Edit the Details below:
        </h3>
        <ChargeForm
          onSubmitForm={editCharge}
          charge={charge}
          eventOnCloseButtonClick={toggle}
        />
      </div>
    </div>,
    document.body,
  );
}
