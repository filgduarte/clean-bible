import { AccordionItemProps } from "./types";

function AccordionItem({id, title, active, onClick, children} : AccordionItemProps) {    
    return(
        <div id={id} className={`accordion-item ${active ? 'open' : ''}`}>
            <h3>
                <button
                    id={`${id}-header`}
                    aria-controls={`${id}-panel`}
                    aria-expanded={active}
                    onClick={onClick}
                >
                    {title}
                </button>
            </h3>
            <section
                id={`${id}-panel`}
                className={active ? '' : 'hidden'}
                aria-labelledby={`${id}-header`}
                aria-expanded={active}
            >
                {children}
            </section>
        </div>
    );
}

export default AccordionItem;