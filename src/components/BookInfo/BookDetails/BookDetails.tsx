import React, { FunctionComponent } from "react";
import { TextContent } from "../../global/TextContent/TextContent";
import { BookDetailsProps } from "./interfaces/BookDetailsProps";
import styles from "./BookDetails.module.scss";
import moment from "moment";
import { IndustryIdentifier } from "../../BookFinder/BookList/interfaces/IndustryIdentifier";

export const BookDetails: FunctionComponent<BookDetailsProps> = (props) => {
  const renderIndustryIdentifiers = (
    industryIdentifiers: IndustryIdentifier[]
  ) => {
    return industryIdentifiers
      .filter(
        (industryIdentifier: IndustryIdentifier) =>
          industryIdentifier.type === "ISBN_10" ||
          industryIdentifier.type === "ISBN_13"
      )
      .map((industryIdentifier: IndustryIdentifier) => {
        const formattedIndustryIdentifier = industryIdentifier.type.replace(
          "_",
          "-"
        );

        return (
          <React.Fragment key={industryIdentifier.identifier}>
            <TextContent className={styles.label} fontSize={12}>
              {formattedIndustryIdentifier}
            </TextContent>
            <TextContent fontSize={18}>
              {industryIdentifier.identifier}
            </TextContent>
          </React.Fragment>
        );
      });
  };

  const renderOtherCategories = (categories: string[]) => {
    categories.shift();
    return categories.map((category: string) => {
      return (
        <TextContent key={category} className={styles.badge}>
          {category}
        </TextContent>
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoriesWrapper}>
        {renderOtherCategories(props.book.volumeInfo.categories)}
      </div>
      <TextContent className={styles.label} fontSize={12}>
        Published by
      </TextContent>
      <TextContent fontSize={18}>{props.book.volumeInfo.publisher}</TextContent>
      <TextContent className={styles.label} fontSize={12}>
        Publishing date
      </TextContent>
      <TextContent fontSize={18}>
        {moment(props.book.volumeInfo.publishedDate).format("LL")}
      </TextContent>
      <TextContent className={styles.label} fontSize={12}>
        Page count
      </TextContent>
      <TextContent fontSize={18}>{props.book.volumeInfo.pageCount}</TextContent>
      <TextContent className={styles.label} fontSize={12}>
        Is mature?
      </TextContent>
      <TextContent fontSize={18}>
        {props.book.volumeInfo.maturityRating === "NOT_MATURE" ? "No" : "Yes"}
      </TextContent>
      {renderIndustryIdentifiers(props.book.volumeInfo.industryIdentifiers)}
    </div>
  );
};
