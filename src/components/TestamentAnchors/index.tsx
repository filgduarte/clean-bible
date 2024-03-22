import { useContext, useState, useRef, useEffect } from "react";
import { PageContext, RefContext } from "../../context";
import { bibleInfo } from "../../utils";
import './style.css';

function TestamentAnchors() {
    const pageInfo = useContext(PageContext);
    const summaryRef = useContext(RefContext).summary;
    const observerRef = useRef<IntersectionObserver>();
    const [currentTestament, setCurrentTestament] = useState(bibleInfo[pageInfo.book] ? bibleInfo[pageInfo.book].testament : 0);

    useEffect( () => {
        const summary = summaryRef?.current;

        if (summary) {
            observerRef.current = new IntersectionObserver(handleIntersection, {
                root: summary,
                rootMargin: '50% 0% 0% 50%',
                threshold: 0.4
            });

            const newTestamentList = summary.querySelector('#testament-1');
            
            if (newTestamentList)
                observerRef.current.observe(newTestamentList);

            return () => {
                if (observerRef.current)
                    observerRef.current.disconnect();
            };
        }
        
    }, [summaryRef, observerRef]);

    return(
        <div id='testament-anchors' className='extra-nav'>
            <a
                id='goto-testament-0'
                className={(currentTestament === 0) ? 'active' : ''}
                href='#testament-0'
            >
                Antigo Testamento
            </a>
            <a
                id='goto-testament-1'
                className={(currentTestament === 1) ? 'active' : ''}
                href='#testament-1'
            >
                Novo Testamento
            </a>
        </div>
    )

    function handleIntersection(entries: IntersectionObserverEntry[]) {
        entries.forEach(entry => {
                setCurrentTestament(entry.isIntersecting ? 1 : 0);
        });
    }
}

export default TestamentAnchors;