export interface NavItemProps {
    id: string;
    className?: string;
    label: string;
    icon: JSX.Element;
    action: () => void;
}