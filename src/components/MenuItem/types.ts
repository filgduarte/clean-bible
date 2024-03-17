import { ReactNode } from "react";

export interface MenuItemProps {
    id: string;
    title: string;
    label: string;
    icon?: ReactNode;
    action?: () => void;
    subItems?: MenuItemProps[];
}