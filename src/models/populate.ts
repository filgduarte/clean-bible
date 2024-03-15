import { db } from "./db";
import { appDefs } from "../utils";

export async function populate() {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTimestamp = new Date().getTime();

    await db.preferences.bulkAdd([
        {
            option: 'language',
            value: appDefs.languages[0]
        },
        {
            option: 'version',
            value: appDefs.bibleVersions[0]
        },
        {
            option: 'theme',
            value: prefersDarkMode ? 'dark' : 'light'
        },
        {
            option: 'fontSize',
            value: '1'
        },
    ]);

    await db.history.add({
        timestamp: currentTimestamp,
        book: 0,
        chapter: 0,
    });
}