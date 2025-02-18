import { useState, useEffect } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import SearchTitles from "./SearchTitles";
import Search from "../../Search";
import Sort from "../../Sort";
import SearchResults from "../../SearchResults";
import ResultItem from "../../SearchResults/ResultItem";
import useFetch from "../../../hooks/useFetch";
// import SpecialOffers from "../../SpecialOffers";
import ReachUs from "../../ReachUs";
import "./style.scss";
import { DEFAULT_POD, DEFAULT_WEEKS, prices } from "../../../constants/ports";
import { API_URL } from "../../../constants/config";

const allowedSort = [
  { name: "price", text: "Price" },
  { name: "departureDate", text: "Departure Date" },
];

export default function Home() {
  const [results, setResults] = useState([]);
  const [offers, setOffers] = useState();
  const [sortBy, setSortBy] = useState(null);
  const [isSortingAsc, setIsSortingAsc] = useState(true);
  const [step, setStep] = useState(0);
  const [searchData, setSearchData] = useState({
    pol: null,
    pod: DEFAULT_POD,
    calendarDate: new Date(),
    weeks: DEFAULT_WEEKS,
    weightAmountKg: null,
    weightAmountCbm: null,
  });
  const {
    data: searchResultData,
    loading: searchIsLoading,
    fetchData: fetchSearch,
  } = useFetch();

  const moveStep = (s) => {
    setStep(s);
  };

  let polName = "",
    podName = "",
    amount = 0,
    price = 0,
    chargePrice = 0,
    amountSymbol = "",
    startTime = null,
    endTime = null;

  const searchOffers = async () => {
    setSortBy(null);
    const polId = searchData.pol.value;
    polName = searchData.pol.label;
    const podId = searchData.pod.value;
    podName = searchData.pod.label;
    const weeks = searchData.weeks.value;
    const amountKg = searchData?.weightAmountKg;
    const amountCbm = searchData?.weightAmountCbm;
    amountSymbol = "MT";
    amount = amountKg;
    if (amountKg < amountCbm) {
      amount = amountCbm;
      amountSymbol = "CBM";
    }
    price = prices[polId][podId];
    chargePrice = amount * price * 0.6 < 5 ? 5 : amount * price * 0.6;

    const calendarDate = new Date(searchData?.calendarDate);
    startTime = calendarDate?.getTime();
    endTime = calendarDate?.setDate(calendarDate?.getDate() + 7 * weeks);
    fetchSearch(`${API_URL}webSchedule?pol=${polId}&pod=${podId}`, "get");
  };

  useEffect(() => {
    const filteredVoyages = searchResultData?.voyages
      ?.filter((item) => {
        const departureTime = new Date(item?.departureDate)?.getTime();
        return departureTime >= startTime && departureTime <= endTime;
      })
      ?.map((item) => ({
        key: item?.vvoyage,
        carrierName: "WSHIPS",
        polName,
        podName,
        amountTitle: "Weight",
        amountSymbol,
        price,
        chargePrice,
        departureDate: item?.departureDate,
        vesselName: item?.vessel,
        voyage: item?.voyage,
        arrivalDate: item?.arrivalDate,
        amount,
      }));
    setOffers(filteredVoyages ? filteredVoyages : []);
    setSortBy("departureDate");
    moveStep(1);
    const element = document.getElementById("home-content");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchResultData]);

  useEffect(() => {
    const rows = [];
    offers &&
      offers.forEach((offer) => {
        rows.push(<ResultItem offer={offer} key={offer.id} />);
      });
    setResults(rows);
  }, [offers]);

  useEffect(() => {
    if (offers) {
      const orderArray = [...offers].sort((a, b) =>
        isSortingAsc
          ? a[sortBy] > b[sortBy]
            ? 1
            : -1
          : a[sortBy] > b[sortBy]
          ? -1
          : 1
      );
      setOffers(orderArray);
    }
  }, [sortBy, isSortingAsc]);

  return (
    <div className="home">
      <Header />
      <div className="search-block">
        <div className="search-block-content">
          <SearchTitles displayResults={step != 0} />
          <Search
            loadingSearch={searchIsLoading}
            searchData={searchData}
            onSetSearchData={setSearchData}
            onSearchOffers={searchOffers}
          />
        </div>
      </div>
      <div id="home-content" className="main-container home-content">
        {step == 1 && (
          <div>
            <div className="results-top">
              {results?.length > 0 && (
                <>
                  <h2 className="results-top-title">Search Results for You</h2>
                  <Sort
                    allowedSort={allowedSort}
                    sortBy={sortBy}
                    onSetSortBy={setSortBy}
                    isSortingAsc={isSortingAsc}
                    onSetIsSortingAsc={setIsSortingAsc}
                  />
                </>
              )}
            </div>
            <SearchResults results={results} />
          </div>
        )}
        <ReachUs />
      </div>
      <Footer />
    </div>
  );
}
