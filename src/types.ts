export interface AppDefs {
    pages: string[];
    availableVersions: string[];
}

export interface CurrentReading {
    page: string;
    version: string;
    book: number;
    chapter: number;
}

export interface CurrentReadingAction {
    type: string;
    payload?: CurrentReading;
}

export interface CurrentReadingContext {
    state: CurrentReading | null;
    dispatch: (action: CurrentReadingAction) => void;
}

export interface BookInfo {
    testament: number;
    abbrev: string;
    name: string;
    chapters: number;
}

export type BibleInfo = BookInfo[];