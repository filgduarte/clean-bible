import { useContext, useState, useEffect } from "react";
import { UserPreferencesContext, PageContext, HistoryContext } from "../../context";
import { bibleInfo } from "../../utils";
import { BibleData } from "./types";
import './style.css';

function Reader() {
    const userPreferences = useContext(UserPreferencesContext);
    const pageInfo = useContext(PageContext);
    const currentReading = useContext(HistoryContext)[0];
    const [bibleData, setBibleData] = useState<BibleData>();
    const [placeholder, setPlaceholder] = useState('Carregando...');

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
        <main id='reader' className={(pageInfo.page == 'read') ? '' : 'hidden'} style={{fontSize: userPreferences.fontSize + 'rem'}}>
            <h1>{bibleInfo[currentReading.book].name}</h1>
            <h2>{currentReading.chapter + 1}</h2>
            {
                bibleData
                ? bibleData.texts[currentReading.book][currentReading.chapter]
                    .map((verse, index) => (
                        <p key={index}>
                            <small>{index + 1}</small> {verse}
                        </p>
                    ))
                : placeholder
            }
        </main>
    )
}

export default Reader;