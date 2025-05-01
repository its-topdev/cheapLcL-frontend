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
  shipperData,
}) {
  const { data: updateShipperData, fetchData: fetchEditShipper } = useFetch();
  useEffect(() => {
    if (updateShipperData != null) {
      toast.success("Shipper updated successfully");
      onGetShippers();
      onCloseButtonClick(true);
    }
  }, [updateShipperData]);

  const editShipper = async (data) => {
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
    fetchEditShipper(`${API_URL}shipper/${shipperData.id}/edit`, "post", payload, true);
  };

  return PortalReactDOM.createPortal(
    <div className="shipper-modal modal-wrapper">
      <div className="modal">
        <CloseModal onClose={onCloseButtonClick} />
        <h2 className="shipper-modal-first-title">Edit Shipper</h2>
        <h3 className="shipper-modal-second-title">
          Please Fill in Your Details Below:
        </h3>
        <ShipperForm
          onSubmitForm={editShipper}
          eventOnCloseButtonClick={onCloseButtonClick}
          shipperData={shipperData}
        />
      </div>
    </div>,
    document.body,
  );
}
