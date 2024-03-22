import { useContext, useState, useEffect } from "react";
import {
    Sun,
    Moon,
    AArrowUp,
    AArrowDown,
} from "lucide-react";
import { db } from "../../models/db";
import { addToHistory } from "../../models/history";
import { UserPreferencesContext, PageContext, HistoryContext } from "../../context";
import { appDefs, bibleInfo } from "../../utils";
import { OptionsProps } from "./types";
import './style.css';

function Options({changePage}: OptionsProps) {
    const userPreferences = useContext(UserPreferencesContext);
    const currentPage = useContext(PageContext).page;
    const history = useContext(HistoryContext);

    const [options, setOptions] = useState({
        bibleVersion: userPreferences.bibleVersion,
        theme: userPreferences.theme
    });

    useEffect(() => {
        switch (userPreferences.theme) {
            case 'light':
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            break;
            case 'dark':
                document.body.classList.remove('light');
                document.body.classList.add('dark');
            break;
        }
    }, [userPreferences.theme]);

    return (
        <section id='options'  className={(currentPage == 'options') ? '' : 'hidden'}>
            <h1>Opções</h1>
            <dl id='options-menu'>
                <dt className='option-version'>Versão da Bíblia</dt>
                <dd className='option-version'>
                    <select
                        id='bible-version'
                        name='bible-version'
                        value={options.bibleVersion}
                        onChange={handleVersionChange}
                    >
                        {
                            appDefs.bibleVersions.map((version, index) => (
                                <option
                                    value={version}
                                    key={index}
                                >
                                    {version}
                                </option>
                            ))
                        }
                    </select>
                </dd>

                <dt className='option-theme'>Tema</dt>
                <dd className='option-theme'>
                    <div className='option-group'>
                        <label htmlFor='theme-light'>
                            <Sun />
                        </label>
                        <input
                            type='radio'
                            id='theme-light'
                            name='theme'
                            value='light'
                            checked={options.theme == 'light'}
                            onChange={handleThemeChange}
                        />
                    </div>
                    <div className='option-group'>
                        <label htmlFor="theme-dark">
                            <Moon />
                        </label>
                        <input
                            type='radio'
                            id='theme-dark'
                            name='theme'
                            value='dark'
                            checked={options.theme == 'dark'}
                            onChange={handleThemeChange}
                        />
                    </div>
                </dd>

                <dt className='option-size'>Tamanho do texto</dt>
                <dd className='option-size'>
                    <button
                        id='decrease-font-size'
                        title='Diminuir tamanho do texto'
                        disabled={parseFloat(userPreferences.fontSize) <= appDefs.fontSizeLimit.min}
                        onClick={() => handleFontSizeChange('decrease')}
                    >
                        <AArrowDown />
                    </button>
                    <button
                        id='increase-font-size'
                        title='Aumentar tamanho do texto'
                        disabled={parseFloat(userPreferences.fontSize) >= appDefs.fontSizeLimit.max}
                        onClick={() => handleFontSizeChange('increase')}
                    >
                        <AArrowUp />
                    </button>
                </dd>
            </dl>
        </section>
    )

    async function handleVersionChange(event: React.FormEvent) {
        const selectElement = event.target as HTMLSelectElement;

        try {
            await db.preferences.put({
                option: 'bibleVersion',
                value: selectElement.value,
            });

            setOptions(prev => ({
                ...prev,
                bibleVersion: selectElement.value,
            }));
        }
        catch(err) {
            console.log(err);
        }
    }

    async function handleThemeChange(event: React.FormEvent) {
        const radioElement = event.target as HTMLInputElement;
        try {
            await db.preferences.put({
                option: 'theme',
                value: radioElement.value,
            });

            setOptions(prev => ({
                ...prev,
                theme: radioElement.value,
            }));
        }
        catch(err) {
            console.log(err);
        }
    }

    async function handleFontSizeChange(action: string) {
        const currentFontSize = parseFloat(userPreferences.fontSize);
        let nextFontSize = currentFontSize;

        if (action == 'increase' && currentFontSize < appDefs.fontSizeLimit.max) {
            nextFontSize = ( (currentFontSize * 10) + 1) / 10;
        }
        else if (action == 'decrease' && currentFontSize > appDefs.fontSizeLimit.min) {
            nextFontSize = ( (currentFontSize * 10) - 1) / 10;
        }

        if (
            typeof nextFontSize == 'number'
            && nextFontSize != currentFontSize
            && nextFontSize >= appDefs.fontSizeLimit.min
            && nextFontSize <= appDefs.fontSizeLimit.max
        ) {
            try {
                await db.preferences.put({
                    option: 'fontSize',
                    value: nextFontSize.toString(),
                });
            }
            catch(err) {
                console.log(err);
            }
        }
    }
}

export default Options;