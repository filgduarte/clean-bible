import { useContext } from "react";
import { History, List, BookOpenText, Ellipsis } from "lucide-react";
import { PageContext } from "../../context";
import { NavbarProps } from "./types";
import CurrentChapterStats from "../CurrentChapterStats";
import TestamentAnchors from "../TestamentAnchors";
import NavItem from "../NavItem";
import './style.css';

function Navbar({changePage}: NavbarProps) {
    const pageInfo = useContext(PageContext);
    const navItems = [
        {
            id: 'history',
            icon: <History />,
            label: 'Histórico',
        },
        {
            id: 'summary',
            icon: <List />,
            label: 'Índice',
        },
        {
            id: 'read',
            icon: <BookOpenText />,
            label: 'Leitura',
        },
        {
            id: 'options',
            icon: <Ellipsis />,
            label: 'Opções',
        },
    ]

    return(
        <nav id='navbar' className={pageInfo.page}>
            {
                (pageInfo.page == 'read') ?
                    <CurrentChapterStats />
                : (pageInfo.page == 'summary') &&
                    <TestamentAnchors />
            }

            <div id='page-nav'>
                {
                    navItems.map((item, index) => 
                        <NavItem
                            id={`goto-${item.id}`}
                            className={(item.id == pageInfo.page) ? 'active' : ''}
                            label={item.label}
                            icon={item.icon}
                            action = {() => changePage(item.id)}
                            key={index}
                        />
                    )
                }
            </div>
        </nav>
    );
}

export default Navbar;