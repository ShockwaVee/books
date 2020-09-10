import React, { FunctionComponent } from "react";
import { BookListProps } from "./interfaces/BookListProps";
import { List } from "antd";
import styles from "./BookList.module.scss";
import { VolumeModel } from "./interfaces/VolumeModel";
import { Link } from "react-router-dom";
import { RouteUrl } from "../../../enums/RouteUrl";
import { renderAuthors } from "../../../helpers/BookHelper";

export const BookList: FunctionComponent<BookListProps> = (props) => {
  const renderTitle = (bookUrl: string, title: string) => {
    return <Link to={bookUrl}>{title}</Link>;
  };

  const renderItem = (item: VolumeModel) => {
    const bookUrl = `${RouteUrl.Books}/${item.id}`;

    return (
      <List.Item
        key={item.id}
        extra={
          item.volumeInfo.imageLinks ? (
            <img
              width={120}
              alt="logo"
              src={item.volumeInfo.imageLinks.thumbnail}
            />
          ) : null
        }
      >
        <List.Item.Meta
          title={renderTitle(bookUrl, item.volumeInfo.title)}
          description={renderAuthors(item.volumeInfo.authors)}
        />
        {item.volumeInfo.description}
      </List.Item>
    );
  };

  return (
    <div className={styles.list}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={props.books}
        renderItem={renderItem}
        pagination={{
          onChange: (page: number) => {
            props.onChangePage(page);
          },
          hideOnSinglePage: true,
          total: props.total,
          showSizeChanger: false,
          current: props.currentPage,
        }}
      />
    </div>
  );
};
