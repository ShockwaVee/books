import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fetchUrl, renderAuthors } from "../../helpers/BookHelper";
import { notification, Skeleton } from "antd";
// @ts-ignore
import StarRatings from "react-star-ratings";
import { VolumeModel } from "../BookFinder/BookList/interfaces/VolumeModel";
import styles from "./BookInfo.module.scss";

export const BookInfo: FunctionComponent = () => {
  const params = useParams<{ bookId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState<VolumeModel | null>(null);
  const bookId = useMemo(() => {
    return params.bookId;
  }, [params]);

  const fetchBook = useCallback(async () => {
    setIsLoading(true);
    console.log(bookId);

    try {
      const result = await axios(`${fetchUrl}${bookId}`);

      setBook(result.data);
    } catch (e) {
      notification.error({
        message: "An error occurred",
        description: "Please try searching again",
      });
    }

    setIsLoading(false);
  }, [bookId]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  if (book == null || isLoading) {
    return <Skeleton />;
  }

  return (
    <div className={styles.wrap}>
      <img
        height={360}
        alt="logo"
        src={
          book?.volumeInfo.imageLinks?.medium ||
          book?.volumeInfo.imageLinks?.thumbnail
        }
      />
      <div className={styles.inner}>
        <span>{book?.volumeInfo.title}</span>
        <span>by {renderAuthors(book?.volumeInfo.authors)}</span>
        <div>
          <StarRatings
            rating={book?.volumeInfo.averageRating}
            starRatedColor="orange"
            numberOfStars={5}
            starDimension="16px"
            starSpacing="2px"
            name="rating"
          />
          <span>{book.volumeInfo.ratingsCount}</span>
        </div>
      </div>
    </div>
  );
};
