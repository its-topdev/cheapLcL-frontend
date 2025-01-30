import { useEffect } from 'react';
import PortalReactDOM from 'react-dom';
import { toast } from 'react-toastify';
import { API_URL } from "../../../constants/config";
import ChargeForm from "./ChargeForm";
import CloseModal from '../../CloseModal';
import useFetch from '../../../hooks/useFetch';
import "./style.scss";

export default function ChargeAddModal({show, onFetchCharges, onCloseButtonClick}) {

    const { data: chargeData, fetchData: fetchAddCharge, loading: chargeLoading } = useFetch();

    useEffect(() => {
      if (chargeData != null) {
          toast.success('created successfully');
          onFetchCharges();
          onCloseButtonClick(true);
      }
    }, [chargeData]);

    const addCharge = async(data) => {
      const payload = {
        name: data.name,
        price: data.price,
        type: data.type && data.type.value,
      }
      await fetchAddCharge(`${API_URL}charge/create`, 'post', payload);
    }

    return PortalReactDOM.createPortal(
        <div className={`charge-modal modal-wrapper ${show ? 'show-modal' : 'hide-modal'}`}>
            <div className="modal">
                <CloseModal onClose={onCloseButtonClick} />
                <h2 className="charge-modal-first-title">Create Charge</h2>
                <h3 className="charge-modal-second-title">Please Enter the Details below:</h3>
                <ChargeForm onSubmitForm={addCharge} eventOnCloseButtonClick={onCloseButtonClick} loadingCharge={chargeLoading} />
            </div>
        </div>
        , document.body
    );
}