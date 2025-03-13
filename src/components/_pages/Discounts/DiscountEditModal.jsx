import PortalReactDOM from "react-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/config";
import DiscountForm from "./DiscountForm";
import CloseModal from "../../CloseModal";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

export default function DiscountEditModal({
  show,
  onFetchDiscounts,
  toggle,
  discount,
}) {
  const {
    loading: discountIsLoading,
    data: discountData,
    fetchData: fetchEditDiscount,
  } = useFetch();

  useEffect(() => {
    if (discountData != null) {
      toast.success("Discount plan edited successfully");
      onFetchDiscounts();
      toggle(true);
    }
  }, [discountData]);

  const editDiscount = async (data) => {
    const payload = {
      // startDate: data.startDate,
      // endDate: data.endDate,
      fixedDiscount: data.fixedDiscount,
      weeklyDiscount: data.weeklyDiscount,
    };
    await fetchEditDiscount(
      `${API_URL}discount/${discount.id}/edit`,
      "post",
      payload,
      true,
    );
  };

  return PortalReactDOM.createPortal(
    <div
      className={`discount-modal modal-wrapper ${
        show ? "show-modal" : "hide-modal"
      }`}
    >
      <div className="modal">
        <CloseModal onClose={toggle} />
        <h2 className="discount-modal-first-title">Edit Discount</h2>
        <h3 className="discount-modal-second-title">
          Please Edit the Details below:
        </h3>
        <DiscountForm
          loadingSubmit={discountIsLoading}
          onSubmitForm={editDiscount}
          discount={discount}
          eventOnCloseButtonClick={toggle}
        />
      </div>
    </div>,
    document.body,
  );
}
