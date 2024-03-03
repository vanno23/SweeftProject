import { useEffect, useState } from "react";
import useDebounce from "../../customHooks/useDebounce";
import { SearchProps } from "./SearchTypes";
import "./Search.css";
import { useSearchHistory } from "../../useContext/SearchContext";

const Search = ({ setSearchValue }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchTerm, 500);
  const { setSearchHistory } = useSearchHistory();

  useEffect(() => {
    setSearchValue(debouncedSearchValue);
    if (searchTerm.length > 0) {
      setSearchHistory((prevHistory) => {
        if (!prevHistory.includes(debouncedSearchValue)) {
          return [...prevHistory, debouncedSearchValue];
        }
        return prevHistory;
      });
    }
  }, [debouncedSearchValue, setSearchValue]);

  return (
    <div className="search">
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        placeholder="Type to search photos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
