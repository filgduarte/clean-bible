import { useContext, useState, useEffect } from "react";
import { Sun, Moon, EllipsisVertical } from "lucide-react";
import './style.css';
import { db } from "../../models/db";
import { UserPreferencesContext } from "../../context";

function Toolbar() {
    const [optionsActive, setOptionsActive] = useState(false);
    const theme = useContext(UserPreferencesContext).theme;

    useEffect(() => {
        switch (theme) {
            case 'light':
                document.body.classList.remove('dark');
                document.body.classList.add('light');
                break;
            case 'dark':
                document.body.classList.remove('light');
                document.body.classList.add('dark');
                break;
        }
    }, [theme]);

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
                            onClick={toggleTheme}
                        >
                            {
                                theme == 'light'
                                ? <><Moon /> Mudar para modo escuro</>
                                : <><Sun /> Mudar para modo claro</>
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
            await db.preferences.put({
                option: 'theme',
                value: (theme == 'light') ? 'dark' : 'light',
            });
        }
        catch(err) {
            console.log(err);
        }
    }
}

export default Toolbar;