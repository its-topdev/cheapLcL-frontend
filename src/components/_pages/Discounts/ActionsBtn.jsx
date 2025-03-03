import { useEffect } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import PropTypes from "prop-types";
import { API_URL } from "../../../constants/config";
import { Pencil, Trash, Mark } from "../../../constants/icons";
import Loader from "../../Loader/Loader";
import useModal from "../../../hooks/useModal";
import DiscountEditModal from "./DiscountEditModal";
import useFetch from "../../../hooks/useFetch";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function ActionsBtn({ discount, onFetchDiscounts }) {
  const [isShowing, toggle, setIsShowing] = useModal("");
  const {
    data: deleteData,
    loading: deleteIsLoading,
    fetchData: fetchDelete,
  } = useFetch();

  const editRow = () => {
    setIsShowing(true);
  };

  useEffect(() => {
    if (deleteData != null) {
      toast.success("Discount plan deleted successfully");
      onFetchDiscounts();
    }
  }, [deleteData]);

  const deleteDiscount = async () => {
    await fetchDelete(
      `${API_URL}discount/${discount.id}/delete`,
      "post",
      {},
      true
    );
  };

  const deleteRow = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-confirm-alert">
            <div className="custom-confirm-alert-icon">
              <Mark />
            </div>
            <h1 className="custom-confirm-alert-title">Confirm to delete</h1>
            <p className="custom-confirm-alert-text">
              Are you sure you want to delete the discount plan?
            </p>
            <div className="custom-confirm-alert-buttons">
              <button onClick={onClose} className="confirm-no">
                CANCEL
              </button>
              <button
                onClick={() => {
                  deleteDiscount();
                  onClose();
                }}
                className="confirm-yes"
              >
                DELETE
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <>
      <button onClick={editRow} className="discount-edit-button" type="button">
        <Pencil />
      </button>
      <button
        onClick={deleteRow}
        className="discount-delete-button"
        type="button"
      >
        {deleteIsLoading ? <Loader /> : <Trash />}
      </button>
      {isShowing && (
        <DiscountEditModal
          show={isShowing}
          onFetchDiscounts={onFetchDiscounts}
          discount={discount}
          toggle={toggle}
        />
      )}
    </>
  );
}

ActionsBtn.propTypes = {
  discount: PropTypes.object.isRequired,
  onFetchDiscounts: PropTypes.func.isRequired,
};
