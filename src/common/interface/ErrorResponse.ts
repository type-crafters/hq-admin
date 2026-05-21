import { AppResponse } from "./AppResponse";

export interface ErrorResponse extends AppResponse {
    error: string;
}