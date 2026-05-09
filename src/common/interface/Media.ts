import { MediaVisbility } from "./MediaVisibility";

export interface Media {
    id: string;
    filename: string;
    url: string;
    contentType: string;
    size: number;
    uploadedAt: Date;
    visibility: MediaVisbility;
}