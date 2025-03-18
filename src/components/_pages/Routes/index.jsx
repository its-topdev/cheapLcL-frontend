import { useState, useEffect } from "react";
import { API_URL } from "../../../constants/config";
import useModal from "../../../hooks/useModal";
import Loader from "../../Loader/Loader";
import RouteRow from "./RouteRow";
import Pagination from "../../Pagination";
import RouteAddModal from "./RouteAddModal";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

export default function RoutesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isShowing, toggle, setIsShowing] = useModal("");
  const { data: routesData, loading: routesLoading, fetchData } = useFetch();

  const fetchRoutes = () => {
    try {
      fetchData(
        `${API_URL}price/list?page=${currentPage}&pageSize=${pageSize}`,
        "get",
        undefined,
        true,
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, [currentPage, pageSize]);

  const rows = [];
  const routes = routesData && routesData.routes;
  const totalCount = routesData && routesData.totalCount;
  routes &&
    routes.forEach((route) => {
      rows.push(
        <RouteRow
          route={route}
          key={route.id}
          onFetchRoutes={fetchRoutes}
          onSetIsShowingModal={setIsShowing}
        />,
      );
    });

  const onCloseButtonClick = () => {
    toggle();
  };

  return (
    <>
      <div className="management-body-top">
        <h1 className="management-body-title">Available Routes</h1>
        <button
          type="button"
          className="button-blue-1 routes-new-button disabled"
          onClick={() => setIsShowing(true)}
          disabled
        >
          Create New
        </button>
      </div>
      <div className="management-body-table route-page-table">
        <table>
          <thead>
            <tr>
              <th>Carrier</th>
              <th>Vessel</th>
              <th>Voyage</th>
              <th>Pol</th>
              <th>Pod</th>
              <th>Etd</th>
              <th>Eta</th>
              <th>Price I</th>
              <th>Price II</th>
              <th>Price III</th>
              <th>Price IV</th>
              <th>Price Date</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routesLoading ? (
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
      {isShowing && (
        <RouteAddModal
          show={isShowing}
          onFetchRoutes={fetchRoutes}
          onCloseButtonClick={onCloseButtonClick}
        />
      )}
    </>
  );
}
