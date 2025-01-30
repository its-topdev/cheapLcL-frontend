import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRoles } from '../../../constants/userRoles';
import UserContext from '../../../contexts/UserContext';
import { API_URL } from '../../../constants/config';
import HeaderInner from '../../HeaderInner';
import FooterSignup from '../../FooterSignup';
import WindowSizeContext from '../../../contexts/WindowSizeContext';
import { PersonIcon, LockIcon, EyeIcon, EyeNoIcon } from '../../../constants/icons';
import Loader from '../../Loader/Loader';
import useTogglePassword from '../../../hooks/useTogglePassword';
import useFetch from '../../../hooks/useFetch';
import "./style.scss";

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, handleTogglePassword] = useTogglePassword();
  const { setCurrentUser } = useContext(UserContext);
  const { data: loginData, loading: loginIsLoading, fetchData: fetchLogin } = useFetch();
  const { windowHeight } = useContext(WindowSizeContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    }, []);

  useEffect(() => {
    if (loginData != null) {
      afterLogin();
    }
  }, [loginData]);

  const hasScroll = windowHeight < 583 ? true : false;

  const afterLogin = () => {
    const { name, role, token } = loginData;
    const isAdmin = (role == userRoles.ADMIN);
    localStorage.setItem("user", JSON.stringify({ name, role, isAdmin }));
    localStorage.setItem("token", token);
    setCurrentUser({ name, role, isAdmin });
    navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    doLoginUser();
  }

  const doLoginUser = async () => {
      const payload = { 'email': username, 'password': password };
      await fetchLogin(`${API_URL}user/login`, 'post', payload);
  }

  return (
    <div className={`login ${hasScroll ? 'has-scroll' : 'no-scroll'}`}>
      <div className="login-background display-mobile-720"></div>
      <div className="login-wrapper">
        <HeaderInner />
        <div className="login-content">
          <h1 className="login-title">Welcome Back!</h1>
          <h2 className="login-text">Enter your credentials to access your account.</h2>
          <form className="login-form">
            <div className="login-form-input">
              <label htmlFor="input-username">Username</label>
              <input
                id="input-username"
                type="text"
                className="input-text"
                value={username}
                onChange={e => setUserName(e.target.value)}
                placeholder="Enter your Username"
              />
              <PersonIcon className="icon-left" />
            </div>
            <div className="login-form-input">
              <label htmlFor="input-password">Password</label>
              <input
                id="input-password"
                type={passwordType}
                className="input-text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="on"
                placeholder="Enter your password" />
              <LockIcon className="icon-left" />
              <button className={`icon-eye ${passwordType}`} type="button" onClick={handleTogglePassword}>{passwordType === 'password' ? <EyeNoIcon /> : <EyeIcon />}</button>
            </div>
            <div className="forgot-password-link">
              <button onClick={() => { navigate('/forgot-password'); }} className="forgot-password-link-button" type="button">Forgot Password?</button>
            </div>
            <button className="login-form-button button-blue-1" onClick={handleSubmit} type="submit">{loginIsLoading ? <Loader /> : 'Login'}</button>
          </form>
        </div>
        <FooterSignup className={'display-desktop-720'}/>
      </div>
      <FooterSignup className={'display-mobile-720'}/>
    </div>
  );
}

export default Login;

