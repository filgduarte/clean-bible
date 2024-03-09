import { bibleInfo, appDefs } from "../utils";
import { CurrentReading, CurrentReadingAction } from "../types";

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

            if ( appDefs.pages.includes(payload.page) ) {
                nextState.page = payload.page;
            }

            if ( appDefs.bibleVersions.includes(payload.version) ) {
                nextState.version = payload.version;
            }

            if (payload.book >= 0 && payload.book < bibleInfo.length) {
                nextState.book = payload.book;
            }

            if (payload.chapter >= 0 && payload.chapter < bibleInfo[nextState.book].chapters) {
                nextState.chapter = payload.chapter;
            }

            return nextState;
    }

    return state;
}