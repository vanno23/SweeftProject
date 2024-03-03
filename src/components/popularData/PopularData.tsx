import { useState, useEffect } from "react";
import axios from "axios";
import PhotoDisplay from "../PhotoDisplay/PhotoDisplay";
import { useQuery } from "react-query";
import { PhotoListProps } from "../../commonTypes/PhotoListProps";

const PopularData = ({ pageName, searchValue }: PhotoListProps) => {
  const [page, setPage] = useState<number>(1);

  const fetchPhotos = async (pageNumber: number) => {
    const response = await axios.get(
      `https://api.unsplash.com/photos?order_by=popular&page=${pageNumber}&per_page=20&client_id=NPPtHPjM8WdOCMNgeMfF23woLQ7JqKwypf64GXcmR60`
    );

    return [...(photos || []), ...response.data];
  };

  const {
    data: photos,
    error,
    isLoading,
    isFetching,
    isPreviousData,
  } = useQuery(["photos", searchValue, page], () => fetchPhotos(page), {
    keepPreviousData: true,
  });

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  const hasPhotos = photos && photos.length > 0;
  const isErrorAndNoPhotos = error && !hasPhotos;

  const headingText = isErrorAndNoPhotos
    ? "Api error. Please try again later."
    : hasPhotos
    ? `${pageName} Photos`
    : photos && photos.length === 0
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
      } else if (photos && photos.length % 20 === 0) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [photos, isPreviousData, isFetching, searchValue]);

  return (
    <PhotoDisplay
      photos={photos || []}
      loading={isLoading}
      headingText={headingText}
    />
  );
};

export default PopularData;
