import { useState } from "react";
import { Contrast, EllipsisVertical } from "lucide-react";
import './style.css';

function Toolbar() {
    const [optionsActive, setOptionsActive] = useState(false);

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
                            <Contrast /> Alternar modo claro/escuro
                        </button>
                    </li>
                </menu>
            </li>
        </menu>
    )

    function toggleOptionsActive() {
        setOptionsActive( ! optionsActive );
    }
}

export default Toolbar;