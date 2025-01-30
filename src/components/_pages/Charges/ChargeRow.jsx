import { toast } from "react-toastify";
import { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { API_URL } from "../../../constants/config";
import { priceFormat } from "../../../constants/general";
import { Trash, Mark } from "../../../constants/icons"; 
import useModal from "../../../hooks/useModal";
import ChargeEditModal from "./ChargeEditModal";
import useFetch from '../../../hooks/useFetch';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Loader from "../../Loader/Loader";

export default function ChargeRow({ charge, onFetchCharges }) {
    const [isShowing, toggle, setIsShowing] = useModal('');
    
    const { data: chargeData, fetchData: fetchDeleteCharge, loading: chargeLoading } = useFetch();

    useEffect(() => {
      if (chargeData != null) {
            toast.success('deleted successfully');
            onFetchCharges();
      }
    }, [chargeData]);

    const editRow = () => {
        setIsShowing(true);
    }

    const deleteCharge = async() => {
            await fetchDeleteCharge(`${API_URL}charge/${charge.id}/delete`, 'post');
    }

    const deleteRow = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                  <div className="custom-confirm-alert">
                    <div className="custom-confirm-alert-icon"><Mark /></div>                    
                    <h1 className="custom-confirm-alert-title">Confirm to delete</h1>
                    <p className="custom-confirm-alert-text">Are you sure you want to delete the charge?</p>
                    <div className="custom-confirm-alert-buttons">
                        <button onClick={onClose} className='confirm-no'>CANCEL</button>
                        <button onClick={() => {deleteCharge();onClose();}} className='confirm-yes'>
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
            <tr>
                <td>{charge.name}</td>
                <td>{charge.price && priceFormat(charge.price)}</td>
                <td>{charge.chargeType && charge.chargeType.name}</td>
                {/* <td className="action"><button onClick={editRow} className="charge-edit-button" type="button"><Pencil /></button></td> */}
                <td className="action"><button onClick={deleteRow} className="charge-delete-button" type="button">{chargeLoading ? <Loader></Loader> : <Trash />}</button></td>                
            </tr>
            { isShowing && <ChargeEditModal show={isShowing} onFetchCharges={onFetchCharges} charge={charge} toggle={toggle} /> }
        </>
    );
}