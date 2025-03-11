import { useContext } from "react";
import cheapLogoGif from "../../assets/images/cheap-lcl.gif";
// import Notes from "../Notes";
import UserContext from "../../contexts/UserContext";
// import Profile from "../Profile";
import "./style.scss";

export default function HeaderManagement() {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="header-management">
      <div className="header-management-container">
        <div className="header-management-logo">
          <img alt="Cheap Lcl" src={cheapLogoGif} />
        </div>
        {/* <div className="header-management-note">
                    <Notes />
                </div> */}
        <div className="header-management-profile">
          {/* <Profile /> */}
          <span className="user_name">
            Hi, <strong>{currentUser ? currentUser.name : "Guest"}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
