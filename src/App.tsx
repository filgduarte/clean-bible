import { useReducer } from "react";
import { appDefs } from "./utils";
import { currentReadingReducer } from "./states/currentReading";
import { currentReadingContext } from "./contexts/currentReading";
import { Reader } from "./components/Reader";

function App() {
  const [currentReading, currentReadingDispatch] = useReducer(
    currentReadingReducer,
    {
      page: appDefs.pages[0],
      version: appDefs.bibleVersions[0],
      book: 0,
      chapter: 0
    }
  );

  return (
    <currentReadingContext.Provider value={{state: currentReading, dispatch: currentReadingDispatch}}>
      <div>
        <Reader />
        <button onClick={() => currentReadingDispatch({type: 'PREVIOUS'})}>Previous</button>
        <button onClick={() => currentReadingDispatch({type: 'NEXT'})}>Next</button>
      </div>
    </currentReadingContext.Provider>
  )
}

export default App;