import {useEffect } from 'react';
import PortalReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import { API_URL } from "../../../constants/config";
import UserForm from "./UserForm";
import CloseModal from "../../CloseModal";
import useFetch from '../../../hooks/useFetch';
import "./style.scss";

export default function UserAddModal({show, onFetchUsers, onCloseButtonClick}) {
    const { data: userData, loading: userIsLoading, fetchData: fetchAddUser } = useFetch();

    useEffect(() => {
      if (userData != null) {
          toast.success('created successfully');
          onFetchUsers();
          onCloseButtonClick(true);
      }
    }, [userData]);

    const addUser = async(data) => {
      const payload = {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        role: data.role && data.role.value,
        password: data.password
      }
      await fetchAddUser(`${API_URL}user/create`, 'post', payload);
    }

    return PortalReactDOM.createPortal(
        <div className={`user-modal modal-wrapper ${show ? 'show-modal' : 'hide-modal'}`}>
            <div className="modal">
                <CloseModal onClose={onCloseButtonClick} />
                <h2 className="user-modal-first-title">Create User</h2>
                <h3 className="user-modal-second-title">Please Enter the Details below:</h3>
                <UserForm loadingSubmit={userIsLoading} onSubmitForm={addUser} eventOnCloseButtonClick={onCloseButtonClick} />
            </div>
        </div>
        , document.body
    );
}