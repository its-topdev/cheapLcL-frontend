import PropTypes from "prop-types";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
import ActionsBtn from "./ActionBtn";

export default function ShipperRow({ shipper, onfetchShippers }) {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <tr>
        <td>{shipper.username}</td>
        <td>{shipper.usercompany}</td>
        <td>{shipper.shipperName}</td>
        <td>{shipper.address}</td>
        <td>{shipper.country}</td>
        <td>{shipper.city}</td>
        <td>{shipper.zip}</td>
        <td>{shipper.contactName}</td>
        <td>{shipper.contactEmail}</td>
        <td>{shipper.contactPhone}</td>
        {currentUser.isAdmin && (
          <td className="action">
            <ActionsBtn shippers={shipper} onFetchShippers={onfetchShippers} />
          </td>
        )}
      </tr>
    </>
  );
}

ShipperRow.propTypes = {
  price: PropTypes.object.isRequired,
  onFetchPrices: PropTypes.func.isRequired,
};
