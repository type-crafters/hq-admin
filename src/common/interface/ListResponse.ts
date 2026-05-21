import { AppResponse } from "./AppResponse";
import { ResponseMetadata } from "./ResponseMetadata";

export interface ListResponse<T> extends AppResponse {
    data: Array<T>;
    meta?: ResponseMetadata;
}