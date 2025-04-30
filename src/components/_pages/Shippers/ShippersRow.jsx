import PropTypes from "prop-types";
// import ActionsBtn from "./ActionBtn";

export default function ShipperRow({ shipper, onFetchShippers }) {
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
        {/* <td className="action">
          <ActionsBtn priceData={price} onFetchPrices={onFetchPrices} />
        </td> */}
      </tr>
    </>
  );
}

ShipperRow.propTypes = {
  price: PropTypes.object.isRequired,
  onFetchPrices: PropTypes.func.isRequired,
};
