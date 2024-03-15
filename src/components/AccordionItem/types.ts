import { ReactNode } from "react";

export interface AccordionItemProps {
    id: string;
    title: string;
    active?: boolean;
    onClick: () => void;
    children: ReactNode;
}