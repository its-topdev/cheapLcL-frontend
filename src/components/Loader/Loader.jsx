import "./style.scss";
import PropTypes from "prop-types";

export default function Loader({
  isLarge = false,
  isSmall = true,
  isOnly = false,
}) {
  return (
    <div className={`${isOnly ? "" : "loader-container"} `}>
      <div
        className={`loader-animation ${isLarge ? "loader-animation-lg" : ""} ${isSmall ? "loader-animation-sm" : ""}`}
      />
    </div>
  );
}

Loader.propTypes = {
  isLarge: PropTypes.bool,
  isSmall: PropTypes.bool,
  isOnly: PropTypes.bool,
};
