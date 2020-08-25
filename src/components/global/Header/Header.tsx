import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BookSearch } from "../../BookFinder/BookSearch/BookSearch";
import axios from "axios";
import { searchUrl } from "../../../helpers/BookHelper";
import { notification } from "antd";
import { searchContext } from "../../../contexts/SearchContext/SearchContext";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header: FunctionComponent = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { search, setSearch } = useContext(searchContext);

  const onSearch = (queryTerm: string) => {
    const pathname = location.pathname;
    if (pathname !== "/") {
      history.push("/");
    }
    setSearch({ ...search, startIndex: 0 });
    setQuery(queryTerm);
  };

  const fetchBooks = useCallback(async () => {
    setSearch({ ...search, isLoading: true });

    try {
      const result = await axios(
        `${searchUrl}${query}&startIndex=${search.startIndex}`
      );

      setSearch({
        ...search,
        books: result.data.items,
        total: result.data.totalItems,
        isLoading: false,
      });
    } catch (e) {
      notification.error({
        message: "An error occurred",
        description: "Please try searching again",
      });
    }

    window.scrollTo(0, 0);
  }, [query, search.startIndex, setSearch]);

  useEffect(() => {
    if (query !== "") {
      fetchBooks();
    }
  }, [fetchBooks, query]);

  return (
    <div className={styles.wrapper}>
      <BookSearch onSearch={onSearch} isLoading={search.isLoading} />
    </div>
  );
};
