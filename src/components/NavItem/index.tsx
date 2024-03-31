import { NavItemProps } from "./types";

function NavItem({id, className, label, icon, action}: NavItemProps) {
    return (
        <button
            id={id}
            className={className}
            title={label}
            onClick={action}
        >
            <div className='nav-icon'>
                {icon}
            </div>
            {label}
        </button>
    );
}

export default NavItem;