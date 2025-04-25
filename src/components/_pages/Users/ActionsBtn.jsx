import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import useModal from "../../../hooks/useModal";
import UserEditModal from "./UserEditModal";
import { userStatus } from "../../../constants/userStatus";
import { API_URL } from "../../../constants/config";
import { Pencil, Trash, Mark } from "../../../constants/icons";
import Loader from "../../Loader/Loader";
import useFetch from "../../../hooks/useFetch";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function ActionsBtn({ user, onFetchUsers }) {
  const [isShowing, toggle, setIsShowing] = useModal("");

  const {
    data: aproveUserData,
    loading: approveIsLoading,
    fetchData: fetchApprove,
  } = useFetch();
  const {
    data: declineUserData,
    loading: declineIsLoading,
    fetchData: fetchDecline,
  } = useFetch();
  const {
    data: deleteUserData,
    loading: deleteIsLoading,
    fetchData: fetchDelete,
  } = useFetch();

  useEffect(() => {
    if (aproveUserData != null) {
      toast("User update suessfully!");
      onFetchUsers();
    }
  }, [aproveUserData]);

  useEffect(() => {
    if (declineUserData != null) {
      toast("User update suessfully!");
      onFetchUsers();
    }
  }, [declineUserData]);

  useEffect(() => {
    if (deleteUserData != null) {
      toast.success("deleted successfully");
      onFetchUsers();
    }
  }, [deleteUserData]);

  const editRow = () => {
    setIsShowing(true);
  };

  const declineUser = async () => {
    const payload = { status: userStatus.REJECTED };
    await fetchDecline(
      `${API_URL}user/${user.id}/update-status`,
      "post",
      payload,
      true,
    );
  };

  const approveUser = async () => {
    const payload = { status: userStatus.CONFIRMED };
    await fetchApprove(
      `${API_URL}user/${user.id}/update-status`,
      "post",
      payload,
      true,
    );
  };

  const deleteUser = async () => {
    await fetchDelete(`${API_URL}user/${user.id}/delete`, "post", {}, true);
  };

  const approveRow = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-confirm-alert">
            <div className="custom-confirm-alert-icon">
              <Mark />
            </div>
            <h1 className="custom-confirm-alert-title">Confirm to Approve</h1>
            <p className="custom-confirm-alert-text blue-text">
              Are you sure you want to approve the user?
            </p>
            <p className="custom-confirm-alert-text-small">
              Note, an email will be sent to the customer
            </p>
            <div className="custom-confirm-alert-buttons">
              <button onClick={onClose} className="confirm-no">
                CANCEL
              </button>
              <button
                onClick={() => {
                  approveUser();
                  onClose();
                }}
                className="confirm-yes"
              >
                APPROVE
              </button>
            </div>
          </div>
        );
      },
    });
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
              Are you sure you want to delete the user?
            </p>
            <div className="custom-confirm-alert-buttons">
              <button onClick={onClose} className="confirm-no">
                CANCEL
              </button>
              <button
                onClick={() => {
                  deleteUser();
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
        onClick={declineUser}
        className={`action-user-btn decline ${user.user_status == userStatus.REJECTED ? "disable-button" : ""}`}
      >
        {declineIsLoading ? <Loader /> : "Decline"}
      </button>
      <button
        onClick={approveRow}
        className={`action-user-btn approve ${user.user_status == userStatus.CONFIRMED ? "disable-button" : ""}`}
      >
        {approveIsLoading ? <Loader /> : "Approve"}
      </button>
      <button onClick={editRow} className="user-edit-button" type="button">
        <Pencil />
      </button>
      <button onClick={deleteRow} className="user-delete-button" type="button">
        {deleteIsLoading ? <Loader /> : <Trash />}
      </button>
      {isShowing && (
        <UserEditModal
          show={isShowing}
          onFetchUsers={onFetchUsers}
          user={user}
          toggle={toggle}
        />
      )}
    </>
  );
}
