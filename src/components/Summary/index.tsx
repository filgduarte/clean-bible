import { useContext } from "react";
import { addToHistory } from "../../models/history";
import { PageContext } from "../../context";
import { bibleInfo } from "../../utils";
import { SummaryProps, TestamentBooks } from "./types";
import AccordionItem from "../AccordionItem";
import './style.css';

function Summary({changePage, myRef}: SummaryProps) {
    const pageInfo = useContext(PageContext);
    const oldTestamentBooks: TestamentBooks[] = [];
    const newTestamentBooks: TestamentBooks[] = [];

    bibleInfo.forEach((bookInfo, index) => {
        if (bookInfo.testament == 0) {
            oldTestamentBooks.push({
                index: index,
                name: bookInfo.name
            });
        }
        else {
            newTestamentBooks.push({
                index: index,
                name: bookInfo.name
            });
        }
    })

    return (
        <section ref={myRef} id='summary' className={(pageInfo.page == 'summary' ? '' : 'hidden')}>
            <h1>Índice</h1>
            <ul id='testament-0' className='testament-books'>
            {
                oldTestamentBooks.map((book, index) => (
                    <li className="book" key={index}>
                        <AccordionItem
                            id={`book-selector-${book.index}`}
                            title={book.name}
                            active={book.index == pageInfo.book}
                            onClick={() => handleAccordionItemClick(book.index)}
                            key={index}
                        >
                            {
                                createChaptersButtons(book.index)
                            }
                        </AccordionItem>
                    </li>
                ))
            }
            </ul>
            <ul id='testament-1' className='testament-books'>
            {
                newTestamentBooks.map((book, index) => (
                    <li className="book" key={index}>
                        <AccordionItem
                            id={`book-selector-${book.index}`}
                            title={book.name}
                            active={book.index == pageInfo.book}
                            onClick={() => handleAccordionItemClick(book.index)}
                            key={index}
                        >
                            {
                                createChaptersButtons(book.index)
                            }
                        </AccordionItem>
                    </li>
                ))
            }
            </ul>
        </section>
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
        const targetPage = pageInfo.page;
        const targetBook = (index === pageInfo.book) ? -1 : index
        const targetScroll = `book-selector-${index}`;

        changePage(targetPage, targetBook, targetScroll);
    }

    async function onBookChapterSelect(selectedBook: number, selectedChapter: number) {
        addToHistory({
            book: selectedBook,
            chapter: selectedChapter,
        })
        .then(() => changePage('read', selectedBook, 'top'));
    }
}

export default Summary;