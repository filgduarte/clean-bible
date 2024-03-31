import { useState, useRef, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./models/db";
import { UserPreferencesContext, PageContext, HistoryContext, RefContext } from "./context";
import { appDefs, scrollTo } from "./utils";
import { UserPreferenceOptions, PageInfo, ScrollDefs, HistoryEntry } from "./types";
import Reader from "./components/Reader";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import History from "./components/History";

function App() {
    const refs = {
        reader: useRef(null),
        summary: useRef(null)
    }
    const [pageInfo, setPageInfo] = useState<PageInfo>({page: 'read', book: 0});
    const [scrollDefs, setScrollDefs] = useState<ScrollDefs>({
        position: 'top',
        behavior: 'auto'
    });
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
        switch (userPreferences.theme) {
            case 'light':
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            break;
            case 'dark':
                document.body.classList.remove('light');
                document.body.classList.add('dark');
            break;
        }

        if ( document.getElementById(pageInfo.page) && scrollDefs.position && scrollDefs.position != 'none') {
            scrollTo(scrollDefs.position, pageInfo.page, scrollDefs.behavior);
        }
    }, [pageInfo.page, history, scrollDefs, userPreferences.theme]);

    return (
        <UserPreferencesContext.Provider value={userPreferences}>    
            <PageContext.Provider value={pageInfo}>
                <HistoryContext.Provider value={history}>
                    <RefContext.Provider value={refs}>

                        {(preferencesResults && HistoryResult)
                            ?
                                <main id='bible'>
                                    <Reader myRef={refs.reader} />
                                    <Summary changePage={changePage} myRef={refs.summary} />
                                    <History changePage={changePage} />
                                    <Navbar changePage={changePage} />
                                </main>
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
        targetScroll: string = 'top',
        smooth: ScrollBehavior = 'auto'
    ) {
        if ( appDefs.pages.includes(targetPage) ) {
            setPageInfo({
                page: targetPage,
                book: targetBook,
            });
            setScrollDefs(prev => (
                {
                    ...prev,
                    ...(targetScroll && { position: targetScroll }),
                    ...(smooth && { behavior: smooth })
                }
            ));
        }
    }
}

export default App;