import { ImageLinkModel } from "./ImageLinkModel";

export interface VolumeModel {
  id: string;
  volumeInfo: {
    imageLinks: ImageLinkModel | undefined;
    title: string;
    description: string;
    authors: undefined | string[];
    averageRating: number;
    ratingsCount: number;
  };
}
