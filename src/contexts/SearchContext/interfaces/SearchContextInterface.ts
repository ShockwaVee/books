import { VolumeModel } from "../../../components/BookFinder/BookList/interfaces/VolumeModel";
import { SearchInterface } from "./SearchInterface";

export interface SearchContextInterface {
  search: {
    query: string;
    books: VolumeModel[];
    total: number;
    startIndex: number;
    isLoading: boolean;
  };
  setSearch: (searchResults: SearchInterface) => void;
}
