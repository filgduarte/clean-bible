import { useContext, useEffect } from "react";
import { Sun, Moon, EllipsisVertical, AArrowUp, AArrowDown } from "lucide-react";
import { db } from "../../models/db";
import { UserPreferencesContext } from "../../context";
import { appDefs } from "../../utils";
import MenuItem from "../MenuItem";
import { MenuItemProps } from "../MenuItem/types";
import './style.css';

function Toolbar() {
    const userPreferences = useContext(UserPreferencesContext);
    const toolbarMenu = [
        {
            id: 'options',
            title: 'Opções',
            icon: <EllipsisVertical />,
            subItems: [
                {
                    id: 'change-theme',
                    title: 'Alternar modo claro/escuro',
                    label: 'Mudar para modo ' + (userPreferences.theme == 'light' ? 'escuro' : 'claro'),
                    icon: (userPreferences.theme == 'light') ? <Sun /> : <Moon />,
                    action: () => { toggleTheme() }
                },
                {
                    id: 'increase-font-size',
                    title: 'Aumentar tamanho da fonte',
                    label: 'Aumentar tamanho da fonte',
                    icon: <AArrowUp />,
                    action: () => { changeFontSize('increase') }
                },
                {
                    id: 'decrease-font-size',
                    title: 'Diminuir tamanho da fonte',
                    label: 'Diminuir tamanho da fonte',
                    icon: <AArrowDown />,
                    action: () => { changeFontSize('decrease') }
                }
            ]
        }
    ] as MenuItemProps[];

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

    return(
        <menu id='toolbar'>
            {
                toolbarMenu.map((menuItem, index) => (
                    <MenuItem {...menuItem} key={index} />
                ))
            }
        </menu>
    )

    async function toggleTheme() {
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
}

export default Toolbar;