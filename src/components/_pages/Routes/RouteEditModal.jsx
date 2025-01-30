import PortalReactDOM from 'react-dom';
import {useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from "../../../constants/config";
import RouteForm from "./RouteForm";
import CloseModal from '../../CloseModal';
import useFetch from '../../../hooks/useFetch';
import "./style.scss";

export default function RouteEditModal({ show, onFetchRoutes, toggle, route}) {
    const { loading: routeIsLoading, data: routeData, fetchData: fetchEditRoute } = useFetch();

    useEffect(() => {
        if (routeData != null) {
            toast.success('edited successfully');
        onFetchRoutes();
        toggle(true);
          }
        }, [routeData]);

    const editRoute = async(data) => {
            const payload = {
                departureDate: data.etd,
                arrivalDate: data.eta,
                priceDate: data.priceDate,
                priceFirst: data.priceFirst,
                priceSecond: data.priceSecond,
                priceThird: data.priceThird,
                priceFourth: data.priceFourth,
            }
            await fetchEditRoute(`${API_URL}price/${route.id}/edit`, 'post', payload);
    }

    return PortalReactDOM.createPortal(
        <div className={`route-modal modal-wrapper ${show ? 'show-modal' : 'hide-modal'}`}>
            <div className="modal">
                <CloseModal onClose={toggle} />
                <h2 className="route-modal-first-title">Edit Route</h2>
                <h3 className="route-modal-second-title">Please Edit the Details below:</h3>
                <RouteForm loadingSubmit={routeIsLoading} onSubmitForm={editRoute} route={route} eventOnCloseButtonClick={toggle} />
            </div>
        </div>
        , document.body
    );
}