import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { userRoles } from "../../../constants/userRoles";
import useFetch from "../../../hooks/useFetch";
import { API_URL } from "../../../constants/config";
import {
  emailRegex,
  passwordInvalidError,
  passwordRegex,
} from "../../../constants/general";
import Loader from "../../Loader/Loader";
import "./style.scss";

export default function UserForm({
  loadingSubmit,
  onSubmitForm,
  user,
  eventOnCloseButtonClick,
}) {
  const { data: companyList, loading: companyListLoading, fetchData } = useFetch();

  const [showChangePassword, setShowChangePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: user && user.name,
      email: user && user.email,
      company: user && user.company,
      phone: user && user.phone,
      role: user && { value: user.role, label: user.role },
    },
  });
  const fetchCompanyList = async () => {
    try {
      const url = `${API_URL}company/list`;
      fetchData(url, "get", undefined);
    } catch (error) {
      console.error("Error fetching company list:", error);
    }
  };
  useEffect(() => {
    fetchCompanyList();
  }, []);

  const toggleShowChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const handleSubmitForm = async (data) => {
    await onSubmitForm(data);
    reset();
  };
  const handleError = (errors) => { };

  const formOptions = {
    name: { required: "*Name is required" },
    email: {
      required: "*Email is required",
      pattern: {
        value: emailRegex,
        message: "*invalid email address",
      },
    },
    phone: {
      required: "*Phone is required",
    },
    password: {
      required: "*Password is required",
      pattern: {
        value: passwordRegex,
        message: passwordInvalidError,
      },
    },
  };
  const rolesOptions =
    userRoles &&
    Object.keys(userRoles).map((keyname) => ({
      value: userRoles[keyname],
      label: keyname,
    }));
  return (
    <form
      className={`user-form ${user ? "edit-form" : "add-form"}`}
      onSubmit={handleSubmit(handleSubmitForm, handleError)}
    >
      <div className="row">
        <div className="user-form-input col-md-4">
          <label className="user-form-label" htmlFor="input-name">
            Full Name
          </label>
          <input
            id="input-name"
            name="name"
            type="text"
            className="input-text input-name"
            placeholder="Enter Full Name"
            {...register("name", formOptions.name)}
          />
          <span className="form-error">
            {errors && errors.name ? errors.name.message : ""}
          </span>
        </div>
        <div className="user-form-input col-md-4">
          <label className="user-form-label" htmlFor="input-email">
            Email address
          </label>
          <input
            id="input-email"
            name="email"
            type="email"
            className="input-text input-email"
            placeholder="Enter Email address"
            {...register("email", formOptions.email)}
          />
          <span className="form-error">
            {errors && errors.email ? errors.email.message : ""}
          </span>
        </div>
        <div className="user-form-input col-md-4">
          <label className="user-form-label" htmlFor="input-company">
            Company Name
          </label>
          <Controller
            id="input-company"
            name="company"
            control={control}
            rules={{ required: "*Company is required" }}
            render={({ field }) => (
              <Select
                {...field}
                loading={companyListLoading}
                options={companyList && companyList.companies.map(company => ({ id: company.client_id, label: company.client_name_eng }))}
                className="company-select"
                classNamePrefix="cheap"
                placeholder="Select Company"
                isClearable={true}
              />
            )}
          />
          <span className="form-error">
            {errors && errors.company ? errors.company.message : ""}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="user-form-input col-md-4">
          <label className="user-form-label" htmlFor="input-phone">
            Phone Number
          </label>
          <input
            id="input-phone"
            name="phone"
            type="text"
            className="input-text input-phone"
            placeholder="Enter Phone Number"
            {...register("phone", formOptions.phone)}
          />
          <span className="form-error">
            {errors && errors.phone ? errors.phone.message : ""}
          </span>
        </div>
        <div className="user-form-input col-md-4">
          <label className="user-form-label" htmlFor="input-role">
            Role
          </label>
          <Controller
            id="input-role"
            name="role"
            control={control}
            rules={{ required: "*role is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={rolesOptions}
                className="role-select"
                classNamePrefix="cheap"
                placeholder="Select Role"
                isClearable={true}
              />
            )}
          />
          <span className="form-error">
            {errors && errors.role ? errors.role.message : ""}
          </span>
        </div>
      </div>
      {!user && (
        <div className="row">
          <div className="user-form-input col-md-4">
            <label className="user-form-label" htmlFor="input-password">
              Password
            </label>
            <span className="form-error form-error-password">
              {errors && errors.password ? errors.password.message : ""}
            </span>
            <input
              id="input-password"
              name="password"
              type="text"
              className="input-text input-password"
              placeholder="Enter Password"
              {...register("password", formOptions.password)}
            />
          </div>
        </div>
      )}
      {user && (
        <div className="change-password-block">
          <button
            className="change-password-block-button"
            type="button"
            onClick={toggleShowChangePassword}
          >
            Change Password
          </button>
          {showChangePassword && (
            <div className="user-form-input col-md-4">
              <label className="user-form-label" htmlFor="input-password">
                Select Password
              </label>
              <span className="form-error form-error-password">
                {errors && errors.password ? errors.password.message : ""}
              </span>
              <input
                id="input-password"
                name="password"
                type="text"
                className="input-text input-password"
                placeholder="Enter Password"
                {...register("password", formOptions.password)}
              />
            </div>
          )}
        </div>
      )}
      <div className="user-form-buttons">
        <button
          type="button"
          className="button-grey-1 user-form-button-cancel"
          onClick={eventOnCloseButtonClick}
        >
          Cancel
        </button>
        <button
          className="button-blue-1 user-form-button-submit"
          type="submit"
          formNoValidate="formNoValidate"
        >
          {loadingSubmit ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
}
