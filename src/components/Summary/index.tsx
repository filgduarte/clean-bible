import { useContext } from "react";
import { PageContext } from "../../context";
import { addToHistory } from "../../models/history";
import { bibleInfo, scrollToTop } from "../../utils";
import { SummaryProps } from "./types";
import AccordionItem from "../AccordionItem";
import './style.css';

function Summary({setPage}: SummaryProps) {
    const pageInfo = useContext(PageContext);

    return (
        <aside id='summary' className={(pageInfo.page == 'summary' ? '' : 'hidden')}>
            <h2>Índice</h2>
            {
                bibleInfo.map((book, bookIndex) => (
                    <AccordionItem
                        id={`book-selector-${bookIndex}`}
                        title={book.name}
                        active={bookIndex == pageInfo.book}
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
        setPage({
            page: pageInfo.page,
            book: (index === pageInfo.book) ? -1 : index
        });
    }

    async function onBookChapterSelect(selectedBook: number, selectedChapter: number) {
        addToHistory({
                book: selectedBook,
                chapter: selectedChapter,
        })
        .then(() => {
            setPage({
                page: 'read',
                book: selectedBook
            });
            scrollToTop();
        });
    }
}

export default Summary;