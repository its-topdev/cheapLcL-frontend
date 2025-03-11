import { useEffect } from "react";
import PortalReactDOM from "react-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../../constants/config";
import RouteForm from "./RouteForm";
import CloseModal from "../../CloseModal";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

export default function RouteAddModal({
  show,
  onFetchRoutes,
  onCloseButtonClick,
}) {
  const {
    data: routeData,
    loading: routeIsLoading,
    fetchData: fetchAddChargeRoute,
  } = useFetch();

  useEffect(() => {
    if (routeData != null) {
      toast.success("created successfully");
      onFetchRoutes();
      onCloseButtonClick(true);
    }
  }, [routeData]);

  const addRoute = async (data) => {
    const payload = {
      etd: data.etd,
      eta: data.eta,
      pod: data.pod && data.pod.value,
      pol: data.pol && data.pol.value,
      priceDate: data.priceDate,
      priceFirst: data.priceFirst,
      priceSecond: data.priceSecond,
      priceThird: data.priceThird,
      priceFourth: data.priceFourth,
      carrier: data.carrier && data.carrier.value,
      vessel: data.vessel && data.vessel.value,
      voyage: data.voyage,
    };
    await fetchAddChargeRoute(`${API_URL}price/create`, "post", payload);
  };

  return PortalReactDOM.createPortal(
    <div
      className={`route-modal modal-wrapper ${
        show ? "show-modal" : "hide-modal"
      }`}
    >
      <div className="modal">
        <CloseModal onClose={onCloseButtonClick} />
        <h2 className="route-modal-first-title">Create Route</h2>
        <h3 className="route-modal-second-title">
          Please Enter the Details below:
        </h3>
        <RouteForm
          loadingSubmit={routeIsLoading}
          onSubmitForm={addRoute}
          eventOnCloseButtonClick={onCloseButtonClick}
        />
      </div>
    </div>,
    document.body,
  );
}
