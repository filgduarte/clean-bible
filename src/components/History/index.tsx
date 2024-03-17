import { useContext } from "react";
import { HistoryContext } from "../../context";
import { addToHistory } from "../../models/history";
import { bibleInfo, scrollToTop } from "../../utils";
import { HistoryProps } from "./types";

function History({setPage}: HistoryProps) {
    const history = useContext(HistoryContext);
    
    return (
        <aside id='history'>
            <h2>Histórico</h2>
            <ul className='history-list'>
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

export default History;