import { useContext, useState } from "react";
import { currentReadingContext } from "../../contexts/currentReading";
import { bibleInfo, scrollToTop } from "../../utils";
import AccordionItem from "../AccordionItem";
import './style.css';

function Summary() {
    const {state, dispatch} = useContext(currentReadingContext);
    const [currentSummary, setCurrentSummary] = useState(state.book);
    return (
        <aside id='summary' className={(state.page == 'summary' ? '' : 'hidden')}>
            {
                bibleInfo.map((book, bookIndex) => (
                    <AccordionItem
                        id={`book-selector-${bookIndex}`}
                        title={book.name}
                        active={bookIndex == currentSummary}
                        onClick={() => handleAccordionItemClick(bookIndex)}
                        key={bookIndex}
                    >
                        {
                            createChaptersButtons(bookIndex)
                        }
                    </AccordionItem>
                ))
            }
        </aside>
    )

    function createChaptersButtons(bookIndex: number) {
        const chapterVersesButtons = [];
        for (let i = 0; i < bibleInfo[bookIndex].chapters; i++) {
            chapterVersesButtons.push(
                <button
                    className='chapter-selector'
                    title={`Capítulo ${i + 1}`}
                    onClick={() => onBookChapterSelect(bookIndex, i)}
                    key={i}
                >
                    {i + 1}
                </button>
            );
        }
        return chapterVersesButtons;
    }

    function handleAccordionItemClick(index: number) {
        setCurrentSummary( (index == currentSummary) ? -1 : index );
    }

    function onBookChapterSelect(selectedBook: number, selectedChapter: number) {
        dispatch({
            type: 'SET',
            payload: {
                page: 'read',
                book: selectedBook,
                chapter: selectedChapter,
            }
        });
        scrollToTop();
    }
}

export default Summary;