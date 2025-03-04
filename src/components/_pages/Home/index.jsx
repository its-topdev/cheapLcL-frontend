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
import { DEFAULT_POD, DEFAULT_WEEKS } from "../../../constants/ports";
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
  const [searchQuery, setSearchQuery] = useState({
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

  const {
    data: discountsData,
    isLoading: discountsLoading,
    fetchData: fetchDiscounts,
  } = useFetch();

  const {
    data: pricesData,
    isLoading: pricesLoading,
    fetchData: fetchPrices,
  } = useFetch();

  const searchOffers = async (data) => {
    setSortBy(null);
    setSearchQuery(data);
    const polId = data.pol.value;
    const podId = data.pod.value;
    fetchSearch(`${API_URL}webSchedule?pol=${polId}&pod=${podId}`, "get");
  };

  useEffect(() => {
    fetchDiscounts(`${API_URL}discount/list`, "get", undefined, true);
    fetchPrices(`${API_URL}prices/list`, "get", undefined, true);
  }, []);

  useEffect(() => {
    if (searchResultData) {
      setStep(1);
      const element = document.getElementById("home-content");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [searchResultData]);

  useEffect(() => {
    if (searchResultData) {
      const polName = searchQuery.pol.label;
      const podName = searchQuery.pod.label;
      const weeks = searchQuery.weeks.value;
      const amountKg = searchQuery?.weightAmountKg;
      const amountCbm = searchQuery?.weightAmountCbm;
      const priceRecord = pricesData?.prices?.find(
        (p) =>
          p.polObj.id === searchQuery.pol.value &&
          p.podObj.id === searchQuery.pod.value
      );
      const price = priceRecord ? priceRecord.price : 0;
      const calendarDate = new Date(searchQuery?.calendarDate);

      let amountSymbol = "MT";
      let amount = amountKg;
      if (amountKg < amountCbm) {
        amount = amountCbm;
        amountSymbol = "CBM";
      }
      const chargePrice = amount * price * 0.6 < 5 ? 5 : amount * price * 0.6;

      const startTime = calendarDate?.getTime();
      const endTime = calendarDate?.setDate(
        calendarDate?.getDate() + 7 * weeks
      );

      const discount = discountsData?.discounts[0]?.fixedDiscount || 0;
      const weeklyDiscount = discountsData?.discounts[0]?.weeklyDiscount || 0;
      const discountStartDate = discountsData?.discounts[0]?.startDate
        ? new Date(discountsData?.discounts[0]?.startDate)
        : new Date();
      const discountEndDate = discountsData?.discounts[0]?.endDate
        ? new Date(discountsData?.discounts[0]?.endDate)
        : new Date();

      const filteredVoyages = searchResultData?.voyages
        ?.filter((item) => {
          const departureTime = new Date(item?.departureDate)?.getTime();
          return departureTime >= startTime && departureTime <= endTime;
        })
        ?.map((item) => {
          const departureDate = new Date(item?.departureDate);
          const weeklyPassed =
            departureDate - discountEndDate == 0
              ? 0
              : Math.floor(
                  (departureDate - discountEndDate) / (7 * 24 * 60 * 60 * 1000)
                ) + 1;
          const discountedPrice =
            departureDate < discountStartDate
              ? price
              : departureDate > discountEndDate
              ? price - discount - weeklyDiscount * weeklyPassed
              : price - discount;

          return {
            key: item?.vvoyage,
            carrierName: "WSHIPS",
            polName,
            podName,
            amountTitle: "Weight",
            amountSymbol,
            price: discountedPrice,
            chargePrice,
            departureDate: item?.departureDate,
            vesselName: item?.vessel,
            voyage: item?.voyage,
            arrivalDate: item?.arrivalDate,
            amount,
          };
        });
      setOffers(filteredVoyages ? filteredVoyages : []);
      setSortBy("departureDate");
    }
  }, [searchResultData, discountsData, searchQuery]);

  useEffect(() => {
    const rows = [];
    offers &&
      offers.forEach((offer, index) => {
        rows.push(<ResultItem offer={offer} key={index} />);
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
            loadingSearch={searchIsLoading || discountsLoading || pricesLoading}
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
