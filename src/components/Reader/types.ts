export type BibleChapter = string[];

export type BibleBook = BibleChapter[];

export interface BibleData {
    name: string;
    abbrev: string;
    copyright: string;
    language: string;
    texts: BibleBook[];
}