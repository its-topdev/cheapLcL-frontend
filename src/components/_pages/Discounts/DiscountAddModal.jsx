import { useEffect } from "react";
import PortalReactDOM from "react-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/config";
import DiscountForm from "./DiscountForm";
import CloseModal from "../../CloseModal";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

export default function DiscountAddModal({
  show,
  onFetchDiscounts,
  onCloseButtonClick,
}) {
  const {
    data: discountData,
    loading: discountIsLoading,
    fetchData: fetchAddDiscount,
  } = useFetch();

  useEffect(() => {
    if (discountData != null) {
      toast.success("Discount Plan created successfully");
      onFetchDiscounts();
      onCloseButtonClick(true);
    }
  }, [discountData]);

  const addDiscount = async (data) => {
    const payload = {
      startDate: data.startDate,
      endDate: data.endDate,
      fixedDiscount: data.fixedDiscount,
      weeklyDiscount: data.weeklyDiscount,
    };
    await fetchAddDiscount(`${API_URL}discount/create`, "post", payload, true);
  };

  return PortalReactDOM.createPortal(
    <div
      className={`discount-modal modal-wrapper ${
        show ? "show-modal" : "hide-modal"
      }`}
    >
      <div className="modal">
        <CloseModal onClose={onCloseButtonClick} />
        <h2 className="discount-modal-first-title">Create Discount Plan</h2>
        <h3 className="discount-modal-second-title">
          Please Enter the Details below:
        </h3>
        <DiscountForm
          loadingSubmit={discountIsLoading}
          onSubmitForm={addDiscount}
          eventOnCloseButtonClick={onCloseButtonClick}
        />
      </div>
    </div>,
    document.body,
  );
}
