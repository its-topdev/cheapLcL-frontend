import { Routes, Route } from "react-router-dom";
import HeaderManagement from "../HeaderManagement";
import Sidebar from "../Sidebar";
import BackButton from "../BackButton";
import Users from "../_pages/Users";
import Quotes from "../_pages/Quotes";
import RoutesPage from "../_pages/Routes";
import Charges from "../_pages/Charges";
import NotFound from "../_pages/NotFound";
import "./style.scss";

export default function Management() {
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
                                <Route path="*" element={<NotFound />} />
                                <Route path="/users" element={<Users />} />
                                <Route path="/quotes" element={<Quotes />} />
                                <Route path="/routes" element={<RoutesPage />} />
                                <Route path="/charges" element={<Charges />} />
                            </Routes>
                            <BackButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}