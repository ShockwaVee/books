import { ImageLinkModel } from "./ImageLinkModel";
import { IndustryIdentifier } from "./IndustryIdentifier";

export interface VolumeInfo {
  imageLinks: ImageLinkModel | undefined;
  title: string;
  description: string;
  authors: undefined | string[];
  averageRating: number;
  ratingsCount: number;
  publisher: string;
  publishedDate: string;
  pageCount: string;
  industryIdentifiers: IndustryIdentifier[];
  categories: string[];
  maturityRating: string;
}
