import { useState, useEffect } from "react";
import axios from "axios";
import PhotoDisplay from "../PhotoDisplay/PhotoDisplay";
import { useQuery } from "react-query";
import { Photo } from "../../commonTypes/photoList";
import { PhotoListProps } from "../../commonTypes/PhotoListProps";

const SearchedData = ({ pageName, searchValue }: PhotoListProps) => {
  const [page, setPage] = useState<number>(1);
  const [searchedData, setSearchedData] = useState<Photo[]>([]);
  const [useSearchedPhotos, setUseSearchedPhotos] = useState<boolean>(false);

  const fetchPhotos = async (pageNumber: number) => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${searchValue}&order_by=popular&page=${pageNumber}&per_page=20&client_id=NPPtHPjM8WdOCMNgeMfF23woLQ7JqKwypf64GXcmR60`
    );

    setSearchedData((prevData) => [...prevData, ...response.data.results]);
    return [...searchedData, ...response.data.results];
  };

  const {
    data: searchedPhotos,
    error,
    isLoading,
    isFetching,
    isPreviousData,
  } = useQuery(["searchedPhotos", searchValue, page], () => fetchPhotos(page), {
    keepPreviousData: true,
  });

  useEffect(() => {
    if (searchedPhotos) {
      setUseSearchedPhotos(true);
    }
  }, [searchedPhotos]);

  useEffect(() => {
    setSearchedData([]);
    setPage(1);
    setUseSearchedPhotos(false);
  }, [searchValue]);

  const hasPhotos =
    useSearchedPhotos && searchedPhotos && searchedPhotos.length > 0;
  const isErrorAndNoPhotos = error && !hasPhotos;

  const headingText = isErrorAndNoPhotos
    ? "Api error. Please try again later."
    : hasPhotos
    ? `${pageName} Photos`
    : useSearchedPhotos && (!searchedPhotos || searchedPhotos.length === 0)
    ? "No items found."
    : "";

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >
        document.documentElement.offsetHeight - 150 &&
      !isPreviousData &&
      !isFetching
    ) {
      if (searchValue) {
        setPage((prevPage) => prevPage + 1);
      } else if (
        useSearchedPhotos &&
        searchedPhotos &&
        searchedPhotos.length % 20 === 0
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    useSearchedPhotos,
    searchedPhotos,
    isPreviousData,
    isFetching,
    searchValue,
  ]);

  return (
    <PhotoDisplay
      photos={useSearchedPhotos ? searchedPhotos || [] : searchedData || []}
      loading={isLoading}
      headingText={headingText}
    />
  );
};

export default SearchedData;
