import { useState } from "react";
import SubMenu from "../SubMenu";
import { MenuItemProps } from "./types";

function MenuItem(props: MenuItemProps)  {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className={isOpen ? 'menu-item active' : 'menu-item'}>
            {props.subItems ? (
                <>
                    <button
                        id={props.id}
                        title={props.title}
                        onClick={() => setIsOpen( (prev) => ! prev)}
                    >
                        {props.icon} {props.label}
                    </button>
                    <SubMenu subItems={props.subItems} />
                </>
            ) : (
                <button
                    id={props.id}
                    title={props.title}
                    onClick={props.action}
                >
                    {props.icon} {props.label}
                </button>
            )
            }
        </li>
    );
}

export default MenuItem;