import { PageInfo } from "../../types";

export interface SummaryProps {
    setPage: (value: PageInfo) => void | ((value: (prev: PageInfo) => PageInfo) => void);
}