import cheapLogoGif from "../../assets/images/cheap-lcl.gif";
import "./style.scss";

export default function HeaderInner() {
  return (
    <div className="header-inner">
      <div className="header-inner-container">
        <img src={cheapLogoGif} alt="Cheap Lcl" />
      </div>
    </div>
  );
}
