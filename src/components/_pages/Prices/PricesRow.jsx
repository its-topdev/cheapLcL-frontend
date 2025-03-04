import { toast } from "react-toastify";
import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import PropTypes from "prop-types";
import { API_URL } from "../../../constants/config";
import { priceFormat } from "../../../constants/general";
import { Trash, Mark, Pencil } from "../../../constants/icons";
// import useModal from "../../../hooks/useModal";
// import ChargeEditModal from "./ChargeEditModal";
import useFetch from "../../../hooks/useFetch";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loader from "../../Loader/Loader";

export default function PricesRow({ price, onFetchPrices }) {
  // const [isShowing, toggle, setIsShowing] = useModal("");

  const {
    data: priceData,
    fetchData: fetchDeletePrice,
    loading: priceLoading,
  } = useFetch();

  useEffect(() => {
    if (priceData != null) {
      toast.success("deleted successfully");
      onFetchPrices();
    }
  }, [priceData]);

  // const editRow = () => {
  //     setIsShowing(true);
  // }

  const deletePrice = async () => {
    await fetchDeletePrice(`${API_URL}prices/${price.id}/delete`, "post");
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
              Are you sure you want to delete the price?
            </p>
            <div className="custom-confirm-alert-buttons">
              <button onClick={onClose} className="confirm-no">
                CANCEL
              </button>
              <button
                onClick={() => {
                  deletePrice();
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
      <tr>
        <td>{price.polObj.name}</td>
        <td>{price.podObj.name}</td>
        <td>{price.price && priceFormat(price.price)}</td>
        <td className="action">
          <button
            onClick={() => {}}
            className="prices-edit-button disabled"
            type="button"
            disabled
          >
            <Pencil />
          </button>
          <button
            onClick={deleteRow}
            className="prices-delete-button disabled"
            type="button"
            disabled
          >
            {priceLoading ? <Loader></Loader> : <Trash />}
          </button>
        </td>
      </tr>
      {/* { isShowing && <PriceEditModal show={isShowing} onFetchPrices={onFetchPrices} price={price} toggle={toggle} /> } */}
    </>
  );
}

PricesRow.propTypes = {
  price: PropTypes.object.isRequired,
  onFetchPrices: PropTypes.func.isRequired,
};
