import React from "react";
import { SearchContextInterface } from "./interfaces/SearchContextInterface";

export const SEARCH_RESULTS_DEFAULT_VALUE = {
  search: {
    books: [],
    total: 0,
    startIndex: 0,
    isLoading: false,
  },
  setSearch: () => {},
};

export const searchContext = React.createContext<SearchContextInterface>(
  SEARCH_RESULTS_DEFAULT_VALUE
);
