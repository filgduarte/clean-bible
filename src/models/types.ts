export interface UserPreferencesColumns {
    option: string;
    value: string;
}

export interface HistoryColumns {
    id?: number;
    timestamp: number;
    book: number;
    chapter: number;
}

export interface Excerpt {
    verse: number;
    start: number;
    end: number;
}

export interface HighlightsColumns {
    id?: number;
    book: number;
    chapter: number;
    excerpts: Excerpt[];
}