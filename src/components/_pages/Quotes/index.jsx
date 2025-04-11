import { useState, useEffect } from "react";
import { API_URL } from "../../../constants/config";
import Loader from "../../Loader/Loader";
import QuoteRow from "./QuoteRow";
import Pagination from "../../Pagination";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";
export default function Quotes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { currentUser } = useContext(UserContext);

  const { data: quotesData, loading: quotesLoading, fetchData } = useFetch();

  const fetchQuotes = () => {
    try {
      console.log(currentUser);

      const url = currentUser.isAdmin
        ? `${API_URL}book/list?page=${currentPage}&pageSize=${pageSize}`
        : `${API_URL}book/list?page=${currentPage}&pageSize=${pageSize}&user_id=${currentUser.user_id}&list_type=quotes`;

      fetchData(url, "get", undefined, true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [currentPage, pageSize]);

  const rows = [];
  const quotes = quotesData && quotesData.books;
  const totalCount = quotesData && quotesData.totalCount;
  quotes &&
    quotes.forEach((quote) => {
      rows.push(
        <QuoteRow
          quote={quote}
          key={quote.id}
          onfetchQuotes={fetchQuotes}
          quotesLoading={quotesLoading}
        />,
      );
    });

  return (
    <>
      <div className="management-body-top">
        <h1 className="management-body-title">Quotes</h1>
      </div>
      <div className="management-body-table">
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>User</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Cbm</th>
              <th>Vessel</th>
              <th>Voyage</th>
              <th>Pol</th>
              <th>Pod</th>
              <th>Date Given</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotesLoading ? (
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
