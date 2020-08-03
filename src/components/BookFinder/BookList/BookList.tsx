import React, { FunctionComponent } from "react";
import { BookListProps } from "./interfaces/BookListProps";
import { List } from "antd";
import styles from "./BookList.module.scss";
import { VolumeModel } from "./interfaces/VolumeModel";

export const BookList: FunctionComponent<BookListProps> = (props) => {
  const renderAuthors = (authors: string[] | undefined) => {
    if (!authors) {
      return "-";
    }
    return authors.join(", ");
  };

  const renderItem = (item: VolumeModel) => {
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
          title={item.volumeInfo.title}
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
        loading={props.isLoading}
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
