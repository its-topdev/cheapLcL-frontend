import { useNavigate } from "react-router-dom";
import { BackIcon } from "../../constants/icons";
import "./style.scss";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="back-button">
      <button type="button" onClick={() => navigate(-1)}>
        <BackIcon />
      </button>
    </div>
  );
}
