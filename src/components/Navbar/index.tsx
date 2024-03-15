import { useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bibleInfo, scrollToTop } from "../../utils";
import { addToHistory } from "../../models/history";
import { CurrentReadingContext, PageContext } from "../../context";
import { NavbarProps } from "./types";
import './style.css';

function Navbar({setPage}: NavbarProps) {
    const page = useContext(PageContext);
    const currentReading = useContext(CurrentReadingContext);

    return(
        <nav id='navbar' className={page}>
            <button
                id='goto-previous'
                title='Anterior'
                onClick={() => handlePreviousClick()}
            >
                <ChevronLeft />
            </button>

            <button
                id='goto-summary'
                title='Índice'
                onClick = {() => handleSummaryClick()}
            >
                {bibleInfo[currentReading.book].name} {currentReading.chapter + 1}
            </button>

            <button
                id='goto-next'
                title='Próximo'
                onClick={() => handleNextClick()}
            >
                    <ChevronRight />
            </button>
        </nav>
    );

    function handlePreviousClick() {
        let previousChapter = null;

        if (currentReading.chapter > 0) {
            previousChapter = {
                book: currentReading.book,
                chapter: currentReading.chapter - 1
            };
        }
        else if (currentReading.book > 0) {
            previousChapter = {
                book: currentReading.book - 1,
                chapter: bibleInfo[currentReading.book - 1].chapters - 1
            };
        }

        if (previousChapter) {
            addToHistory(previousChapter);
            scrollToTop();
        }
    }

    function handleNextClick() {
        let nextChapter = null;
        if (currentReading.chapter < bibleInfo[currentReading.book].chapters - 1) {
            nextChapter = {
                book: currentReading.book,
                chapter: currentReading.chapter + 1,
            };
        }
        else if (currentReading.book < bibleInfo.length - 1) {
            nextChapter = {
                book: currentReading.book + 1,
                chapter: 0
            };
        }

        if (nextChapter) {
            addToHistory(nextChapter);
            scrollToTop();
        }
    }

    function handleSummaryClick() {
        setPage( (page == 'read') ? 'summary' : 'read' );

        scrollToTop();
    }
}

export default Navbar;