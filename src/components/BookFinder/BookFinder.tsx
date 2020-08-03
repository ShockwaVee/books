import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BookSearch } from "./BookSearch/BookSearch";
import { BookList } from "./BookList/BookList";
import axios from "axios";
import { notification } from "antd";

export const BookFinder: FunctionComponent = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const url = "https://www.googleapis.com/books/v1/volumes?q=";

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await axios(`${url}${query}&startIndex=${startIndex}`);

      setIsLoading(false);
      setTotal(result.data.totalItems);
      setBooks(result.data.items);
    } catch (e) {
      notification.error({
        message: "An error occurred",
        description: "Please try searching again",
      });
    }

    window.scrollTo(0, 0);
  }, [query, startIndex]);

  useEffect(() => {
    if (query !== "") {
      fetchBooks();
    }
  }, [fetchBooks, query]);

  const onSearch = (a: string) => {
    setStartIndex(0);
    setQuery(a);
  };

  const onChangePage = (pageNumber: number) => {
    setStartIndex(pageNumber * 10);
  };

  return (
    <>
      <BookSearch onSearch={onSearch} isLoading={isLoading} />
      <BookList
        books={books}
        total={total}
        onChangePage={onChangePage}
        currentPage={Math.max(1, startIndex / 10)}
        isLoading={isLoading}
      />
    </>
  );
};
