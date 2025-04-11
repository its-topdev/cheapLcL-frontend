import { Routes, Route } from "react-router-dom";
import HeaderManagement from "../HeaderManagement";
import Sidebar from "../Sidebar";
import BackButton from "../BackButton";
import Users from "../_pages/Users";
import Quotes from "../_pages/Quotes";
import RoutesPage from "../_pages/Routes";
import Charges from "../_pages/Charges";
import NotFound from "../_pages/NotFound";
import Discounts from "../_pages/Discounts";
import Prices from "../_pages/Prices";
import "./style.scss";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

export default function Management() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="management">
      <HeaderManagement />
      <div className="management-content-wrapper">
        <div className="management-sidebar">
          <Sidebar />
        </div>
        <div className="management-header-body">
          <div className="management-body">
            <div className="management-body-container">
              <Routes>
                {currentUser.isAdmin && (
                  <>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/quotes" element={<Quotes />} />
                    <Route path="/routes" element={<RoutesPage />} />
                    <Route path="/prices" element={<Prices />} />
                    <Route path="/charges" element={<Charges />} />
                    <Route path="/discounts" element={<Discounts />} />
                  </>
                )}
                {!currentUser.isAdmin && (
                  <>
                    <Route path="/quotes" element={<Quotes />} />
                    <Route path="*" element={<NotFound />} />
                  </>
                )}
              </Routes>
              <BackButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
