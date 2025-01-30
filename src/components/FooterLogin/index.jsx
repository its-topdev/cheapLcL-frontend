import { useNavigate } from 'react-router-dom';
import "./style.scss";

export default function FooterLogin({className}){
    const navigate = useNavigate();

    return (
        <div className={`footer-login ${className}`}>Got an account? Proceed to
            <button onClick={() => {navigate('/login');}} className="footer-login-button" type="button">Login</button>
            for free!
        </div>
    );
}