import { MutableRefObject } from "react";
import { ChangePage } from "../../types";

export interface SummaryProps {
    changePage: ChangePage;
    myRef: MutableRefObject<HTMLDivElement | null> | null;
}

export interface TestamentBooks {
    index: number;
    name: string;
}