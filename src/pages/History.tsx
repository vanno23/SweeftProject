import { useSearchHistory } from "../useContext/SearchContext";
import { useQueryClient } from "react-query";
import "./History.css";
import PhotoDisplay from "../components/PhotoDisplay/PhotoDisplay";
import { useState } from "react";
import { Photo } from "../commonTypes/photoList";
import { Helmet } from "react-helmet-async";

const History = () => {
  const { searchHistory } = useSearchHistory();
  const [cachedData, setCachedData] = useState<Photo[]>([]);
  const queryClient = useQueryClient();

  const fetchCachedData = async (searchValue: string) => {
    try {
      const getCachedData = await queryClient.getQueryData([
        "searchedPhotos",
        searchValue,
        1,
      ]);

      if (cachedData) {
        setCachedData(getCachedData);
      } else {
        setCachedData(getCachedData);
      }
    } catch (error) {
      console.error("Error fetching cached data:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>History</title>
      </Helmet>
      <div className="history-container">
        <h2>History</h2>
        {searchHistory.length === 0 && <p>No Items</p>}
        <div className="history-buttons">
          {searchHistory.map((searchValue, index) => (
            <button
              key={index}
              className="history-button"
              onClick={() => fetchCachedData(searchValue)}
            >
              {searchValue}
            </button>
          ))}
        </div>
        <PhotoDisplay photos={cachedData} headingText={""} />
      </div>
    </>
  );
};

export default History;
