import { CurrentReading, CurrentReadingAction } from "../types";
import { bibleInfo, appDefs } from "../utils";

export function currentReadingReducer(state: CurrentReading, action: CurrentReadingAction): CurrentReading {
    const { type, payload } = action;
    switch (type) {
        case 'NEXT':
            if (state.chapter < bibleInfo[state.book].chapters - 1) {
                return {
                    ...state,
                    chapter: state.chapter + 1,
                }
            }
            else if (state.book < bibleInfo.length - 1) {
                return {
                    ...state,
                    book: state.book + 1,
                    chapter: 0
                }
            }
        break;

        case 'PREVIOUS':
            if (state.chapter > 0) {
                return {
                    ...state,
                    chapter: state.chapter - 1
                }
            }
            else if (state.book > 0) {
                return {
                    ...state,
                    book: state.book - 1,
                    chapter: bibleInfo[state.book - 1].chapters - 1
                }
            }
        break;

        case 'SET':
            if ( ! payload ) return state;

            const nextState = {
                ...state,
            };

            if ( payload.page && appDefs.pages.includes(payload.page) ) {
                nextState.page = payload.page;
            }

            if ( payload.version && appDefs.bibleVersions.includes(payload.version) ) {
                nextState.version = payload.version;
            }

            if (payload.book && payload.book >= 0 && payload.book < bibleInfo.length) {
                nextState.book = payload.book;
            }

            if (payload.chapter && payload.chapter >= 0 && payload.chapter < bibleInfo[nextState.book].chapters) {
                nextState.chapter = payload.chapter;
            }

            return nextState;
    }

    return state;
}