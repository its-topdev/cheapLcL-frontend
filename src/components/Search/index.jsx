import { useState } from "react";
import { Tooltip } from "react-tooltip";
import PropTypes from "prop-types";

import { SearchIcon, CloseIcon } from "../../constants/icons";
import { dateFormat } from "../../constants/general";
import Pol from "../SearchItem/Pol";
import Pod from "../SearchItem/Pod";
import CalendarDate from "../SearchItem/CalendarDate";
import WeeksAhead from "../SearchItem/WeeksAHead";
import Weight from "../SearchItem/Weight";
import Loader from "../Loader/Loader";
import "./style.scss";

function Search({
  loadingSearch,
  searchData,
  onSetSearchData,
  onSearchOffers,
}) {
  const [tab, setTab] = useState(false);

  function selectTab(nextTab) {
    if (nextTab == tab) {
      setTab(false);
    } else {
      setTab(nextTab);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!missingFields) {
      setTab(false);
      onSearchOffers();
    }
  }

  const searchPort = (e, name) => {
    if (!searchData.calendarDate) {
      onSetSearchData({ ...searchData, [name]: e, calendarDate: new Date() });
    } else {
      onSetSearchData({ ...searchData, [name]: e });
    }
  };

  const missingFields =
    !searchData.pol ||
    !searchData.pod ||
    !searchData.calendarDate ||
    !searchData.weeks ||
    !searchData.weightAmountKg ||
    !searchData.weightAmountCbm;

  const [tooltipVisible, setTooltipVisible] = useState(true);
  return (
    <form className={`searchbox ${tab ? "open" : "close"}`}>
      <div className="searchbox-links">
        <button
          type="button"
          onClick={() => {
            selectTab("pol");
            setTooltipVisible(false);
          }}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
          data-tooltip-id="select-pol"
          data-tooltip-content="Start here!"
          data-tooltip-delay-show={3000}
          className={`searchbox-links-item pol ${tab == "pol" && "active"} ${
            searchData.pol ? "has-value" : ""
          }`}
        >
          <span className="searchbox-links-item-text">Pol</span>
          <span className="searchbox-links-item-choosen">
            {searchData.pol && searchData.pol.label}
          </span>
        </button>
        <Tooltip
          id="select-pol"
          defaultIsOpen={true}
          isOpen={tooltipVisible}
          delayShow={3000}
          delayHide={1000}
          place="left"
          effect="solid"
          style={{
            backgroundColor: "#153356",
            color: "white",
            borderRadius: "20px",
          }}
        />
        <button
          type="button"
          onClick={() => selectTab("pod")}
          className={`searchbox-links-item pod ${tab == "pod" && "active"} ${
            searchData.pod ? "has-value" : ""
          }`}
        >
          <span className="searchbox-links-item-text">Pod</span>
          <span className="searchbox-links-item-choosen">
            {searchData.pod && searchData.pod.label}
          </span>
        </button>
        <button
          type="button"
          onClick={() => selectTab("date")}
          className={`searchbox-links-item date ${tab == "date" && "active"} ${
            searchData.calendarDate ? "has-value" : ""
          }`}
        >
          <span className="searchbox-links-item-text">Start Date</span>
          <span className="searchbox-links-item-choosen">
            {searchData.calendarDate && dateFormat(searchData.calendarDate)}
          </span>
        </button>
        <button
          type="button"
          onClick={() => selectTab("weeks")}
          className={`searchbox-links-item weeks ${
            tab == "weeks" && "active"
          } ${searchData.weeks ? "has-value" : ""}`}
        >
          <span className="searchbox-links-item-text">Weeks Ahead</span>
          <span className="searchbox-links-item-choosen">
            {searchData.weeks && searchData.weeks.label}
          </span>
        </button>
        <button
          type="button"
          onClick={() => selectTab("weight")}
          className={`searchbox-links-item weight ${
            tab == "weight" && "active"
          } ${
            searchData.weightAmountKg || searchData.weightAmountCbm
              ? "has-value"
              : ""
          }`}
        >
          <span className="searchbox-links-item-text">Weight\Cbm</span>
          <span className="searchbox-links-item-choosen">
            {searchData.weightAmountKg ? `${searchData.weightAmountKg}MT` : ""}{" "}
            {searchData.weightAmountCbm
              ? `${searchData.weightAmountCbm}CBM`
              : ""}
          </span>
        </button>
        <div className="searchbox-links-button">
          <button
            data-tooltip-id="search-message"
            data-tooltip-content="fill in all search fields"
            type="submit"
            onClick={handleSearch}
            className="button-blue-1"
          >
            <img className="search-icon" src={SearchIcon} />
            {loadingSearch ? (
              <Loader />
            ) : (
              <span className="search-text">Search</span>
            )}
          </button>
          {missingFields ? (
            <Tooltip
              id="search-message"
              style={{
                backgroundColor: "#153356",
                color: "white",
                borerRadius: "20px",
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={`searchbox-content ${tab ? "open" : "close"}`}>
        <div className="searchbox-content-close" onClick={() => setTab(false)}>
          <CloseIcon />
        </div>
        {(() => {
          switch (tab) {
            case "pol":
              return (
                <Pol
                  pol={searchData.pol}
                  onPolChange={(e) => searchPort(e, "pol")}
                />
              );
            case "pod":
              return (
                <Pod
                  pod={searchData.pod}
                  onPodChange={(e) => searchPort(e, "pod")}
                />
              );
            case "date":
              return (
                <CalendarDate
                  calendarDate={searchData.calendarDate}
                  onChangeDate={(e) =>
                    onSetSearchData({ ...searchData, calendarDate: e })
                  }
                />
              );
            case "weeks":
              return (
                <WeeksAhead
                  weeks={searchData.weeks}
                  onWeeksChange={(e) =>
                    onSetSearchData({ ...searchData, weeks: e })
                  }
                />
              );
            case "weight":
              return (
                <Weight
                  weightAmountKg={searchData.weightAmountKg}
                  onWeightAmountKgChange={(e) =>
                    onSetSearchData({ ...searchData, weightAmountKg: e })
                  }
                  weightAmountCbm={searchData.weightAmountCbm}
                  onWeightAmountCbmChange={(e) =>
                    onSetSearchData({ ...searchData, weightAmountCbm: e })
                  }
                />
              );
            default:
              return null;
          }
        })()}
      </div>
    </form>
  );
}

Search.propTypes = {
  loadingSearch: PropTypes.bool.isRequired,
  searchData: PropTypes.shape({
    pol: PropTypes.object,
    pod: PropTypes.object,
    calendarDate: PropTypes.instanceOf(Date),
    weeks: PropTypes.object,
    weightAmountKg: PropTypes.number,
    weightAmountCbm: PropTypes.number,
  }).isRequired,
  onSetSearchData: PropTypes.func.isRequired,
  onSearchOffers: PropTypes.func.isRequired,
};

export default Search;
