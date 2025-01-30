import { useNavigate } from 'react-router-dom';
import "./style.scss";

export default function FooterSignup({className}){
    const navigate = useNavigate();

    return (
        <div className={`footer-signup ${className}`}>New here?
            <button onClick={() => {navigate('/registration');}} className="footer-signup-button" type="button">Sign up</button>
            for free!
        </div>
    );
}