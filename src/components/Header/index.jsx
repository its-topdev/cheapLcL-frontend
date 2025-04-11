import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import cheapLogoGif from "../../assets/images/cheap-lcl.gif";
import UserContext from "../../contexts/UserContext";
import { PersonIconBlue, MenuIcon } from "../../constants/icons";
import "./style.scss";

export default function Header() {
  const [scroll, setScroll] = useState(false);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => setScroll(window.scrollY > 50));
    }
  }, []);

  const logout = () => {
    navigate("/login");
  };

  return (
    <div className={`header ${scroll ? "scroll" : ""}`}>
      <div className="main-container">
        <div className="header_logo">
          <img src={cheapLogoGif} alt="Cheap Lcl" />
        </div>
        <span className="user_name">
          Hi, <strong>{currentUser ? currentUser.name : "Guest"}</strong>
        </span>
        <div className="header_buttons">
          <button
            title="logout"
            onClick={logout}
            className="button-link"
            type="button"
          >
            <PersonIconBlue />
          </button>
          {/* {currentUser && currentUser.isAdmin && (
            <button
              onClick={() => {
                navigate("/management/quotes");
              }}
              className="button-link"
              type="button"
            >
              <MenuIcon />
            </button>
          )} */}
          <button
            onClick={() => {
              navigate("/management/quotes");
            }}
            className="button-link"
            type="button"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
