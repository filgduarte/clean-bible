import { ReactNode } from "react";

export interface AppDefs {
    pages: string[];
    bibleVersions: string[];
}

export interface CurrentReading {
    page: string;
    version: string;
    book: number;
    chapter: number;
}

export interface CurrentReadingPayload {
    page?: string;
    version?: string;
    book?: number;
    chapter?: number;
}

export interface CurrentReadingAction {
    type: string;
    payload?: CurrentReadingPayload;
}

export interface CurrentReadingContext {
    state: CurrentReading;
    dispatch: (action: CurrentReadingAction) => void;
}

export interface BookInfo {
    testament: number;
    abbrev: string;
    name: string;
    chapters: number;
}

export type BibleInfo = BookInfo[];

export type BibleChapter = string[];

export type BibleBook = BibleChapter[];

export interface BibleData {
    name: string;
    abbrev: string;
    copyright: string;
    language: string;
    texts: BibleBook[];
}

export interface AccordionItemProps {
    id: string;
    title: string;
    active?: boolean;
    onClick: () => void;
    children: ReactNode;
}