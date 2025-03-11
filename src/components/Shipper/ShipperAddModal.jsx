import { useEffect } from "react";
import PortalReactDOM from "react-dom";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import ShipperForm from "./ShipperForm";
import CloseModal from "../CloseModal";
import { API_URL } from "../../constants/config";
import "./style.scss";

export default function ShipperAddModal({
  onCloseButtonClick,
  onGetShippers,
  onSetShipper,
}) {
  const { data: createShipperData, fetchData: fetchCreateShipper } = useFetch();
  useEffect(() => {
    if (createShipperData != null) {
      toast.success("Shipper created successfully");
      onSetShipper({
        value: createShipperData.id,
        label: createShipperData.name,
      });
      onGetShippers();
      onCloseButtonClick(true);
    }
  }, [createShipperData]);

  const addShipper = async (data) => {
    const payload = {
      name: data.name,
      address: data.address,
      country: data.country && data.country.value,
      city: data.city && data.city.value,
      zip: data.zip,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail,
      contacts: data.contacts,
    };
    fetchCreateShipper(`${API_URL}shipper/create`, "post", payload);
  };

  return PortalReactDOM.createPortal(
    <div className="shipper-modal modal-wrapper">
      <div className="modal">
        <CloseModal onClose={onCloseButtonClick} />
        <h2 className="shipper-modal-first-title">Create Shipper</h2>
        <h3 className="shipper-modal-second-title">
          Please Fill in Your Details Below:
        </h3>
        <ShipperForm
          onSubmitForm={addShipper}
          eventOnCloseButtonClick={onCloseButtonClick}
        />
      </div>
    </div>,
    document.body,
  );
}
