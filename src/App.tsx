import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./models/db";
import { UserPreferencesContext, PageContext, HistoryContext } from "./context";
import { scrollTo } from "./utils";
import { UserPreferenceOptions, PageInfo, HistoryEntry } from "./types";
import Options from "./components/Options";
import Reader from "./components/Reader";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import History from "./components/History";

function App() {
    const [pageInfo, setPage] = useState<PageInfo>({page: 'read', book: 0, scrollPosition: 'top'});
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

                {(preferencesResults && HistoryResult)
                    ?
                        <div id='bible'>
                            <Options setPage={setPage} />
                            <Reader />
                            <Navbar setPage={setPage} />
                            <Summary setPage={setPage} />
                            <History setPage={setPage} />
                        </div>
                    :
                        <div id='loading'>
                            Carregando...
                        </div>
                }

                </HistoryContext.Provider>
            </PageContext.Provider>
        </UserPreferencesContext.Provider>
    )
}

export default App;