import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import WindowSizeContext from "../../../contexts/WindowSizeContext";
import { userRoles } from "../../../constants/userRoles";
import {
  emailRegex,
  passwordInvalidError,
  passwordRegex,
} from "../../../constants/general";
import HeaderInner from "../../HeaderInner";
import FooterLogin from "../../FooterLogin";
import { API_URL } from "../../../constants/config";
import Loader from "../../Loader/Loader";
import useTogglePassword from "../../../hooks/useTogglePassword";
import useFetch from "../../../hooks/useFetch";
import {
  PersonIcon,
  MailIcon,
  PhoneIcon,
  CompanyIcon,
  LockIcon,
  EyeIcon,
  EyeNoIcon,
} from "../../../constants/icons";
import "./style.scss";

function Registration() {
  const [passwordType, handleTogglePassword] = useTogglePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  const {
    data: registerData,
    loading: registerIsLoading,
    fetchData: fetchRegister,
  } = useFetch();
  const { windowHeight } = useContext(WindowSizeContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (registerData != null) {
      reset();
      navigate("/verification", {
        state: { email: registerData.email, name: registerData.name },
      });
    }
  }, [registerData]);

  const hasScroll = windowHeight < 676 ? true : false;

  const handleRegistration = (data) => {
    doCreateUser(data);
  };
  const handleError = (errors) => {};

  const doCreateUser = async (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      role: userRoles.USER,
      password: data.password,
    };
    await fetchRegister(`${API_URL}user/register`, "post", payload, false);
  };

  const registerOptions = {
    name: { required: "*Name is required" },
    email: {
      required: "*Email is required",
      pattern: {
        value: emailRegex,
        message: "*invalid email address",
      },
    },
    phone: { required: "*Phone is required" },
    company: { required: "*Company is required" },
    password: {
      required: "*Password is required",
      pattern: {
        value: passwordRegex,
        message: passwordInvalidError,
      },
    },
  };

  return (
    <div className={`register ${hasScroll ? "has-scroll" : "no-scroll"}`}>
      <div className="register-background display-mobile-720"></div>
      <div className="register-wrapper">
        <HeaderInner />
        <div className="register-content">
          <h1 className="register-title">Ready to Begin?</h1>
          <h2 className="register-text">Please Fill in Your Details Below:</h2>
          <form
            className="register-form"
            onSubmit={handleSubmit(handleRegistration, handleError)}
          >
            <div className="register-form-input">
              <label htmlFor="input-name">Full Name</label>
              <input
                id="input-name"
                name="name"
                type="text"
                className="input-text"
                placeholder="Enter your Full Name"
                {...register("name", registerOptions.name)}
              />
              <PersonIcon className="icon-left" />
              <span className="form-error">
                {errors && errors.name ? errors.name.message : ""}
              </span>
            </div>
            <div className="register-form-input">
              <label htmlFor="input-email">Email address</label>
              <input
                id="input-email"
                name="email"
                type="email"
                className="input-text"
                placeholder="Enter your Email"
                {...register("email", registerOptions.email)}
              />
              <MailIcon className="icon-left" />
              <span className="form-error">
                {errors && errors.email ? errors.email.message : ""}
              </span>
            </div>
            <div className="register-form-input">
              <label htmlFor="input-email">Phone Number</label>
              <input
                id="input-phone"
                name="phone"
                type="phone"
                className="input-text"
                placeholder="Enter your phone Number"
                {...register("phone", registerOptions.phone)}
              />
              <PhoneIcon className="icon-left" />
              <span className="form-error">
                {errors && errors.phone ? errors.phone.message : ""}
              </span>
            </div>
            <div className="register-form-input">
              <label htmlFor="input-company">Company Name</label>
              <input
                id="input-company"
                name="company"
                type="text"
                className="input-text"
                placeholder="Enter your Company Name"
                {...register("company", registerOptions.company)}
              />
              <CompanyIcon className="icon-left" />
              <span className="form-error">
                {errors && errors.company ? errors.company.message : ""}
              </span>
            </div>
            <div className="register-form-input form-input-password">
              <label htmlFor="input-password">Password</label>
              <input
                id="input-password"
                name="password"
                type={passwordType}
                autoComplete="on"
                className="input-text"
                placeholder="Enter your Password"
                {...register("password", registerOptions.password)}
              />
              <LockIcon className="icon-left" />
              <button
                className={`icon-eye ${passwordType}`}
                type="button"
                onClick={handleTogglePassword}
              >
                {passwordType === "password" ? <EyeNoIcon /> : <EyeIcon />}
              </button>
              <span className="form-error">
                {errors && errors.password ? errors.password.message : ""}
              </span>
            </div>
            <button
              className="register-form-button button-blue-1"
              disabled={registerIsLoading ? true : false}
              type="submit"
              formNoValidate="formNoValidate"
            >
              {registerIsLoading ? <Loader /> : "Submit"}
            </button>
          </form>
        </div>
        <FooterLogin className={"display-desktop-720"} />
      </div>
      <FooterLogin className={"display-mobile-720"} />
    </div>
  );
}

export default Registration;
