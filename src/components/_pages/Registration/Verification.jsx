import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import WindowSizeContext from "../../../contexts/WindowSizeContext";
import { API_URL } from "../../../constants/config";
import HeaderInner from "../../HeaderInner";
import FooterLogin from "../../FooterLogin";
import { LockIcon } from "../../../constants/icons";
import Modal from "./Modal";
import Loader from "../../Loader/Loader";
import useModal from "../../../hooks/useModal";
import useFetch from "../../../hooks/useFetch";

function Verification() {
  const location = useLocation();
  const [code, setCode] = useState("");
  const { windowHeight } = useContext(WindowSizeContext);
  const [isShowing, toggle, setIsShowing] = useModal("");
  const {
    data: sendVerificationData,
    loading: sendVerificationIsLoading,
    fetchData: fetchSendVerification,
  } = useFetch();
  const {
    data: verificationData,
    loading: verificationIsLoading,
    fetchData: fetchVerification,
  } = useFetch();

  const navigate = useNavigate();
  const hasScroll = windowHeight < 676 ? true : false;

  useEffect(() => {
    if (sendVerificationData) {
      toast("Verification code sent successfully");
    }
  }, [sendVerificationData]);

  useEffect(() => {
    if (verificationData) {
      setCode("");
      setIsShowing(true);
    }
  }, [verificationData]);

  const resendCode = async () => {
    const payload = {
      email: location.state.email,
      name: location.state.name,
    };
    setCode("");
    fetchSendVerification(`${API_URL}user/send-verification`, "post", payload, true,);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verification();
  };
  const verification = async () => {
    const payload = {
      email: location.state.email,
      code: code,
    };
    fetchVerification(`${API_URL}user/verification`, "post", payload);
  };

  return (
    <div className={`register ${hasScroll ? "has-scroll" : "no-scroll"}`}>
      <div className="register-background display-mobile-720"></div>
      <div className="register-wrapper">
        <HeaderInner />
        <div className="register-content">
          <h1 className="register-title">Email Verification</h1>
          <p className="register-text">
            Your security is our priority. We sent an email to{" "}
            <a className="verification-email">{location.state.email}</a> to
            ensure a seamless and protected sign-up process, we require email
            verification. Please check your inbox, then follow the instructions
            to finish setting up your account.
          </p>
          <form className="register-form">
            <div className="register-form-input">
              <input
                id="input-company"
                name="code"
                type="text"
                className="input-text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <LockIcon className="icon-left" />
            </div>

            <button
              className={`register-form-button button-blue-1 ${code == "" ? "disable" : ""}`}
              onClick={handleSubmit}
              type="submit"
            >
              {verificationIsLoading ? <Loader /> : "Send"}
            </button>
            <div
              onClick={resendCode}
              className={`resend-password ${sendVerificationIsLoading ? "disable" : ""}`}
            >
              {sendVerificationIsLoading ? <Loader /> : ""}
              <span>Resend Code</span>
            </div>
          </form>
        </div>
        <FooterLogin className={"display-desktop-720"} />
      </div>
      <FooterLogin className={"display-mobile-720"} />
      {isShowing && <Modal onCloseButtonClick={() => navigate("/login")} />}
    </div>
  );
}
export default Verification;
