import { useEffect, useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { useForm, Controller } from "react-hook-form";
import { API_URL } from "../../../constants/config";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../Loader/Loader";
import { chargeTypes } from "../../../constants/ports";
import "./style.scss";

const { FIXED_CHARGE, CALCULATED_CHARGE, PERCENTAGE_CHARGE } = chargeTypes;

export default function ChargeForm({
  onSubmitForm,
  charge,
  eventOnCloseButtonClick,
  loadingCharge,
}) {
  const [selectedType, setSelectedType] = useState({
    value: charge?.chargeType?.id,
    label: charge?.chargeType?.name,
  });

  const {
    data: typesData,
    loading: typesLoading,
    fetchData: fetchTypes,
  } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: charge && charge.name,
      price: charge && charge.price,
      minPrice: charge && charge.minPrice,
      type: charge &&
        charge.chargeType && {
          value: charge.chargeType.id,
          label: charge.chargeType.name,
        },
    },
  });

  useEffect(() => {
    fetchTypes(`${API_URL}charge-type/list`, "get");
  }, []);

  const typeOptions =
    typesData &&
    typesData.types &&
    typesData.types.map((type) => ({
      value: type.id,
      label: type.name,
    }));

  const handleSubmitForm = async (data) => {
    await onSubmitForm(data);
    reset();
  };
  const handleError = () => {};

  const formOptions = {
    name: { required: "*name is required" },
    price: { required: "*price is required" },
  };

  return (
    <form
      className={`charge-form ${charge ? "edit-form" : "add-form"}`}
      onSubmit={handleSubmit(handleSubmitForm, handleError)}
    >
      <div>
        <div className="charge-form-input">
          <label className="charge-form-label" htmlFor="input-name">
            Name
          </label>
          <input
            id="input-name"
            name="name"
            type="text"
            className="input-text input-name"
            placeholder="Enter Name"
            {...register("name", formOptions.name)}
          />
          <span className="form-error">
            {errors && errors.name ? errors.name.message : ""}
          </span>
        </div>
        <div className="charge-form-input">
          <label className="charge-form-label" htmlFor="input-type">
            Type
          </label>
          {typesLoading ? (
            <Loader />
          ) : (
            <Controller
              id="input-type"
              name="type"
              control={control}
              rules={{ required: "*type is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={typeOptions}
                  className="port-type"
                  classNamePrefix="cheap"
                  placeholder="Select Type"
                  isClearable={true}
                  onChange={(selectedOption) => {
                    setSelectedType(selectedOption);
                    field.onChange(selectedOption);
                  }}
                />
              )}
            />
          )}
          <span className="form-error">
            {errors && errors.type ? errors.type.message : ""}
          </span>
        </div>
        <div className="charge-form-input">
          <label className="charge-form-label" htmlFor="input-price">
            {selectedType?.label === FIXED_CHARGE
              ? "Total Price"
              : selectedType?.label === CALCULATED_CHARGE
                ? "Price per Weight/Cbm"
                : selectedType?.label === PERCENTAGE_CHARGE
                  ? "% of Total"
                  : "Price"}
          </label>
          <input
            id="input-price"
            name="price"
            type="number"
            className="input-text input-price"
            placeholder="Enter Price"
            {...register("price", formOptions.price)}
          />
          <span className="form-error">
            {errors && errors.price ? errors.price.message : ""}
          </span>
        </div>
        <div className="charge-form-input">
          <label className="charge-form-label" htmlFor="input-min-price">
            Minimum Price
          </label>
          <input
            id="input-min-price"
            name="minPrice"
            type="number"
            className={`input-text input-price ${
              selectedType?.label === FIXED_CHARGE ? "disabled" : ""
            }`}
            placeholder="Enter Minimum Price"
            disabled={selectedType?.label === FIXED_CHARGE}
            {...register("minPrice", formOptions.minPrice)}
          />
          <span className="form-error">
            {errors && errors.minPrice ? errors.minPrice.message : ""}
          </span>
        </div>
      </div>
      <div className="charge-form-buttons">
        <button
          type="button"
          className="button-grey-1 charge-form-button-cancel"
          onClick={eventOnCloseButtonClick}
        >
          Cancel
        </button>
        <button
          className="button-blue-1 charge-form-button-submit"
          type="submit"
          formNoValidate="formNoValidate"
        >
          {loadingCharge ? <Loader></Loader> : "Submit"}
        </button>
      </div>
    </form>
  );
}

ChargeForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  charge: PropTypes.object,
  eventOnCloseButtonClick: PropTypes.func.isRequired,
  loadingCharge: PropTypes.bool,
};
