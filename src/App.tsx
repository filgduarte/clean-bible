import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import Reader from "./components/Reader";
import Navbar from "./components/Navbar";
import Summary from "./components/Summary";
import Toolbar from "./components/Toolbar";
import { db } from "./models/db";
import { UserPreferencesContext, PageContext, CurrentReadingContext } from "./context";
import { UserPreferenceOptions, CurrentReading } from "./types";

function App() {
    const [page, setPage] = useState('read');
    
    const preferencesResults = useLiveQuery(
        () => db.preferences.toArray()
    );
    
    const userPreferences: UserPreferenceOptions = {};
    
    if (preferencesResults) {
        preferencesResults.forEach(result => {
            userPreferences[result.option] = result.value;
        });
    }

    const currentReadingResult = useLiveQuery(
        () => db.history
        .orderBy('timestamp')
        .reverse()
        .first()
    );

    const currentReading: CurrentReading = {
        book: 0,
        chapter: 0
    }

    if (currentReadingResult) {
        currentReading.book = currentReadingResult.book;
        currentReading.chapter = currentReadingResult.chapter;
    }

    return (
        <UserPreferencesContext.Provider value={userPreferences}>    
            <PageContext.Provider value={page}>
                <CurrentReadingContext.Provider value={currentReading}>

                    <div id='bible' className={(userPreferences && userPreferences.theme) ? userPreferences.theme : ''}>
                        {/* <Toolbar /> */}
                        <Reader />
                        <Navbar setPage={setPage} />
                        {/* <Summary /> */}
                    </div>

                </CurrentReadingContext.Provider>
            </PageContext.Provider>
        </UserPreferencesContext.Provider>
    )
}

export default App;