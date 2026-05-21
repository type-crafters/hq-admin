import { AppResponse } from "./AppResponse";
import { ResponseMetadata } from "./ResponseMetadata";

export interface ItemResponse<T> extends AppResponse {
    data: T;
    meta?: ResponseMetadata;
}