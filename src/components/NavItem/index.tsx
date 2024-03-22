import { NavItemProps } from "./types";

function NavItem({id, className, label, icon, action}: NavItemProps) {
    return (
        <button
            id={id}
            className={className}
            title={label}
            onClick={action}
        >
            {icon}
            {label}
        </button>
    );
}

export default NavItem;