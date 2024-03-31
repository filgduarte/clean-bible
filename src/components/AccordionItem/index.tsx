import { AccordionItemProps } from "./types";
import './style.css';

function AccordionItem({id, title, active, onClick, children} : AccordionItemProps) {    
    return(
        <div id={id} className={`accordion-item ${active ? 'open' : ''}`}>
            <h2>
                <button
                    id={`${id}-header`}
                    aria-controls={`${id}-panel`}
                    aria-expanded={active}
                    onClick={onClick}
                >
                    {title}
                </button>
            </h2>
            <section
                id={`${id}-panel`}
                aria-labelledby={`${id}-header`}
                aria-expanded={active}
            >
                {children}
            </section>
        </div>
    );
}

export default AccordionItem;