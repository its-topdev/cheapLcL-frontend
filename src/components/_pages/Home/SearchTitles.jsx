function SearchTitle() {
  return (
    <div className="search-titles">
      <h1 className="search-titles-first">Where are you shipping from?</h1>
    </div>
  );
}

function ResultsTitle() {
  return (
    <div className="search-titles">
      <h1 className="search-titles-first">Results on your Search Bases</h1>
    </div>
  );
}

function SearchTitles({ displayResults }) {
  return displayResults ? <ResultsTitle /> : <SearchTitle />;
}

export default SearchTitles;
