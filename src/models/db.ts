import Dexie, { Table } from "dexie";
import { populate } from './populate';
import { UserPreferencesColumns, HistoryColumns, HighlightsColumns } from "./types";

export class CleanBibleDexie extends Dexie {
    preferences!: Table<UserPreferencesColumns>;
    history!: Table<HistoryColumns>;
    highlights!: Table<HighlightsColumns>;

    constructor() {
        super('cleanBibleDatabase');
        this.version(1).stores({
            preferences: '&option',
            history: '++id, timestamp',
            highlights: '++id, [book+chapter]'
        });
    }
}

export const db = new CleanBibleDexie();

db.on('populate', populate);