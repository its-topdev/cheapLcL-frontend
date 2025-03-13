// import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import Loader from "../../Loader/Loader";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import "./style.scss";

export default function DiscountForm({
  loadingSubmit,
  onSubmitForm,
  discount,
  eventOnCloseButtonClick,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      startDate:
        discount && discount.startDate ? new Date(discount.startDate) : "",
      endDate: discount && discount.endDate ? new Date(discount.endDate) : "",
      fixedDiscount:
        discount && discount.fixedDiscount ? discount.fixedDiscount : "",
      weeklyDiscount:
        discount && discount.weeklyDiscount ? discount.weeklyDiscount : "",
    },
  });

  const handleSubmitForm = async (data) => {
    await onSubmitForm(data);
    reset();
  };
  const handleError = (errors) => {
    console.log(errors);
  };

  return (
    <form
      className="discount-form"
      onSubmit={handleSubmit(handleSubmitForm, handleError)}
    >
      <div className="row">
        {/* <div className="discount-form-input col-md-6">
          <label className="discount-form-label" htmlFor="input-startDate">
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
                className="input-startDate"
                placeholderText={"Enter Start Date"}
              />
            )}
          />
          <span className="form-error">
            {errors && errors.startDate ? errors.startDate.message : ""}
          </span>
        </div> */}
        {/* <div className="discount-form-input col-md-6">
          <label className="discount-form-label" htmlFor="input-endDate">
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
                className="input-endDate"
                placeholderText={"Enter End Date"}
              />
            )}
          />
          <span className="form-error">
            {errors && errors.endDate ? errors.endDate.message : ""}
          </span>
        </div> */}
      </div>

      <div className="row">
        <div className="discount-form-input col-md-6">
          <label className="discount-form-label" htmlFor="input-fixedDiscount">
            Fixed Discount
          </label>
          <input
            id="input-fixedDiscount"
            name="fixedDiscount"
            type="number"
            className="input-text input-price"
            placeholder="Enter price"
            {...register("fixedDiscount")}
          />
          <span className="form-error">
            {errors && errors.fixedDiscount ? errors.fixedDiscount.message : ""}
          </span>
        </div>
        <div className="discount-form-input col-md-6">
          <label className="discount-form-label" htmlFor="input-weeklyDiscount">
            Weekly Discount
          </label>
          <input
            id="input-weeklyDiscount"
            name="weeklyDiscount"
            type="number"
            className="input-text input-price"
            placeholder="Enter price"
            {...register("weeklyDiscount")}
          />
          <span className="form-error">
            {errors && errors.weeklyDiscount
              ? errors.weeklyDiscount.message
              : ""}
          </span>
        </div>
      </div>

      <div className="discount-form-buttons">
        <button
          type="button"
          className="button-grey-1 discount-form-button-cancel"
          onClick={eventOnCloseButtonClick}
        >
          Cancel
        </button>
        <button
          className="button-blue-1 discount-form-button-submit"
          type="submit"
          formNoValidate="formNoValidate"
        >
          {loadingSubmit ? <Loader /> : "Submit"}
        </button>
      </div>
    </form>
  );
}

DiscountForm.propTypes = {
  loadingSubmit: PropTypes.bool.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  discount: PropTypes.object,
  eventOnCloseButtonClick: PropTypes.func.isRequired,
};
