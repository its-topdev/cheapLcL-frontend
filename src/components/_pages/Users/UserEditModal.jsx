import PortalReactDOM from 'react-dom';
import {useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from "../../../constants/config";
import UserForm from "./UserForm";
import CloseModal from '../../CloseModal';
import useFetch from '../../../hooks/useFetch';
import "./style.scss";

export default function UserEditModal({show, onFetchUsers, toggle, user}) {
    const { loading: editIsLoading, data: userData, fetchData: fetchEditUser } = useFetch();

    useEffect(() => {
        if (userData != null) {
            toast.success('edited successfully');
        onFetchUsers();
        toggle(true);
          }
        }, [userData]);

    const editUser = async(data) => {
            const payload = {
                name: data.name,
                email: data.email,
                company: data.company,
                phone: data.phone,
                role: data.role && data.role.value,
                password: data.password
            }
            await fetchEditUser(`${API_URL}user/${user.id}/edit`, 'post', payload);
    }

    return PortalReactDOM.createPortal(
        <div className={`user-modal modal-wrapper ${show ? 'show-modal' : 'hide-modal'}`}>
            <div className="modal">
                <CloseModal onClose={toggle} />
                <h2 className="user-modal-first-title">Edit User</h2>
                <h3 className="user-modal-second-title">Please Edit the Details below:</h3>
                <UserForm loadingSubmit={editIsLoading} onSubmitForm={editUser} user={user} eventOnCloseButtonClick={toggle} />
            </div>
        </div>
        , document.body
    );
}