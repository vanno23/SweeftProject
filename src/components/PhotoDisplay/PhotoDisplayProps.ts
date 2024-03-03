import { Photo } from "../../commonTypes/photoList";

export interface PhotoDisplayProps {
  photos: Photo[];
  loading?: boolean;
  headingText: string;
}
