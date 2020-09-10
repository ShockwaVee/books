import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { fetchUrl } from "../../helpers/BookHelper";
import { Badge, notification, Skeleton, Typography } from "antd";
// @ts-ignore
import StarRatings from "react-star-ratings";
import { VolumeModel } from "../BookFinder/BookList/interfaces/VolumeModel";
import styles from "./BookInfo.module.scss";
import { TextContent } from "../global/TextContent/TextContent";
import { BookDetails } from "./BookDetails/BookDetails";
import { searchContext } from "../../contexts/SearchContext/SearchContext";

export const BookInfo: FunctionComponent = () => {
  const { Title } = Typography;
  const history = useHistory();
  const location = useLocation();
  const params = useParams<{ bookId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState<VolumeModel | null>(null);
  const bookId = useMemo(() => {
    return params.bookId;
  }, [params]);
  const { search, setSearch } = useContext(searchContext);

  const searchForAuthorsBooks = (author: string) => {
    const pathname = location.pathname;
    if (pathname !== "/") {
      history.push("/");
    }
    setSearch({ ...search, query: `inauthor:${author}`, startIndex: 0 });
  };

  const renderAuthors = (authors: string[] | undefined) => {
    if (authors == null) {
      return "-";
    }

    return authors.map((author: string, i: number) => {
      return [
        i > 0 && ", ",
        <button
          className={styles.authorButton}
          key={author}
          onClick={() => searchForAuthorsBooks(author)}
        >
          {author}
        </button>,
      ];
    });
  };

  const fetchBook = useCallback(async () => {
    setIsLoading(true);

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

  const renderImage = (book: VolumeModel) => {
    if (book.volumeInfo.categories) {
      return (
        <Badge.Ribbon
          text={book.volumeInfo.categories ? book.volumeInfo.categories[0] : ""}
        >
          <img
            height={360}
            alt="logo"
            src={book?.volumeInfo.imageLinks?.thumbnail}
          />
        </Badge.Ribbon>
      );
    } else {
      return (
        <img
          height={240}
          alt="logo"
          src={book?.volumeInfo.imageLinks?.thumbnail}
        />
      );
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.technicalDetails}>
        <div className={styles.imageWrapper}>{renderImage(book)}</div>
        <BookDetails book={book} />
      </div>
      <div className={styles.inner}>
        <div className={styles.nameAndRatingWrapper}>
          <Title className={styles.title}>{book?.volumeInfo.title}</Title>
          <div className={styles.starRatingWrapper}>
            <StarRatings
              rating={book?.volumeInfo.averageRating}
              starRatedColor="orange"
              numberOfStars={5}
              starDimension="24px"
              starSpacing="3px"
              name="rating"
            />
            <TextContent strong={true} fontSize={16}>
              {book.volumeInfo.averageRating}&nbsp;
            </TextContent>
            <TextContent strong={true} fontSize={16}>
              ({book.volumeInfo.ratingsCount})
            </TextContent>
          </div>
        </div>
        <Title className={styles.authors} level={3}>
          by {renderAuthors(book?.volumeInfo.authors)}
        </Title>
        <TextContent>
          <div
            dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }}
          />
        </TextContent>
      </div>
    </div>
  );
};
