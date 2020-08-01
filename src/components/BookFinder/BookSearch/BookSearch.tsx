import React, { FunctionComponent } from "react";
import Search from "antd/lib/input/Search";
import { BookSearchProps } from "./interfaces/BookSearchProps";
import styles from "./BookSearch.module.scss";

export const BookSearch: FunctionComponent<BookSearchProps> = (props) => {
  return (
    <div className={styles.wrap}>
      <Search
        placeholder="Search for a book"
        onSearch={props.onSearch}
        className={styles.searchBox}
        loading={props.isLoading}
      />
    </div>
  );
};
