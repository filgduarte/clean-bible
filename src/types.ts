export interface AppDefs {
    pages: string[];
    languages: string[];
    bibleVersions: string[];
    fontSizeLimit: FontSizeLimit;
    historySize: number;
}

export interface FontSizeLimit {
    min: number;
    max: number;
}

export interface BookInfo {
    testament: number;
    abbrev: string;
    name: string;
    chapters: number;
}

export type BibleInfo = BookInfo[];

export interface Bookmark {
    book: number | null;
    chapter: number | null;
}

export interface UserPreferenceOptions {
    [key: string]: string;
}

export interface CurrentReading {
    book: number;
    chapter: number;
}

export interface PageInfo {
    page: string;
    book: number;
}

export interface HistoryEntry {
    date: string;
    book: number;
    chapter: number;
}