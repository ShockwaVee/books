import { VolumeModel } from "../../../components/BookFinder/BookList/interfaces/VolumeModel";

export interface SearchInterface {
  books: VolumeModel[];
  total: number;
  startIndex: number;
  isLoading: boolean;
}
