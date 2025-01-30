import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';
import { API_URL } from "../../../constants/config";
import { Pencil, Trash, Mark } from "../../../constants/icons";
import Loader from '../../Loader/Loader'; 
import useModal from "../../../hooks/useModal";
import RouteEditModal from "./RouteEditModal";
import useFetch from '../../../hooks/useFetch';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function ActionsBtn({ route, onFetchRoutes }) {
    const [isShowing, toggle, setIsShowing] = useModal('');
    const { data: deleteData, loading: deleteIsLoading, fetchData: fetchDelete } = useFetch();
    
    const editRow = () => {
        setIsShowing(true);
    }

    useEffect(() => {
        if (deleteData != null) {
                toast.success('deleted successfully');
                onFetchRoutes();

        }
    }, [deleteData]);

    const deleteRoute = async() => {
            await fetchDelete(`${API_URL}price/${route.id}/delete`, 'post', {});

    }

    const deleteRow = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className="custom-confirm-alert">
                    <div className="custom-confirm-alert-icon"><Mark /></div>                    
                    <h1 className="custom-confirm-alert-title">Confirm to delete</h1>
                    <p className="custom-confirm-alert-text">Are you sure you want to delete the route?</p>
                    <div className="custom-confirm-alert-buttons">
                        <button onClick={onClose} className='confirm-no'>CANCEL</button>
                        <button onClick={() => {deleteRoute();onClose();}} className='confirm-yes'>
                        DELETE
                        </button>
                    </div>
                  </div>
                );
              }
          });
    };

    return (
        <>
            <button onClick={editRow} className="route-edit-button" type="button"><Pencil /></button>
            <button onClick={deleteRow} className="route-delete-button" type="button">{deleteIsLoading ? <Loader /> : <Trash />}</button>               
            { isShowing && <RouteEditModal show={isShowing} onFetchRoutes={onFetchRoutes} route={route} toggle={toggle} /> }
        </>
    );
}