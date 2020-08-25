import { VolumeModel } from "../../../components/BookFinder/BookList/interfaces/VolumeModel";
import { SearchInterface } from "./SearchInterface";

export interface SearchContextInterface {
  search: {
    books: VolumeModel[];
    total: number;
    startIndex: number;
    isLoading: boolean;
  };
  setSearch: (searchResults: SearchInterface) => void;
}
