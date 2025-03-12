import { useState, useEffect } from "react";
import { API_URL } from "../../../constants/config";
import useModal from "../../../hooks/useModal";
import Loader from "../../Loader/Loader";
import PricesRow from "./PricesRow";
import Pagination from "../../Pagination";
import PriceAddModal from "./PricesAddModal";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

export default function PricesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isShowing, toggle, setIsShowing] = useModal("");
  const {
    data: pricesData,
    loading: pricesLoading,
    fetchData: fetchPrices,
  } = useFetch();

  const fetchPriceData = () => {
    try {
      fetchPrices(
        `${API_URL}prices/list?page=${currentPage}&pageSize=${pageSize}`,
        "get",
        undefined,
        true,
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPriceData();
  }, [currentPage, pageSize]);

  const rows = [];
  const prices = pricesData && pricesData.prices;
  const totalCount = pricesData && pricesData.totalCount;
  prices &&
    prices.forEach((price) => {
      rows.push(
        <PricesRow
          price={price}
          key={price.id}
          onFetchPrices={fetchPriceData}
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
        <h1 className="management-body-title">Prices</h1>
        <button
          type="button"
          className="button-blue-1 prices-new-button disabled"
          onClick={() => setIsShowing(true)}
          disabled
        >
          Create New
        </button>
      </div>
      <div className="management-body-table">
        <table>
          <thead>
            <tr>
              <th>Valid From</th>
              <th>Valid To</th>
              <th>POL</th>
              <th>POD</th>
              <th>Price</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pricesLoading ? (
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
        <PriceAddModal
          show={isShowing}
          onFetchPrices={fetchPrices}
          onCloseButtonClick={onCloseButtonClick}
        />
      )}
    </>
  );
}
