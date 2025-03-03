import { useState, useEffect } from "react";
import { API_URL } from "../../../constants/config";
import Loader from "../../Loader/Loader";
import useModal from "../../../hooks/useModal";
import UserRow from "./UserRow";
import UserAddModal from "./UserAddModal";
import Pagination from "../../Pagination";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const [totalCount, setTotalCount] = useState(0);
  // const [users, setUsers] = useState(null);
  const [isShowing, toggle, setIsShowing] = useModal("");
  const {
    data: usersData,
    loading: userIsLoading,
    fetchData: fetchAllUsers,
  } = useFetch();

  const fetchUsers = async () => {
    await fetchAllUsers(
      `${API_URL}user/list?page=${currentPage}&pageSize=${pageSize}`,
      "get",
      undefined,
      true
    );
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, pageSize]);

  const totalCount = usersData && usersData.totalCount;
  const rows = [];
  usersData &&
    usersData.users &&
    usersData.users.forEach((user) => {
      rows.push(
        <UserRow user={user} key={user.id} onFetchUsers={fetchUsers} />
      );
    });

  return (
    <>
      <div className="management-body-top">
        <h1 className="management-body-title">Users</h1>
        <button
          type="button"
          className="button-blue-1 users-new-button"
          onClick={() => setIsShowing(true)}
        >
          Create New
        </button>
      </div>
      <div className="management-body-table user-page-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Date Request</th>
              <th>Status</th>
              <th>Role</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userIsLoading ? (
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
        <UserAddModal
          show={isShowing}
          onFetchUsers={fetchUsers}
          onCloseButtonClick={toggle}
        />
      )}
    </>
  );
}
