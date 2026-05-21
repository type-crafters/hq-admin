export interface ToastContent {
    title: string;
    message: string;
}

export type OptionalToastContent = ToastContent | Record<string, never>;