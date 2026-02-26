import type { AlertType } from "$util/AlertType";

export interface AlertData {
    type: AlertType,
    message: string;
}