import React, { FunctionComponent, useContext, useEffect } from "react";
import { BookSearch } from "../../BookFinder/BookSearch/BookSearch";
import { searchUrl } from "../../../helpers/BookHelper";
import { notification } from "antd";
import { searchContext } from "../../../contexts/SearchContext/SearchContext";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { useDeepCompareMemo } from "use-deep-compare";
import { HeaderProps } from "./interfaces/HeaderProps";
import useAxios from "axios-hooks";

export const Header: FunctionComponent<HeaderProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const { search, setSearch } = useContext(searchContext);
  const memoizedSearch = useDeepCompareMemo(() => search, [search]);
  const [{ data, loading }, getBooks] = useAxios(
    {
      url: `${searchUrl}${search.query}&startIndex=${search.startIndex}`,
    },
    {
      manual: true,
    }
  );

  const onSearch = (queryTerm: string) => {
    const pathname = location.pathname;
    if (pathname !== "/") {
      history.push("/");
    }
    setSearch({ ...memoizedSearch, startIndex: 0, query: queryTerm });
  };

  useEffect(() => {
    if (search.query !== "") {
      try {
        getBooks();
      } catch (e) {
        notification.error({
          message: "An error occurred",
          description: "Please try searching again",
        });
      }
    }
  }, [getBooks, search.query, search.startIndex]);

  useEffect(() => {
    if (data == null) {
      return;
    }
    setSearch({
      ...memoizedSearch,
      books: data.items,
      total: data.totalItems,
    });
    window.scrollTo(0, 0);
  }, [memoizedSearch, data, setSearch]);

  return (
    <div className={styles.wrapper}>
      <BookSearch
        onSearch={onSearch}
        isLoading={loading}
        value={search.query}
      />
    </div>
  );
};
