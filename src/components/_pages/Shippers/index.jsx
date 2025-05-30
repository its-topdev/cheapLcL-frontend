import { useState, useEffect, useContext } from "react";
import { API_URL } from "../../../constants/config";
import useModal from "../../../hooks/useModal";
import Loader from "../../Loader/Loader";
import ShipperRow from "./ShippersRow";
import Pagination from "../../Pagination";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";
import UserContext from "../../../contexts/UserContext";
export default function ShippersPage() {
  const { currentUser } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [setIsShowing] = useModal("");
  const {
    data: ShipperData,
    loading: shippersLoading,
    fetchData: fetchShippers,
  } = useFetch();
  const fetchShipperData = () => {
    try {
      const url = currentUser.isAdmin
        ? `${API_URL}shipper/list?page=${currentPage}&pageSize=${pageSize}`
        : `${API_URL}shipper/list?page=${currentPage}&pageSize=${pageSize}&user_id=${currentUser.user_id}&list_type=shippers`;

      fetchShippers(url, "get", undefined, true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShipperData();
  }, [currentPage, pageSize]);

  const rows = [];
  const shippers = ShipperData && ShipperData.shippers;
  const totalCount = ShipperData && ShipperData.total;
  shippers &&
    shippers.forEach((shipper) => {
      rows.push(
        <ShipperRow
          shipper={shipper}
          key={shipper.id}
          onfetchShippers={fetchShipperData}
          onSetIsShowingModal={setIsShowing}
        />,
      );
    });
  return (
    <>
      <div className="management-body-top">
        <h1 className="management-body-title">Shippers</h1>
      </div>
      <div className="management-body-table">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Company</th>
              <th>Shipper Name</th>
              <th>Address</th>
              <th>Country</th>
              <th>City</th>
              <th>Zip Code</th>
              <th>Contact Name</th>
              <th>Contact Email</th>
              <th>Contact Phone</th>
              {currentUser.isAdmin && <th className="action">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {shippersLoading ? (
              <tr>
                <td>
                  <Loader />
                </td>
              </tr>
            ) : (
              rows
            )}
          </tbody>
        </table>
      </div>
      <div className="management-body-pagination">
        <Pagination
          currentPage={currentPage}
          onSetCurrentPage={setCurrentPage}
          pageSize={pageSize}
          onSetPageSize={setPageSize}
          totalCount={totalCount}
        />
      </div>
    </>
  );
}
