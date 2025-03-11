import { useState, useEffect } from "react";
import { API_URL } from "../../../constants/config";
import useModal from "../../../hooks/useModal";
import Loader from "../../Loader/Loader";
import ChargeRow from "./ChargeRow";
import Pagination from "../../Pagination";
import ChargeAddModal from "./ChargeAddModal";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

export default function ChargesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isShowing, toggle, setIsShowing] = useModal("");
  const {
    data: chargesData,
    loading: chargesLoading,
    fetchData: fetchCharg,
  } = useFetch();

  const fetchCharges = () => {
    try {
      fetchCharg(
        `${API_URL}charge/list?page=${currentPage}&pageSize=${pageSize}`,
        "get",
        undefined,
        true,
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCharges();
  }, [currentPage, pageSize]);

  const rows = [];
  const charges = chargesData && chargesData.charges;
  const totalCount = chargesData && chargesData.totalCount;
  charges &&
    charges.forEach((charge) => {
      rows.push(
        <ChargeRow
          charge={charge}
          key={charge.id}
          onFetchCharges={fetchCharges}
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
        <h1 className="management-body-title">Charges</h1>
        <button
          type="button"
          className="button-blue-1 charges-new-button"
          onClick={() => setIsShowing(true)}
        >
          Create New
        </button>
      </div>
      <div className="management-body-table">
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>Total Price</th>
              <th>Price per Weight/Cbm</th>
              <th>% of Total</th>
              <th>Minimum Price</th>
              <th>Type</th>
              <th className="action">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chargesLoading ? (
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
        <ChargeAddModal
          show={isShowing}
          onFetchCharges={fetchCharges}
          onCloseButtonClick={onCloseButtonClick}
        />
      )}
    </>
  );
}
