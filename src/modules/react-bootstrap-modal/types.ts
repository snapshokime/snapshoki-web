import type {ReactNode} from "react";
import type {ButtonProps} from "react-bootstrap";

export type ReactBootstrapModalProps = {
    isOpen: boolean;
    onHide: () => void;
    title?: string;
    body?: ReactNode;
    buttons: ButtonProps[];
};