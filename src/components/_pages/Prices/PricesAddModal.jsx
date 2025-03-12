import { useEffect } from "react";
import PortalReactDOM from "react-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/config";
import PricesForm from "./PricesForm";
import CloseModal from "../../CloseModal";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

export default function PricesAddModal({
  show,
  onFetchPrices,
  onCloseButtonClick,
}) {
  const {
    data: pricesData,
    loading: pricesIsLoading,
    fetchData: fetchAddPrices,
  } = useFetch();

  useEffect(() => {
    if (pricesData != null) {
      toast.success("Prices created successfully");
      onFetchPrices();
      onCloseButtonClick(true);
    }
  }, [pricesData]);

  const addPrices = async (data) => {
    const payload = {
      startDate: data.startDate,
      endDate: data.endDate,
      price: data.price,
      polObj: data.polObj,
      podObj: data.podObj,
    };
    await fetchAddPrices(`${API_URL}prices/create`, "post", payload, true);
  };

  return PortalReactDOM.createPortal(
    <div
      className={`prices-modal modal-wrapper ${
        show ? "show-modal" : "hide-modal"
      }`}
    >
      <div className="modal">
        <CloseModal onClose={onCloseButtonClick} />
        <h2 className="prices-modal-first-title">Create Prices</h2>
        <h3 className="prices-modal-second-title">
          Please Enter the Details below:
        </h3>
        <PricesForm
          loadingSubmit={pricesIsLoading}
          onSubmitForm={addPrices}
          eventOnCloseButtonClick={onCloseButtonClick}
          prices={null}
        />
      </div>
    </div>,
    document.body,
  );
}
