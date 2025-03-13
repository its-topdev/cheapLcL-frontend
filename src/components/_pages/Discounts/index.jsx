import { useState, useEffect } from "react";
import { API_URL } from "../../../constants/config";
import useModal from "../../../hooks/useModal";
import Loader from "../../Loader/Loader";
import DiscountRow from "./DiscountRow";
import Pagination from "../../Pagination";
import DiscountAddModal from "./DiscountAddModal";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

export default function RoutesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isShowing, toggle, setIsShowing] = useModal("");
  const {
    data: discountsData,
    loading: discountsLoading,
    fetchData,
  } = useFetch();

  const fetchDiscounts = () => {
    try {
      fetchData(
        `${API_URL}discount/list?page=${currentPage}&pageSize=${pageSize}`,
        "get",
        undefined,
        true,
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, [currentPage, pageSize]);

  const rows = [];
  const discounts = discountsData && discountsData.discounts;
  const totalCount = discountsData && discountsData.totalCount;
  discounts &&
    discounts.forEach((discount) => {
      rows.push(
        <DiscountRow
          discount={discount}
          key={discount.id}
          onFetchDiscounts={fetchDiscounts}
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
        <h1 className="management-body-title">Discounts Plan</h1>
        <button
          type="button"
          className={`button-blue-1 discount-new-button ${
            discounts && discounts.length >= 1 ? "disabled" : ""
          }`}
          onClick={() => setIsShowing(true)}
          disabled={discounts && discounts.length >= 1}
        >
          Create Discount Plan
        </button>
      </div>
      <div className="management-body-table discount-page-table">
        <table>
          <thead>
            <tr>
              {/* <th>Start Date</th>
              <th>End Date</th> */}
              <th>Fixed Discount</th>
              <th>Weekly Discount</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discountsLoading ? (
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
        <DiscountAddModal
          show={isShowing}
          onFetchDiscounts={fetchDiscounts}
          onCloseButtonClick={onCloseButtonClick}
        />
      )}
    </>
  );
}
