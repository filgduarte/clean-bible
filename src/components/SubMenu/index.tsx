import MenuItem from '../MenuItem';
import { SubmenuProps } from './types';

function SubMenu({subItems}: SubmenuProps) {
    return (
        <menu className='submenu'>
            {subItems.map((subItem, index) => (
                <MenuItem
                    id={subItem.id}
                    title={subItem.title}
                    label={subItem.label}
                    icon={subItem.icon}
                    action={subItem.action}
                    key={index}
                />
            ))}
        </menu>
    );
}

export default SubMenu;