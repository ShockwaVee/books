import React, { FunctionComponent, useContext } from "react";
import { BookList } from "./BookList/BookList";
import { searchContext } from "../../contexts/SearchContext/SearchContext";

export const BookFinder: FunctionComponent = () => {
  const { search, setSearch } = useContext(searchContext);

  const onChangePage = (pageNumber: number) => {
    // offset added because pagination starts from 1 and not 0
    const offsetPageNumber = pageNumber - 1;

    setSearch({
      ...search,
      startIndex: offsetPageNumber * 10,
    });
  };

  // adds 1 to calculate the offset from pageNumber
  const currentPage = search.startIndex / 10 + 1;

  return (
    <>
      <BookList
        books={search.books}
        total={search.total}
        onChangePage={onChangePage}
        currentPage={currentPage}
      />
    </>
  );
};
