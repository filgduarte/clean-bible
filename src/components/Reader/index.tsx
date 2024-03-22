import { useContext, useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
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
}

export default Reader;