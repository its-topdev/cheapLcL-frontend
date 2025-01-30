import { useState, useEffect  } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants/config';
import { EmailOutlinedIcon } from "../../constants/icons"
import Loader from '../Loader/Loader';
import useFetch from "../../hooks/useFetch";
import "./style.scss";

function ReachUs() {
    const [message, setMessage] = useState('');
    const { data: reachUsData, loading: reachUsIsLoading, fetchData: fetchReachUs } = useFetch();

    useEffect(() => {
        if (reachUsData != null) {
            toast.success('message sent successfully');
            setMessage('');
        }
    }, [reachUsData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchReachUs(`${API_URL}general/reach-us`, 'post', {message}); 
    }

    return (
        <div className="reachus">
            <h3 className="reachus-title">Got a question?</h3>
            <div className="reachus-text">Use the form below to send us any question</div>
            <form className="reachus-form">
                {/* <label className="reachus-form-label" htmlFor="reachus">How can we help you?</label> */}
                <div className="reachus-form-textarea">
                    <EmailOutlinedIcon className="reachus-form-textarea-icon" />
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="reachus-form-textarea-element" name="reachus" rows={4} placeholder="How can we help you?" />
                </div>
                <div className="reachus-form-button"><button onClick={handleSubmit} disabled={message ? false : true} className="button-blue-1" type="submit">{ reachUsIsLoading ? <Loader /> : 'Submit' }</button></div>
            </form>
        </div>       
    );
}

export default ReachUs;