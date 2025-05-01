import React, { useEffect } from "react";
import Select from "react-select";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useGetPortsQuery } from "../../features/port/portSlice";
import { API_URL } from "../../constants/config";
import { emailRegex, phoneRegex } from "../../constants/general";
import { XIcon } from "../../constants/icons";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import "./style.scss";

export default function ShipperForm({
  onSubmitForm,
  shipper,
  eventOnCloseButtonClick,
  shipperData,
}) {
  console.log(shipperData);
  const {
    data: countriesData,
    loading: countriesLoading,
    fetchData: fetchCountries,
  } = useFetch();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: shipperData && shipperData.shipperName ? shipperData.shipperName : "",
      address: shipperData && shipperData.address ? shipperData.address : "",
      // city: shipperData && shipperData.city ? shipperData.city : "",
      zip: shipperData && shipperData.zip ? shipperData.zip : "",
      contactName: shipperData && shipperData.contactName ? shipperData.contactName : "",
      contactPhone: shipperData && shipperData.contactPhone ? shipperData.contactPhone : "",
      contactEmail: shipperData && shipperData.contactEmail ? shipperData.contactEmail : "",
      // country: shipperData && shipperData.country ? shipperData.country : "",
    }
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "contacts",
  });
  const {
    data: portData = [],
    isFetching: isFetchingPorts,
    isLoading: isLoadingPorts,
  } = useGetPortsQuery();
  const selectedCountry = watch("country");
  const selectedCity = watch("city");

  const countriesOptions =
    countriesData &&
    countriesData.countries &&
    countriesData.countries.map((country) => ({
      value: country.id,
      label: country.name,
    }));

  const portsSelectOptions =
    portData &&
    portData.data &&
    portData.data.list &&
    portData.data.list
      .filter((item) => {
        if (selectedCountry) {
          return item.countryId === selectedCountry.value;
        }
        return true; // Show all cities if no country is selected
      })
      .map((item) => ({
        value: item.id,
        label: item.name,
        countryId: item.countryId,
      }));

  useEffect(() => {
    if (selectedCity && !selectedCountry) {
      const cityCountry = countriesData.countries.find(
        (country) => country.id === selectedCity.countryId
      );
      if (cityCountry) {
        reset({ ...watch(), country: { value: cityCountry.id, label: cityCountry.name } });
      }
    }
  }, [selectedCity, countriesData, reset, watch]);

  useEffect(() => {
    if (selectedCountry) {
      const filteredCities = portData.data.list.filter(
        (city) => city.countryId === selectedCountry.value
      );
      if (
        !selectedCity ||
        !filteredCities.some((city) => city.id === selectedCity.value)
      ) {
        reset({
          ...watch(),
          city: filteredCities.length
            ? { value: filteredCities[0].id, label: filteredCities[0].name }
            : null,
        });
      }
    }
  }, [selectedCountry, portData, reset, watch]);

  useEffect(() => {
    fetchCountries(`${API_URL}country`, "get");
  }, []);

  const handleSubmitForm = async (data) => {
    await onSubmitForm(data);
    reset();
  };
  const handleError = (errors) => { };

  const formOptions = {
    name: { required: "*name is required" },
    address: { required: "*address is required" },
    zip: {
      required: "*zip is required",
      pattern: {
        value: /^\d{0,9}$/,
        message: "*invalid zip"
      }
    },
    contactName: { required: "*Name is required" },
    contactPhone: {
      required: "*Phone is required",
      pattern: {
        value: phoneRegex,
        message: "*invalid phone number"
      }
    },
    contactEmail: {
      required: "*Email is required",
      pattern: {
        value: emailRegex,
        message: "*invalid email address",
      },
    },
  };

  return (
    <form
      className={`shipper-form ${shipper ? "edit-form" : "add-form"}`}
      onSubmit={handleSubmit(handleSubmitForm, handleError)}
    >
      <div className="row">
        <div className="shipper-form-input col-md-4">
          <label className="shipper-form-label" htmlFor="input-name">
            Shipper Name
          </label>
          <input
            id="input-name"
            name="name"
            type="text"
            className="input-text input-name"
            placeholder="Enter Shipper Name"
            {...register("name", formOptions.name)}
          />
          <span className="form-error">
            {errors && errors.name ? errors.name.message : ""}
          </span>
        </div>
        <div className="shipper-form-input col-md-4">
          <label className="shipper-form-label" htmlFor="input-address">
            Address
          </label>
          <input
            id="input-address"
            name="address"
            type="text"
            className="input-text input-address"
            placeholder="Enter Shipper Address"
            {...register("address", formOptions.address)}
          />
          <span className="form-error">
            {errors && errors.address ? errors.address.message : ""}
          </span>
        </div>
        <div className="shipper-form-input col-md-4">
          <label className="shipper-form-label" htmlFor="input-country">
            Country
          </label>
          {countriesLoading ? (
            <Loader />
          ) : (
            <Controller
              id="input-country"
              name="country"
              control={control}
              rules={{ required: "*Country is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={countriesOptions}
                  className="input-country"
                  classNamePrefix="cheap"
                  placeholder="Select Country"
                  isClearable={true}
                />
              )}
            />
          )}
          <span className="form-error">
            {errors && errors.country ? errors.country.message : ""}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="shipper-form-input col-md-4">
          <label className="shipper-form-label" htmlFor="input-city">
            City
          </label>
          {isFetchingPorts || isLoadingPorts ? (
            <Loader />
          ) : (
            <Controller
              id="input-city"
              name="city"
              control={control}
              rules={{ required: "*City is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={portsSelectOptions}
                  className="input-city"
                  classNamePrefix="cheap"
                  placeholder="Select City"
                  isClearable={true}
                />
              )}
            />
          )}
          <span className="form-error">
            {errors && errors.city ? errors.city.message : ""}
          </span>
        </div>
        <div className="shipper-form-input col-md-4">
          <label className="shipper-form-label" htmlFor="input-zip">
            Zip Code
          </label>
          <input
            id="input-zip"
            name="zip"
            type="text"
            className="input-text input-zip"
            placeholder="Enter Zip Code"
            {...register("zip", formOptions.zip)}
          />
          <span className="form-error">
            {errors && errors.zip ? errors.zip.message : ""}
          </span>
        </div>
      </div>
      <div className="contact-block row">
        <div className="shipper-form-input col-md-4">
          <label className="shipper-form-label" htmlFor="input-contact-name">
            Contact Name
          </label>
          <input
            id="input-contact-name"
            name="contactName"
            type="text"
            className="input-text input-contact-name"
            placeholder="Enter Name"
            {...register("contactName", formOptions.contactName)}
          />
          <span className="form-error">
            {errors && errors.contactName ? errors.contactName.message : ""}
          </span>
        </div>
        <div className="shipper-form-input col-md-4">
          <label className="shipper-form-label" htmlFor="input-contact-phone">
            Contact Phone
          </label>
          <input
            id="input-contact-phone$"
            name="contactPhone"
            type="text"
            className="input-text input-contact-phone"
            placeholder="Enter Phone"
            {...register("contactPhone", formOptions.contactPhone)}
          />
          <span className="form-error">
            {errors && errors.contactPhone ? errors.contactPhone.message : ""}
          </span>
        </div>
        <div className="shipper-form-input col-md-4">
          <label className="shipper-form-label" htmlFor="input-contact-email">
            Contact Email
          </label>
          <input
            id="input-contact-email"
            name="contactEmail"
            type="text"
            className="input-text input-contact-email"
            placeholder="Enter Email"
            {...register("contactEmail", formOptions.contactEmail)}
          />
          <span className="form-error">
            {errors && errors.contactEmail ? errors.contactEmail.message : ""}
          </span>
        </div>
      </div>
      {fields.map(({ id, name, phone, email }, index) => (
        <div className="contact-block row" key={id}>
          <div className="shipper-form-input col-md-4">
            <label
              className="shipper-form-label"
              htmlFor={`input-contact-name${index}`}
            >
              Contact Name
            </label>
            <input
              id={`input-contact-name${index}`}
              type="text"
              className="input-text input-contact-name"
              placeholder="Enter Name"
              {...register(`contacts[${index}].name`)}
            />
          </div>
          <div className="shipper-form-input col-md-4">
            <label
              className="shipper-form-label"
              htmlFor={`input-contact-phone${index}`}
            >
              Contact Phone
            </label>
            <input
              id={`input-contact-phone${index}`}
              type="text"
              className="input-text input-contact-phone"
              placeholder="Enter Phone"
              {...register(`contacts[${index}].phone`)}
            />
          </div>
          <div className="shipper-form-input col-md-3">
            <label
              className="shipper-form-label"
              htmlFor={`input-contact-email${index}`}
            >
              Contact Email
            </label>
            <input
              id={`input-contact-email${index}`}
              type="text"
              className="input-text input-contact-email"
              placeholder="Enter Email"
              {...register(`contacts[${index}].email`)}
            />
          </div>
          <div className="contact-block-remove col-md-1">
            <button type="button" onClick={() => remove(index)}>
              <XIcon />
            </button>
          </div>
        </div>
      ))}
      <div className="contact-add">
        <button type="button" onClick={() => append({})}>
          + Add Another Contact
        </button>
      </div>
      <div className="shipper-form-buttons">
        <button
          type="button"
          className="button-grey-1 shipper-form-button-cancel"
          onClick={eventOnCloseButtonClick}
        >
          Cancel
        </button>
        <button
          className="button-blue-1 shipper-form-button-submit"
          type="submit"
          formNoValidate="formNoValidate"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
