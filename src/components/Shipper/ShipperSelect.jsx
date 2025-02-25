import { useEffect } from "react";
import Select, { components } from "react-select";
import PropTypes from "prop-types";

import useModal from "../../hooks/useModal";
import useFetch from "../../hooks/useFetch";
import ShipperAddModal from "./ShipperAddModal";
import { API_URL } from "../../constants/config";
import Loader from "../Loader/Loader";

export default function ShipperSelect({ shipper, onSetShipper }) {
  const [isShowing, toggle, setIsShowing] = useModal("");
  const {
    data: shipperData,
    loading: shipperLoading,
    fetchData: fetchShipper,
  } = useFetch();

  const getShippers = async () => {
    await fetchShipper(
      `${API_URL}shipper/user-shippers`,
      "get",
      undefined,
      true
    );
  };

  const shipperOptions =
    shipperData &&
    shipperData &&
    shipperData.shippers &&
    shipperData.shippers.map((shipper) => ({
      value: shipper.id,
      label: shipper.name,
    }));

  const SelectMenuButton = (props) => {
    return (
      <components.MenuList {...props}>
        {props.children}
        <div className="new-shipper-wrap">
          <button
            className="new-shipper-button button-blue-2"
            type="button"
            onClick={() => setIsShowing(true)}
          >
            Add new Shipper
          </button>
        </div>
      </components.MenuList>
    );
  };

  useEffect(() => {
    getShippers();
  }, []);

  return (
    <>
      {shipperLoading ? (
        <Loader />
      ) : (
        <Select
          value={shipper}
          classNamePrefix="cheap"
          placeholder="Select Shipper"
          options={shipperOptions}
          components={{ MenuList: SelectMenuButton }}
          isClearable={true}
          onChange={(e) => onSetShipper(e)}
        />
      )}
      {isShowing && (
        <ShipperAddModal
          onCloseButtonClick={toggle}
          onGetShippers={getShippers}
          onSetShipper={onSetShipper}
        />
      )}
    </>
  );
}

ShipperSelect.propTypes = {
  shipper: PropTypes.object,
  onSetShipper: PropTypes.func,
  children: PropTypes.node,
};
