import PropTypes from "prop-types";
import Loader from "../Loader/Loader";

function SearchResults({ results, searchIsLoading }) {
  return (
    <div className="results">
      {searchIsLoading ? (
        <Loader isLarge={true} />
      ) : results.length ? (
        results
      ) : (
        <div className="no-results">
          Opps.. no results, try changing your search criteria
        </div>
      )}
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  searchIsLoading: PropTypes.bool.isRequired,
};

export default SearchResults;
