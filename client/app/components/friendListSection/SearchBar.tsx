import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  
  return (
    <main className="search-main">
      <CiSearch className="search-icon"/>
      <input
        className="search-bar"
        type="search"
        title="Search"
        placeholder="Search"
      />
    </main>
  );
}

export default SearchBar