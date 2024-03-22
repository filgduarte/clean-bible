import { useState, useRef, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./models/db";
import { UserPreferencesContext, PageContext, HistoryContext, RefContext } from "./context";
import { appDefs, scrollTo } from "./utils";
import { UserPreferenceOptions, PageInfo, HistoryEntry } from "./types";
import Options from "./components/Options";
import Reader from "./components/Reader";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import History from "./components/History";

function App() {
    const refs = {
        reader: useRef(null),
        summary: useRef(null)
    }
    const [pageInfo, setPageInfo] = useState<PageInfo>({page: 'read', book: 0, scrollPosition: 'top'});
    const preferencesResults = useLiveQuery(
        () => db.preferences.toArray()
    );
    const userPreferences: UserPreferenceOptions = {};
    if (preferencesResults) {
        preferencesResults.forEach(result => {
            userPreferences[result.option] = result.value;
        });
    }

    const HistoryResult = useLiveQuery(
        () => db.history
        .orderBy('timestamp')
        .reverse()
        .toArray()
    );
    const history: HistoryEntry[] = [];

    if (HistoryResult) {
        HistoryResult.forEach((result, index) => {
            const date = new Date(result.timestamp)
            history[index] = {
                date: date.toLocaleString(),
                book: result.book,
                chapter: result.chapter
            };
        })
    }

    useEffect(() => {
        if ( document.getElementById(pageInfo.page) ) {
            scrollTo(pageInfo.scrollPosition, pageInfo.page);
        }
    }, [pageInfo, history]);

    return (
        <UserPreferencesContext.Provider value={userPreferences}>    
            <PageContext.Provider value={pageInfo}>
                <HistoryContext.Provider value={history}>
                    <RefContext.Provider value={refs}>

                        {(preferencesResults && HistoryResult)
                            ?
                                <div id='bible'>
                                    <Reader myRef={refs.reader} />
                                    <Summary changePage={changePage} myRef={refs.summary} />
                                    <History changePage={changePage} />
                                    {/* <Options changePage={changePage} /> */}
                                    <Navbar changePage={changePage} />
                                </div>
                            :
                                <div id='loading'>
                                    Carregando...
                                </div>
                        }

                    </RefContext.Provider>
                </HistoryContext.Provider>
            </PageContext.Provider>
        </UserPreferencesContext.Provider>
    )

    function changePage(
        targetPage: string,
        targetBook: number = pageInfo.book,
        targetScroll: string = 'top'
    ) {
        if ( appDefs.pages.includes(targetPage) ) {
            setPageInfo({
                page: targetPage,
                book: targetBook,
                scrollPosition: targetScroll
            });
        }
    }
}

export default App;