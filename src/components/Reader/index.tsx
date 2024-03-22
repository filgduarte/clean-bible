import { useContext, useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { addToHistory } from "../../models/history";
import { UserPreferencesContext, PageContext, HistoryContext } from "../../context";
import { bibleInfo } from "../../utils";
import { ReaderProps, BibleData } from "./types";
import './style.css';

function Reader({myRef}: ReaderProps) {
    const userPreferences = useContext(UserPreferencesContext);
    const pageInfo = useContext(PageContext);
    const currentReading = useContext(HistoryContext)[0];
    const [bibleData, setBibleData] = useState<BibleData>();
    const [placeholder, setPlaceholder] = useState('Carregando...');
    let isBookmark = false;

    if (userPreferences.bookmark) {
        const bookmark = JSON.parse(userPreferences.bookmark);

        if (bookmark.book == currentReading.book && bookmark.chapter == currentReading.chapter)
            isBookmark = true;
    }

    useEffect(() => {
        const params = {
            version: userPreferences.version,
            abbrev: bibleInfo[currentReading.book].abbrev,
            chapter: currentReading.chapter + 1
        };

        fetch(
            `./bible/${params.version}.json`
        )
        .then( response => response.json() )
        .then( data => {
            setBibleData(data[0]);
        })
        .catch( (err) => {
            setPlaceholder('Houve um erro ao carregar os dados.');
            console.log(err.message);
        });
    }, [userPreferences.version]);

    return (
        <main
            id='read'
            className={(pageInfo.page == 'read') ? '' : 'hidden'}
            style={{fontSize: userPreferences.fontSize + 'rem'}}
            ref={myRef}
            onClick={e => handleReaderClick(e)}
        >
            <div id='bookmark-tag' className={isBookmark ? 'active' : ''}>
                <Bookmark />
            </div>
            <h1>
                {bibleInfo[currentReading.book].name} {currentReading.chapter + 1}
            </h1>
            {
                bibleData
                ?
                <ol>
                    {bibleData.texts[currentReading.book][currentReading.chapter]
                    .map((verse, index) => (
                        <li key={index}>
                            {verse}
                        </li>
                    ))}
                </ol>
                : placeholder
            }
            <p className='copyright'>
                {bibleData?.copyright}
            </p>
        </main>
    )

    function handleReaderClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        const threshold = 100;
        const target = event.currentTarget as HTMLDivElement;

        if ( ! target )
            return

        if (event.clientX <= threshold)
            goToPreviousChapter();

        else if (event.clientX >= target?.offsetWidth - threshold)
            goToNextChapter();
    }
    
    async function goToNextChapter() {
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
            await addToHistory(nextChapter);
        }
    }

    async function goToPreviousChapter() {
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
            await addToHistory(previousChapter);
        }
    }
}

export default Reader;