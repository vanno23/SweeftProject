import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchHistoryProviderProps {
  children: ReactNode;
}

interface SearchHistoryContextProps {
  searchHistory: string[];
  setSearchHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchHistoryContext = createContext<
  SearchHistoryContextProps | undefined
>(undefined);

export const SearchHistoryProvider: React.FC<SearchHistoryProviderProps> = ({
  children,
}) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  return (
    <SearchHistoryContext.Provider value={{ searchHistory, setSearchHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);

  if (!context) {
    throw new Error(
      "useSearchHistory must be used within a SearchHistoryProvider"
    );
  }

  return context;
};
