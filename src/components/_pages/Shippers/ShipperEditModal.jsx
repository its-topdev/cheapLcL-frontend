import { useEffect } from "react";
import PortalReactDOM from "react-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/config";
import PricesForm from "./ShippersForm";
import CloseModal from "../../CloseModal";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

export default function PricesEditModal({
  show,
  onFetchPrices,
  toggleEditModal,
  priceData,
}) {
  const {
    data: pricesData,
    loading: pricesIsLoading,
    fetchData: fetchEditPrices,
  } = useFetch();

  useEffect(() => {
    if (pricesData != null) {
      toast.success("Prices updated successfully");
      onFetchPrices();
      toggleEditModal(true);
    }
  }, [pricesData, onFetchPrices, toggleEditModal]);

  const editPrices = async (data) => {
    const payload = {
      validFrom: data.startDate,
      validTo: data.endDate,
      price: data.price,
      pol: data.pol,
      pod: data.pod,
    };
    await fetchEditPrices(
      `${API_URL}prices/${priceData.id}/edit`,
      "post",
      payload,
      true,
    );
  };

  return PortalReactDOM.createPortal(
    <div
      className={`prices-modal modal-wrapper ${show ? "show-modal" : "hide-modal"
        }`}
    >
      <div className="modal">
        <CloseModal onClose={toggleEditModal} />
        <h2 className="prices-modal-first-title">Edit Prices</h2>
        <h3 className="prices-modal-second-title">
          Please Enter the Details below:
        </h3>
        <PricesForm
          loadingSubmit={pricesIsLoading}
          onSubmitForm={editPrices}
          eventOnCloseButtonClick={toggleEditModal}
          priceData={priceData}
        />
      </div>
    </div>,
    document.body,
  );
}
