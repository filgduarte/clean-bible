import { useContext } from "react";
import { currentReadingContext } from "../contexts/currentReading";
import { bibleInfo, scrollToTop } from "../utils";

export default function Navbar() {
    const {state, dispatch} = useContext(currentReadingContext);

    return(
        <nav id='navbar'>
            <button
                id='goto-previous'
                title='Anterior'
                onClick={() => handleNavClick('PREVIOUS')}
            >
                Previous
            </button>

            <button
                id='goto-summary'
                title='Índice'
            >
                {bibleInfo[state.book].name} {state.chapter + 1}
            </button>

            <button
                id='goto-next'
                title='Próximo'
                onClick={() => handleNavClick('NEXT')}
            >
                    Next
            </button>
        </nav>
    );

    function handleNavClick(actionType: string) {
        dispatch({type: actionType});
        scrollToTop();
    }
}