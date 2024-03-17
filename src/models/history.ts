import { db } from "./db";
import { appDefs } from "../utils";
import { CurrentReading } from "../types";

export async function addToHistory(entry: CurrentReading) {
    const historyEntries = await db.history.count();

    if (historyEntries >= appDefs.historySize) {
        const oldestEntry = await db.history.orderBy('timestamp').first();

        if (oldestEntry) {
            await db.history.delete(oldestEntry.id!);
        }
    }

    await db.history.add({
        timestamp: Date.now(),
        book: entry.book,
        chapter: entry.chapter
    });
}