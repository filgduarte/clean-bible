import { useContext, useState, useEffect } from "react";
import { PageContext, HistoryContext, RefContext } from "../../context";
import { bibleInfo } from "../../utils";
import './style.css';

function CurrentChapterStats() {
    const pageInfo = useContext(PageContext);
    const currentReading = useContext(HistoryContext)[0];
    const readerRef = useContext(RefContext).reader;
    const [scrollProgress, setScrollProgress] = useState('0%');

    useEffect( () => {
        const element = readerRef?.current;

        if ( element ) {
            element.addEventListener('scroll', () => scrollListener(element));

            return () => {
                element.removeEventListener('scroll', () => scrollListener(element));
            };
        }
        
    }, [readerRef]);

    return(
        <aside id='current-chapter-stats' className='extra-nav'>
            <h3>
                {bibleInfo[currentReading.book].name}
            </h3>
            <div id='chapter-count'>
                {currentReading.chapter + 1} de {bibleInfo[currentReading.book].chapters}
            </div>
            <div className='progress-container'>
                <div className='progress-bar' style={{width: scrollProgress}}></div>
            </div>
        </aside>
    )

    function scrollListener(element: HTMLDivElement) {
        const scrolledAmount = element.scrollTop;
        const scrollTotal = element.scrollHeight - element.clientHeight;
        const scrollPercentage = `${scrolledAmount / scrollTotal * 100}%`;

        setScrollProgress(scrollPercentage);
    }
}

export default CurrentChapterStats;