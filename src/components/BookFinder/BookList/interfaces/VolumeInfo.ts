import { ImageLinkModel } from "./ImageLinkModel";

export interface VolumeInfo {
  imageLinks: ImageLinkModel | undefined;
  title: string;
  description: string;
  authors: undefined | string[];
  averageRating: number;
  ratingsCount: number;
}
