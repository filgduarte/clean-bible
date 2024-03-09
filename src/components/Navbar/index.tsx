import { useContext } from "react";
import { CurrentReadingPayload } from "../../types";
import { currentReadingContext } from "../../contexts/currentReading";
import { bibleInfo, scrollToTop } from "../../utils";
import './style.css';

function Navbar() {
    const {state, dispatch} = useContext(currentReadingContext);

    return(
        <nav id='navbar' className={state.page}>
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
                onClick = {() => handleNavClick('SET', {page: 'summary'})}
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

    function handleNavClick(actionType: string, payload?: CurrentReadingPayload) {
        dispatch({type: actionType, payload: payload});
        scrollToTop();
    }
}

export default Navbar;