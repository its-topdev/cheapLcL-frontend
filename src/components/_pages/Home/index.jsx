import { useState, useEffect } from "react";
import Header from "../../Header";
import Footer from "../../Footer";
import SearchTitles from "./SearchTitles";
import Search from "../../Search";
import Sort from "../../Sort";
import SearchResults from "../../SearchResults";
import ResultItem from "../../SearchResults/ResultItem";
import useFetch from "../../../hooks/useFetch";
import ReachUs from "../../ReachUs";
import "./style.scss";
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
  const {
    data: searchResultData,
    loading: searchIsLoading,
    fetchData: fetchSearch,
  } = useFetch();

  const searchOffers = async (data) => {
    setSortBy(null);
    const polId = data.pol.value;
    const podId = data.pod.value;
    const query = `${API_URL}prices/search?pol=${polId}&pod=${podId}&date=${data.calendarDate}&weeks=${data.weeks.value}&weightAmountKg=${data.weightAmountKg}&weightAmountCbm=${data.weightAmountCbm}`;
    fetchSearch(query, "get", undefined, true);
  };

  useEffect(() => {
    if (searchResultData) {
      setStep(1);
      const element = document.getElementById("home-content");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setOffers(searchResultData);
  }, [searchResultData]);

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
            : 1,
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
