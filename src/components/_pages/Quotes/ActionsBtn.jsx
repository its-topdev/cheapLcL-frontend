import { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/config";
import { bookStatus } from "../../../constants/bookStatus";
import { Mark } from "../../../constants/icons";
import Loader from "../../Loader/Loader";
import useFetch from "../../../hooks/useFetch";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function ActionsBtn({ quote, onfetchQuotes }) {
  const {
    data: restoreData,
    loading: restoreIsLoading,
    fetchData: fetchRestore,
  } = useFetch();
  const {
    data: cancelData,
    loading: cancelIsLoading,
    fetchData: fetchCancel,
  } = useFetch();

  useEffect(() => {
    if (restoreData != null) {
      toast.success("restored successfully");
      onfetchQuotes();
    }
  }, [restoreData]);

  useEffect(() => {
    if (cancelData != null) {
      toast.success("cancelled successfully, An email went out to the user");
      onfetchQuotes();
    }
  }, [cancelData]);

  const restoreBook = async () => {
    const payload = { status: bookStatus.CREATED };
    await fetchRestore(
      `${API_URL}book/${quote.id}/update-status`,
      "post",
      payload,
      true,
    );
  };

  const cancelBook = async () => {
    const payload = { status: bookStatus.CANCELLED };
    await fetchCancel(
      `${API_URL}book/${quote.id}/update-status`,
      "post",
      payload,
      true,
    );
  };

  const cancelRow = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-confirm-alert cancel-quote">
            <div className="custom-confirm-alert-icon">
              <Mark />
            </div>
            <h1 className="custom-confirm-alert-title">Confirm to Cancel</h1>
            <p className="custom-confirm-alert-text blue-text">
              Are you sure you want to cancel the book?
            </p>
            <p className="custom-confirm-alert-text-small">
              Note, an email will be sent to the customer
            </p>
            <div className="custom-confirm-alert-buttons">
              <button onClick={onClose} className="confirm-no">
                NO
              </button>
              <button
                onClick={() => {
                  cancelBook();
                  onClose();
                }}
                className="confirm-yes"
              >
                YES
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const restoreRow = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-confirm-alert">
            <div className="custom-confirm-alert-icon">
              <Mark />
            </div>
            <h1 className="custom-confirm-alert-title">Confirm to Restore</h1>
            <p className="custom-confirm-alert-text">
              Are you sure you want to restore the book?
            </p>
            <div className="custom-confirm-alert-buttons">
              <button onClick={onClose} className="confirm-no">
                NO
              </button>
              <button
                onClick={() => {
                  restoreBook();
                  onClose();
                }}
                className="confirm-yes"
              >
                YES
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <>
      {(!quote.bookStatus ||
        (quote.bookStatus && quote.bookStatus.id != bookStatus.CANCELLED)) && (
          <button className="quote-row-cancel" type="button" onClick={cancelRow}>
            {cancelIsLoading ? <Loader /> : "Cancel"}
          </button>
        )}
      {quote.bookStatus && quote.bookStatus.id != bookStatus.CREATED && (
        <button
          className="quote-row-restore"
          type="button"
          onClick={restoreRow}
        >
          {restoreIsLoading ? <Loader /> : "Restore"}
        </button>
      )}
    </>
  );
}
