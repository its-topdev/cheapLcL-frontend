import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import HeaderInner from '../../HeaderInner';
import FooterSignup from '../../FooterSignup';
import WindowSizeContext from '../../../contexts/WindowSizeContext';
import { LockIcon, EyeIcon, EyeNoIcon } from '../../../constants/icons';
import { API_URL } from '../../../constants/config';
import { passwordInvalidError, passwordRegex } from '../../../constants/general';
import useTogglePassword from '../../../hooks/useTogglePassword';
import useFetch from '../../../hooks/useFetch';
import Loader from '../../Loader/Loader';
import "./style.scss";

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordType, handleTogglePassword] = useTogglePassword();
  const [searchParams] = useSearchParams();
  const { data: resetPassData, loading: resetIsLoading, fetchData: fetchResetPass } = useFetch();
  const { windowHeight } = useContext(WindowSizeContext);
  const navigate = useNavigate();
  searchParams.get("__firebase_request_key");
  

  const hasScroll =  windowHeight < 455 ? true : false;

  useEffect(() => {
    if (resetPassData) {
      toast("password update successfully!");
      navigate('/login');
    }
  }, [resetPassData]);

  const validatePass = () => {
    const pattern = passwordRegex;
    return pattern.test(password);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePass()) {
      toast(passwordInvalidError, { toastId: 'error5'});
      return;
    }
    const payload = {
      'password': password,
      'token': searchParams.get("token"),
    };
    fetchResetPass(`${API_URL}user/update-password`, 'post', payload);

  }

  return (
    <div className={`login ${hasScroll ? 'has-scroll' : 'no-scroll'}`}>
      <div className="login-background display-mobile-720"></div>
      <div className="login-wrapper">
        <HeaderInner />
        <div className="login-content">
          <h1 className="login-title">Reset Password</h1>
          <h2 className="login-text">Please enter new password</h2>
          <form className="login-form">
            <div className="login-form-input">
              <label htmlFor="input-email">Password</label>
              <input
                type={passwordType}
                className="input-text"
                value={password}
                autoComplete="on"
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your Password"
              />
              <LockIcon className="icon-left" />
              <button className={`icon-eye ${passwordType}`} type="button" onClick={handleTogglePassword}>{passwordType === 'password' ? <EyeNoIcon /> : <EyeIcon />}</button>
            </div>
            <button className="login-form-button button-blue-1" onClick={handleSubmit} type="submit">{resetIsLoading ? <Loader /> : 'Update'}</button>
          </form>
        </div>
        <FooterSignup className={'display-desktop-720'}/>
      </div>
      <FooterSignup className={'display-mobile-720'}/>
    </div>
  );
}

export default ResetPassword;