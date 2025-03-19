import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Loader from "../../Loader/Loader";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import "./style.scss";
// import { manualPol, manualPod } from "../../../constants/ports";
import { useGetPortsQuery } from "../../../features/port/portSlice";
export default function PricesForm({
  loadingSubmit,
  onSubmitForm,
  priceData,
  eventOnCloseButtonClick,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      startDate:
        priceData && priceData.validFrom ? new Date(priceData.validFrom) : "",
      endDate:
        priceData && priceData.validTo ? new Date(priceData.validTo) : "",
      price: priceData && priceData.price ? priceData.price : "",
      pol: priceData?.pol
        ? {
            value: priceData.pol,
            label: priceData.polName,
          }
        : // : manualPol,
          "",
      pod: priceData?.pod
        ? {
            value: priceData.pod,
            label: priceData.podName,
          }
        : // : manualPod,
          "",
    },
  });

  const isEdit = priceData && priceData.id;

  const {
    data: portData = [],
    isFetching: isFetchingPorts,
    isLoading: isLoadingPorts,
  } = useGetPortsQuery();
  const portsSelectOptions =
    portData &&
    portData.data &&
    portData.data.list &&
    portData.data.list.map((item) => ({
      value: item.id,
      label: item.name,
    }));

  const handleSubmitForm = async (data) => {
    await onSubmitForm(data);
    reset();
  };
  const handleError = (errors) => {
    console.log(errors);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm, handleError)}
      className="prices-form"
    >
      <div className="row">
        <div className="prices-form-input col-md-6">
          <label className="prices-form-label" htmlFor="input-startDate">
            Start Date
          </label>
          <Controller
            id="input-startDate"
            name="startDate"
            control={control}
            rules={{ required: "*startDate is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                dateFormat="dd/MM/yyyy"
                className={`input-startDate ${isEdit ? "disabled" : ""}`}
                placeholderText={"Enter Start Date"}
                disabled={isEdit}
              />
            )}
          />
          <span className="form-error">
            {errors && errors.startDate ? errors.startDate.message : ""}
          </span>
        </div>
        <div className="prices-form-input col-md-6">
          <label className="prices-form-label" htmlFor="input-endDate">
            End Date
          </label>
          <Controller
            id="input-endDate"
            name="endDate"
            control={control}
            rules={{ required: "*endDate is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                dateFormat="dd/MM/yyyy"
                className={`input-endDate ${isEdit ? "disabled" : ""}`}
                placeholderText={"Enter End Date"}
                disabled={isEdit}
              />
            )}
          />
          <span className="form-error">
            {errors && errors.endDate ? errors.endDate.message : ""}
          </span>
        </div>
      </div>

      <div className="row">
        <div className="prices-form-input col-md-4">
          <label className="prices-form-label" htmlFor="input-pol">
            Pol
          </label>
          {isLoadingPorts || isFetchingPorts ? (
            <Loader />
          ) : (
            <Controller
              id="input-pol"
              name="pol"
              control={control}
              rules={{ required: "*pol is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={portsSelectOptions}
                  className="port-select"
                  classNamePrefix="cheap"
                  placeholder="Select Pol"
                  isSearchable={true}
                  isClearable={true}
                  // isDisabled={true}
                  isDisabled={isEdit}
                />
              )}
            />
          )}
          <span className="form-error">
            {errors && errors.pol ? errors.pol.message : ""}
          </span>
        </div>
        <div className="prices-form-input col-md-4">
          <label className="prices-form-label" htmlFor="input-pod">
            Pod
          </label>
          {isLoadingPorts || isFetchingPorts ? (
            <Loader />
          ) : (
            <Controller
              id="input-pod"
              name="pod"
              control={control}
              rules={{ required: "*pod is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={portsSelectOptions}
                  className="port-select"
                  classNamePrefix="cheap"
                  placeholder="Select Pod"
                  isSearchable={true}
                  isClearable={true}
                  // isDisabled={true}
                  isDisabled={isEdit}
                />
              )}
            />
          )}
          <span className="form-error">
            {errors && errors.pod ? errors.pod.message : ""}
          </span>
        </div>
        <div className="prices-form-input col-md-4">
          <label className="prices-form-label" htmlFor="input-price">
            Price
          </label>
          <input
            id="input-price"
            name="price"
            type="number"
            className="input-text input-price"
            placeholder="Enter price"
            {...register("price")}
          />
          <span className="form-error">
            {errors && errors.price ? errors.price.message : ""}
          </span>
        </div>
      </div>

      <div className="prices-form-buttons">
        <button
          type="button"
          className="button-grey-1 prices-form-button-cancel"
          onClick={eventOnCloseButtonClick}
        >
          Cancel
        </button>
        <button
          className="button-blue-1 prices-form-button-submit"
          type="submit"
          formNoValidate="formNoValidate"
        >
          {loadingSubmit ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
}

PricesForm.propTypes = {
  loadingSubmit: PropTypes.bool,
  onSubmitForm: PropTypes.func.isRequired,
  eventOnCloseButtonClick: PropTypes.func.isRequired,
  priceData: PropTypes.object,
};
