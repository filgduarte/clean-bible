import { useContext } from "react";
import { addToHistory } from "../../models/history";
import { HistoryContext, PageContext } from "../../context";
import { bibleInfo } from "../../utils";
import { HistoryProps } from "./types";
import './style.css';

function History({setPage}: HistoryProps) {
    const history = useContext(HistoryContext);
    const pageInfo = useContext(PageContext);
    
    return (
        <aside id='history' className={(pageInfo.page == 'history') ? '' : 'hidden'}>
            <h2>Histórico</h2>
            <ul id='history-list'>
                {
                    history.map( (entry, index) => (
                        <li className='history-list__entry' key={index}>
                            <button onClick={() => onHistoryEntrySelect(entry.book, entry.chapter)}>
                                {bibleInfo[entry.book].name} {entry.chapter + 1}
                                <small>{entry.date}</small>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </aside>
    )

    async function onHistoryEntrySelect(selectedBook: number, selectedChapter: number) {
        const currentReading = history[0];

        if (selectedBook == currentReading.book && selectedChapter == currentReading.chapter) {
            setPage({
                page: 'read',
                book: currentReading.book,
                scrollPosition: 'top'
            });
        }
        else {
            await addToHistory({
                book: selectedBook,
                chapter: selectedChapter,
            })
            .then(() => {
                setPage({
                    page: 'read',
                    book: selectedBook,
                    scrollPosition: 'top'
                });
            });
        }
    }
}

export default History;