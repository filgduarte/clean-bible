import { useContext, useState } from "react";
import { Sun, Moon, EllipsisVertical } from "lucide-react";
import './style.css';
import { db } from "../../models/db";
import { UserPreferencesContext } from "../../context";

function Toolbar() {
    const [optionsActive, setOptionsActive] = useState(false);
    const theme = useContext(UserPreferencesContext).theme;

    return(
        <menu id='toolbar'>
            <li className={optionsActive ? `toolbar__item active` : `toolbar__item`}>
                <button
                    id='options'
                    title='Opções'
                    onClick={toggleOptionsActive}
                >
                    <EllipsisVertical />
                </button>
                <menu className='submenu'>
                    <li className='toolbar__item submenu-item'>
                        <button
                            id='change-theme'
                            title='Alternar modo claro/escuro'
                        >
                            {
                                (theme == 'light')
                                ? <Moon /> + 'Mudar para modo escuro'
                                : <Sun /> + 'Mudar para modo claro'
                            }
                        </button>
                    </li>
                </menu>
            </li>
        </menu>
    )

    function toggleOptionsActive() {
        setOptionsActive( ! optionsActive );
    }

    async function toggleTheme() {
        try {
            const currentTheme = await db.preferences.put({
                option,
                value
            });
        }
    }
}

export default Toolbar;