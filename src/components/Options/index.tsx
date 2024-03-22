import { useContext, useState, useEffect } from "react";
import {
    EllipsisVertical,
    X,
    Sun,
    Moon,
    AArrowUp,
    AArrowDown,
    Bookmark
} from "lucide-react";
import { db } from "../../models/db";
import { addToHistory } from "../../models/history";
import { UserPreferencesContext, HistoryContext } from "../../context";
import { appDefs, bibleInfo } from "../../utils";
import { OptionsProps } from "./types";
import './style.css';

function Options({changePage}: OptionsProps) {
    const userPreferences = useContext(UserPreferencesContext);
    const history = useContext(HistoryContext);
    const [isOpen, setIsOpen] = useState(false);
    const optionsItems = [
        {
            id: 'switch-theme',
            title: 'Mudar para modo ' + (userPreferences.theme == 'light' ? 'escuro' : 'claro'),
            label: 'Modo ' + (userPreferences.theme == 'light' ? 'escuro' : 'claro'),
            icon: (userPreferences.theme == 'light') ? <Moon /> : <Sun />,
            action: switchTheme
        },
        {
            id: 'increase-font-size',
            title: 'Aumentar tamanho do texto',
            label: 'Letras maiores',
            icon: <AArrowUp />,
            action: () => { changeFontSize('increase') }
        },
        {
            id: 'decrease-font-size',
            title: 'Diminuir tamanho do texto',
            label: 'Letras menores',
            icon: <AArrowDown />,
            action: () => { changeFontSize('decrease') }
        },
    ];

    const bookmark = userPreferences.bookmark ? JSON.parse(userPreferences.bookmark) : undefined;

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
        <section id='options' className={isOpen ? 'active' : ''}>
            <button
                id='toggle-options'
                title='Abrir menu de opções'
                onClick={() => { setIsOpen( ! isOpen )}}
            >
                {isOpen ? <X /> : <EllipsisVertical />}
            </button>
            <div id='options-panel'>
                <h1>Opções</h1>
                <menu id='options-menu'>
                {
                    optionsItems.map((option, index) => (
                        <li className='option-item' key={index}>
                            <button
                                id={option.id}
                                title={option.title}
                                onClick={option.action}
                                >
                                {option.icon}
                                {option.label}
                            </button>
                        </li>
                    ))
                }
                </menu>
                    <div id='bookmark'>
                        <h3><Bookmark /> Marcador de página:</h3>
                    {
                    bookmark &&
                        <button onClick={goToBookmark}>Ir para <span>{bibleInfo[bookmark.book].abbrev} {bookmark.chapter + 1}</span></button>
                    }
                        <button onClick={moveBookmark}>Marcar esta página</button>
                    </div>
            </div>
        </section>
    )

    async function switchTheme() {
        try {
            await db.preferences.put({
                option: 'theme',
                value: (userPreferences.theme == 'light') ? 'dark' : 'light',
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    async function changeFontSize(action: string) {
        const currentFontSize = parseFloat(userPreferences.fontSize);
        let nextFontSize = currentFontSize;

        if (action == 'increase' && currentFontSize < appDefs.fontSizeLimit.max) {
            nextFontSize = ( (currentFontSize * 10) + 2) / 10;
        }
        else if (action == 'decrease' && currentFontSize > appDefs.fontSizeLimit.min) {
            nextFontSize = ( (currentFontSize * 10) - 2) / 10;
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

    async function moveBookmark() {
        const bookmark = {
            book: history[0].book,
            chapter: history[0].chapter
        }
        const bookmarkJson = JSON.stringify(bookmark);
        try {
            await db.preferences.put({
                option: 'bookmark',
                value: bookmarkJson,
            });
        }
        catch(err) {
            console.log(err);
        }
        setIsOpen( false );
    }

    async function goToBookmark() {
        if (bookmark.book == history[0].book && bookmark.chapter == history[0].chapter) {
            changePage('read', bookmark.book, 'top');
        }
        else {
            await addToHistory({
                book: bookmark.book,
                chapter: bookmark.chapter,
            })
            .then(() => changePage('read', bookmark.book, 'top'));
        }
        setIsOpen( false );
    }
}

export default Options;