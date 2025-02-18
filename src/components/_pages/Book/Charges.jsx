import { useState } from "react";
import PropTypes from "prop-types";

// import { API_URL } from "../../../constants/config";
// import useFetch from "../../../hooks/useFetch";
// import Loader from "../../Loader/Loader";
import { priceFormat } from "../../../constants/general";

export default function Charges({ amount, totalGoods, setSubtotal }) {
  const [open, setOpen] = useState(false);
  //   const {
  //     data: chargesData,
  //     loading: chargesLoading,
  //     fetchData: fetchCharges,
  //   } = useFetch();

  // useEffect(() => {
  //     fetchCharges(`${API_URL}charge/list`, 'get');
  // }, []);

  const toggleCharges = () => {
    setOpen(!open);
  };
  //   const rows = [];
  //   const charges = chargesData && chargesData.charges;
  //   charges &&
  //     charges.forEach((charge) => {
  //       rows.push(
  //         <tr key={charge.id}>
  //           <td>{charge.name}</td>
  //           <td>{charge.chargeType && charge.chargeType.name}</td>
  //           <td>{priceFormat(charge.price)}</td>
  //         </tr>
  //       );
  //     });
  const itCharge = 1.5 * amount > 5 ? 1.5 * amount : 5;
  const terminalHandlingCharge = amount * 13 > 16 ? amount * 13 : 16;
  const isps = 1 * amount;
  const deliveryOrder = 17;
  const communicationFee = 16;
  const transferFee =
    ((totalGoods +
      itCharge +
      terminalHandlingCharge +
      isps +
      deliveryOrder +
      communicationFee) *
      6) /
      1000 >
    5
      ? ((totalGoods +
          itCharge +
          terminalHandlingCharge +
          isps +
          deliveryOrder +
          communicationFee) *
          6) /
        1000
      : 5;

  const localCharge =
    itCharge +
    terminalHandlingCharge +
    isps +
    deliveryOrder +
    communicationFee +
    transferFee;

  setSubtotal(localCharge + totalGoods);

  return (
    <div className="charges_block">
      <button
        onClick={toggleCharges}
        className={`charges_block_title ${open ? "open" : ""}`}
        type="button"
      >
        Local Charges: {priceFormat(localCharge)}
      </button>
      {open ? (
        <div className="charges_block_table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IT Charge</td>
                <td>{priceFormat(itCharge)}</td>
                <td>Calculated</td>
              </tr>
              <tr>
                <td>Terminal Handling Charges</td>
                <td>{priceFormat(terminalHandlingCharge)}</td>
                <td>Calculated</td>
              </tr>
              <tr>
                <td>ISPS</td>
                <td>{priceFormat(isps)}</td>
                <td>Calculated</td>
              </tr>
              <tr>
                <td>Delivery Order</td>
                <td>{priceFormat(deliveryOrder)}</td>
                <td>Fixed</td>
              </tr>
              <tr>
                <td>Communication Fee</td>
                <td>{priceFormat(communicationFee)}</td>
                <td>Fixed</td>
              </tr>
              <tr>
                <td>Transfer Fee</td>
                <td>{priceFormat(transferFee)}</td>
                <td>Calculated</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
    // <div className="charges_block">
    //   <button
    //     onClick={toggleCharges}
    //     className={`charges_block_title ${open ? "open" : ""}`}
    //     type="button"
    //   >
    //     Local Charges:
    //   </button>
    //   {open ? (
    //     chargesLoading ? (
    //       <Loader />
    //     ) : (
    //       <div className="charges_block_table">
    //         <table>
    //           <thead>
    //             <tr>
    //               <th>Name</th>
    //               <th>Type</th>
    //               <th>Price</th>
    //             </tr>
    //           </thead>
    //           <tbody>{rows}</tbody>
    //         </table>
    //       </div>
    //     )
    //   ) : (
    //     ""
    //   )}
    // </div>
  );
}

Charges.propTypes = {
  amount: PropTypes.number.isRequired,
  totalGoods: PropTypes.number.isRequired,
  setSubtotal: PropTypes.func.isRequired,
};
