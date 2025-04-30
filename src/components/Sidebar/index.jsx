import {
  DashboardIcon,
  UsersIcon,
  Amp,
  Map,
  Dollar,
  DiscountIcon,
  CreditCardIcon,
  ShipperIcon,
} from "../../constants/icons";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function Sidebar() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="sidebar">
      <nav className="sidebar-list">
        <NavLink to="/management/dashboard" className="sidebar-item">
          <DashboardIcon />
          <span className="sidebar-item-name">Dashboard</span>
        </NavLink>
        {currentUser.isAdmin && (
          <>
            <NavLink to="/management/users" className="sidebar-item">
              <UsersIcon />
              <span className="sidebar-item-name">Users</span>
            </NavLink>
            <NavLink to="/management/quotes" className="sidebar-item">
              <Amp />
              <span className="sidebar-item-name">Quotes</span>
            </NavLink>
            <NavLink to="/management/routes" className="sidebar-item">
              <Map />
              <span className="sidebar-item-name">Routes</span>
            </NavLink>
            <NavLink to="/management/prices" className="sidebar-item">
              <CreditCardIcon />
              <span className="sidebar-item-name">Prices</span>
            </NavLink>
            <NavLink to="/management/charges" className="sidebar-item">
              <Dollar />
              <span className="sidebar-item-name">Charges</span>
            </NavLink>
            <NavLink to="/management/discounts" className="sidebar-item">
              <DiscountIcon />
              <span className="sidebar-item-name">Discounts</span>
            </NavLink>
            <NavLink to="/management/shippers" className="sidebar-item">
              <ShipperIcon />
              <span className="sidebar-item-name">Shippers</span>
            </NavLink>
          </>
        )}
        {!currentUser.isAdmin && (
          <NavLink to="/management/quotes" className="sidebar-item">
            <Amp />
            <span className="sidebar-item-name">Quotes</span>
          </NavLink>
        )}
      </nav>
    </div>
  );
}
