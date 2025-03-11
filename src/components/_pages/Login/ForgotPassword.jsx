import { useState, useEffect, useContext } from "react";
import HeaderInner from "../../HeaderInner";
import FooterSignup from "../../FooterSignup";
import WindowSizeContext from "../../../contexts/WindowSizeContext";
import { MailIcon } from "../../../constants/icons";
import { API_URL } from "../../../constants/config";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../Loader/Loader";
import "./style.scss";

function ForgotPassword() {
  const { windowHeight } = useContext(WindowSizeContext);
  const [email, setEmail] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const {
    data: forgotPassData,
    loading: forgotIsLoading,
    fetchData: fetchForgotPass,
  } = useFetch();

  const hasScroll = windowHeight < 507 ? true : false;

  useEffect(() => {
    if (forgotPassData) {
      setVerificationSent(true);
    }
  }, [forgotPassData]);

  const getForgotPassMsg = () => {
    return (
      <h2 className="login-text">Go to your email and click attach link</h2>
    );
  };

  const getPasswordForm = () => {
    return (
      <div>
        <h2 className="login-text">
          Provide your email address below, and well send you a link to reset
          your password.
        </h2>
        <form className="login-form">
          <div className="login-form-input">
            <label htmlFor="input-email">Email</label>
            <input
              id="input-email"
              type="email"
              className="input-text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
            />
            <MailIcon className="icon-left forgot-password-icon" />
          </div>
          <button
            className="login-form-button button-blue-1"
            onClick={handleSubmit}
            type="submit"
          >
            {forgotIsLoading ? <Loader /> : "Submit"}
          </button>
        </form>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
    };
    fetchForgotPass(`${API_URL}user/reset-password`, "post", payload);
  };

  return (
    <div className={`login ${hasScroll ? "has-scroll" : "no-scroll"}`}>
      <div className="login-background display-mobile-720"></div>
      <div className="login-wrapper">
        <HeaderInner />
        <div className="login-content">
          <h1 className="login-title">Forgot Password?</h1>
          {verificationSent ? getForgotPassMsg() : getPasswordForm()}
        </div>
        <FooterSignup className={"display-desktop-720"} />
      </div>
      <FooterSignup className={"display-mobile-720"} />
    </div>
  );
}

export default ForgotPassword;
