export interface BookListProps {
  books: any[];
  total: number;
  onChangePage: (pageSize: number) => void;
  currentPage: number;
  isLoading: boolean;
}
