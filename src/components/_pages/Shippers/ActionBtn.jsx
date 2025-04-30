import { useEffect } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import PropTypes from "prop-types";
import { API_URL } from "../../../constants/config";
import { Pencil, Trash, Mark } from "../../../constants/icons";
import Loader from "../../Loader/Loader";
import useModal from "../../../hooks/useModal";
import PricesEditModal from "./ShipperEditModal";
import useFetch from "../../../hooks/useFetch";
// import { MANUAL_PORTS } from "../../../constants/ports";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function ActionsBtn({ priceData, onFetchPrices }) {
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
      toast.success("Prices deleted successfully");
      onFetchPrices();
    }
  }, [deleteData]);

  const deletePrices = async () => {
    await fetchDelete(
      `${API_URL}prices/${priceData.id}/delete`,
      "post",
      {},
      true,
    );
  };

  // const isManualPort = MANUAL_PORTS.map((port) => port.value).includes(
  //   priceData.pol,
  // );

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
              Are you sure you want to delete the price?
            </p>
            <div className="custom-confirm-alert-buttons">
              <button onClick={onClose} className="confirm-no">
                CANCEL
              </button>
              <button
                onClick={() => {
                  deletePrices();
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
      <button
        onClick={editRow}
        className={`prices-edit-button`}
        type="button"
      // disabled={!isManualPort}
      >
        <Pencil />
      </button>
      <button
        onClick={deleteRow}
        className={`prices-delete-button`}
        type="button"
      // disabled={!isManualPort}
      >
        {deleteIsLoading ? <Loader /> : <Trash />}
      </button>
      {isShowing && (
        <PricesEditModal
          show={isShowing}
          onFetchPrices={onFetchPrices}
          priceData={priceData}
          toggleEditModal={toggle}
        />
      )}
    </>
  );
}

ActionsBtn.propTypes = {
  priceData: PropTypes.object.isRequired,
  onFetchPrices: PropTypes.func.isRequired,
};
