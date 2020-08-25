import React from "react";
import { SearchContextInterface } from "../contexts/SearchContext/interfaces/SearchContextInterface";
import { SearchInterface } from "../contexts/SearchContext/interfaces/SearchInterface";

export const useSearch = (): SearchContextInterface => {
  const [search, setSearch] = React.useState<SearchInterface>({
    books: [],
    total: 0,
    startIndex: 0,
    isLoading: false,
  });

  const setCurrentSearch = React.useCallback(
    (currentSearchResults: SearchInterface): void => {
      setSearch(currentSearchResults);
    },
    []
  );

  return {
    search,
    setSearch: setCurrentSearch,
  };
};
