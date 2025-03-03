import Select from "react-select";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { useGetVesselsQuery } from "../../../features/vessel/vesselSlice";
import { useGetCarriersQuery } from "../../../features/carrier/carrierSlice";
import { useGetPortsQuery } from "../../../features/port/portSlice";
import Loader from "../../Loader/Loader";
// import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import "./style.scss";

export default function RouteForm({
  loadingSubmit,
  onSubmitForm,
  route,
  eventOnCloseButtonClick,
}) {
  //   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      carrier: route &&
        route.carrier && { value: route.carrier.id, label: route.carrier.name },
      vessel: route &&
        route.vessel && { value: route.vessel.id, label: route.vessel.name },
      voyage: route && route.voyage,
      pol: route &&
        route.polObj && { value: route.polObj.id, label: route.polObj.name },
      pod: route &&
        route.podObj && { value: route.podObj.id, label: route.podObj.name },
      etd: route && route.departureDate && new Date(route.departureDate),
      eta: route && route.arrivalDate && new Date(route.arrivalDate),
      priceFirst: route && route.priceFirst,
      priceSecond: route && route.priceSecond,
      priceThird: route && route.priceThird,
      priceFourth: route && route.priceFourth,
      priceDate: route && route.priceDate,
    },
  });

  const {
    data: vesselData = [],
    isFetching: isFetchingVessels,
    isLoading: isLoadingVessels,
  } = useGetVesselsQuery();
  const vesselsSelectOptions =
    vesselData &&
    vesselData.data &&
    vesselData.data.vessels &&
    vesselData.data.vessels.map((item) => ({
      value: item.id,
      label: item.name,
    }));

  const {
    data: carrierData = [],
    isFetching: isFetchingCarriers,
    isLoading: isLoadingCarriers,
  } = useGetCarriersQuery();
  const carriersSelectOptions =
    carrierData &&
    carrierData.data &&
    carrierData.data.carriers &&
    carrierData.data.carriers.map((item) => ({
      value: item.id,
      label: item.name,
    }));

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

  const formOptions = {
    voyage: { required: "*voyage is required" },
    priceFirst: { required: "*Price I is required" },
    priceSecond: { required: "*Price II is required" },
    priceThird: { required: "*Price III is required" },
    priceFourth: { required: "*Price IV is required" },
    priceDate: { required: "*Price Date is required" },
  };

  return (
    <form
      className={`route-form ${route ? "edit-form" : "add-form"}`}
      onSubmit={handleSubmit(handleSubmitForm, handleError)}
    >
      <div className="row">
        <div className="route-form-input col-md-4">
          <label className="route-form-label" htmlFor="input-carrier">
            Carrier
          </label>
          {isLoadingCarriers || isFetchingCarriers ? (
            <Loader />
          ) : (
            <Controller
              id="input-carrier"
              name="carrier"
              control={control}
              rules={{ required: "*carrier is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={carriersSelectOptions}
                  className="carrier-select"
                  classNamePrefix="cheap"
                  placeholder="Select Carrier"
                  isSearchable={true}
                  isClearable={true}
                />
              )}
            />
          )}
          <span className="form-error">
            {errors && errors.carrier ? errors.carrier.message : ""}
          </span>
        </div>
        <div className="route-form-input col-md-4">
          <label className="route-form-label" htmlFor="input-vessel">
            Vessel
          </label>
          {isLoadingVessels || isFetchingVessels ? (
            <Loader />
          ) : (
            <Controller
              id="input-vessel"
              name="vessel"
              control={control}
              rules={{ required: "*vessel is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={vesselsSelectOptions}
                  className="vessel-select"
                  classNamePrefix="cheap"
                  placeholder="Select Vessel"
                  isSearchable={true}
                  isClearable={true}
                />
              )}
            />
          )}
          <span className="form-error">
            {errors && errors.vessel ? errors.vessel.message : ""}
          </span>
        </div>
        <div className="route-form-input col-md-4">
          <label className="route-form-label" htmlFor="input-voyage">
            Voyage
          </label>
          <input
            id="input-voyage"
            name="voyage"
            type="text"
            className="input-text input-voyage"
            placeholder="Enter Voyage"
            {...register("voyage", formOptions.voyage)}
          />
          <span className="form-error">
            {errors && errors.voyage ? errors.voyage.message : ""}
          </span>
        </div>
      </div>

      <div className="row">
        <div className="route-form-input col-md-3">
          <label className="route-form-label" htmlFor="input-pol">
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
                />
              )}
            />
          )}
          <span className="form-error">
            {errors && errors.pol ? errors.pol.message : ""}
          </span>
        </div>
        <div className="route-form-input col-md-3">
          <label className="route-form-label" htmlFor="input-pod">
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
                />
              )}
            />
          )}
          <span className="form-error">
            {errors && errors.pod ? errors.pod.message : ""}
          </span>
        </div>
        <div className="route-form-input col-md-3">
          <label className="route-form-label" htmlFor="input-etd">
            Departure Date
          </label>
          <Controller
            id="input-etd"
            name="etd"
            control={control}
            rules={{ required: "*etd is required" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                dateFormat="dd/MM/yyyy"
                className="input-etd"
                placeholderText={"Enter Etd"}
              />
            )}
          />
          <span className="form-error">
            {errors && errors.etd ? errors.etd.message : ""}
          </span>
        </div>
        <div className="route-form-input col-md-3">
          <label className="route-form-label" htmlFor="input-eta">
            Arrival Date
          </label>
          <Controller
            id="input-eta"
            name="eta"
            control={control}
            rules={{ required: "*eta is required" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                dateFormat="dd/MM/yyyy"
                className="input-eta"
                placeholderText={"Enter Eta"}
              />
            )}
          />
          <span className="form-error">
            {errors && errors.eta ? errors.eta.message : ""}
          </span>
        </div>
      </div>

      <div className="row">
        <div className="route-form-input col-md-4">
          <label className="route-form-label" htmlFor="input-priceFirst">
            Price I
          </label>
          <input
            id="input-priceFirst"
            name="priceFirst"
            type="number"
            className="input-text input-price"
            placeholder="Enter price"
            {...register("priceFirst", formOptions.priceFirst)}
          />
          <span className="form-error">
            {errors && errors.priceFirst ? errors.priceFirst.message : ""}
          </span>
        </div>
        <div className="route-form-input col-md-4">
          <label className="route-form-label" htmlFor="input-priceSecond">
            Price II
          </label>
          <input
            id="input-priceSecond"
            name="priceSecond"
            type="number"
            className="input-text input-price"
            placeholder="Enter price"
            {...register("priceSecond", formOptions.priceSecond)}
          />
          <span className="form-error">
            {errors && errors.priceSecond ? errors.priceSecond.message : ""}
          </span>
        </div>
        <div className="route-form-input col-md-4">
          <label className="route-form-label" htmlFor="input-priceThird">
            Price III
          </label>
          <input
            id="input-priceThird"
            name="priceThird"
            type="number"
            className="input-text input-price"
            placeholder="Enter price"
            {...register("priceThird", formOptions.priceThird)}
          />
          <span className="form-error">
            {errors && errors.priceThird ? errors.priceThird.message : ""}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="route-form-input col-md-4">
          <label className="route-form-label" htmlFor="input-priceFourth">
            Price IV
          </label>
          <input
            id="input-priceFourth"
            name="priceFourth"
            type="number"
            className="input-text input-price"
            placeholder="Enter price"
            {...register("priceFourth", formOptions.priceFourth)}
          />
          <span className="form-error">
            {errors && errors.priceFourth ? errors.priceFourth.message : ""}
          </span>
        </div>
        <div className="route-form-input col-md-4">
          <label className="route-form-label" htmlFor="input-priceDate">
            Price Date
          </label>
          <input
            id="input-priceDate"
            name="priceDate"
            type="number"
            className="input-text input-price"
            placeholder="Enter price"
            {...register("priceDate", formOptions.priceDate)}
          />
          <span className="form-error">
            {errors && errors.priceDate ? errors.priceDate.message : ""}
          </span>
        </div>
      </div>

      <div className="route-form-buttons">
        <button
          type="button"
          className="button-grey-1 route-form-button-cancel"
          onClick={eventOnCloseButtonClick}
        >
          Cancel
        </button>
        <button
          className="button-blue-1 route-form-button-submit"
          type="submit"
          formNoValidate="formNoValidate"
        >
          {loadingSubmit ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
}

RouteForm.propTypes = {
  loadingSubmit: PropTypes.bool.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  route: PropTypes.object,
  eventOnCloseButtonClick: PropTypes.func.isRequired,
};
