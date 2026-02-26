export interface ModalData {
    title: string;
    message: string;
    buttonText: string;
    buttonAction?: (event?: MouseEvent) => void;
}