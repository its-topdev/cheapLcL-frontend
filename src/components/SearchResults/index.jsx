import PropTypes from "prop-types";

function SearchResults({ results }) {
  return (
    <div className="results">
      {results.length ? (
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
};

export default SearchResults;
