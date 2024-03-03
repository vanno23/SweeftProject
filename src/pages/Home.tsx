import { useState } from "react";
import Search from "../components/search/Search";
import PopularData from "../components/popularData/PopularData";
import SearchedData from "../components/searchedData/SearchedData";
import "./PhotoList.css";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Search setSearchValue={setSearchValue} />
      {searchValue.length === 0 ? (
        <PopularData searchValue={searchValue} pageName="popular" />
      ) : (
        <SearchedData searchValue={searchValue} pageName="popular" />
      )}
    </>
  );
};

export default Home;
