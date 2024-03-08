import { useReducer } from "react";
import { currentReadingReducer } from "./states/currentReading";
import { currentReadingContext } from "./contexts/currentReading";

function App() {
  const [currentReading, currentReadingDispatch] = useReducer(
    currentReadingReducer,
    {
      page: 'read',
      version: 'blt',
      book: 0,
      chapter: 0
    }
  );

  return (
    <currentReadingContext.Provider value={{state: currentReading, dispatch: currentReadingDispatch}}>
      <div>
        Livro atual: {currentReading.book}<br />
        Capítulo atual: {currentReading.chapter}<br />
        <button onClick={() => currentReadingDispatch({type: 'PREVIOUS'})}>Previous</button>
        <button onClick={() => currentReadingDispatch({type: 'NEXT'})}>Next</button>
      </div>
    </currentReadingContext.Provider>
  )
}

export default App;