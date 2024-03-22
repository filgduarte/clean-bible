import { MutableRefObject } from "react";

export type ReaderProps = {
    myRef: MutableRefObject<HTMLDivElement | null> | null;
}

export type BibleChapter = string[];

export type BibleBook = BibleChapter[];

export interface BibleData {
    name: string;
    abbrev: string;
    copyright: string;
    language: string;
    texts: BibleBook[];
}