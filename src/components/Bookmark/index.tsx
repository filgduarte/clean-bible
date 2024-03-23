import { useContext, useState } from "react";
import { Bookmark as BookmarkIcon } from "lucide-react";
import { db } from "../../models/db";
import { UserPreferencesContext, HistoryContext } from "../../context";
import { bibleInfo, scrollToTop } from "../../utils";
import { addToHistory } from "../../models/history";

function Bookmark() {
    const userPreferences = useContext(UserPreferencesContext);
    const currentReading = useContext(HistoryContext)[0];
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [bookmark, setBookmark] = useState({
        book: -1,
        chapter: -1
    });
    let isBookmark = false;

    if (userPreferences.bookmark) {
        const bookmarkParse = JSON.parse(userPreferences.bookmark);
        if (bookmark.book < 0) {
            setBookmark({
                book: bookmarkParse.book,
                chapter: bookmarkParse.chapter
            });
        }

        if (bookmark.book == currentReading.book && bookmark.chapter == currentReading.chapter)
            isBookmark = true;
    }

    return(
        <div id='bookmark'>
            <div id='bookmark-tag' className={isBookmark ? 'active' : ''}>
                <button
                    id='bookmark-toggle'
                    onClick={handleBookmarkClick}
                >
                    <BookmarkIcon />
                </button>
            </div>
            {
                ( ! isBookmark ) &&
                <div id='bookmark-menu' className={isMenuOpen ? '' : 'hidden'}>
                    {
                        (userPreferences.bookmark && bibleInfo[bookmark.book]) &&
                            <button
                                id='goToBookmark'
                                onClick={goToBookmark}
                            >
                                Ir para {bibleInfo[bookmark.book]?.name} {bookmark.chapter + 1}
                            </button>
                    }
                    <button
                        id='setBookmark'
                        onClick={changeBookmark}
                    >
                        Mover marcador para cá
                    </button>
                </div>
            }
        </div>
    )

    function handleBookmarkClick() {
        if ( ! isBookmark ) {
            setIsMenuOpen( ! isMenuOpen );
        }
    }

    async function goToBookmark() {
        try {
            await addToHistory({
                book: bookmark.book,
                chapter: bookmark.chapter,
            });
            scrollToTop();
        }
        catch(err) {
            console.log(err);
        }

        setIsMenuOpen(false);
    }

    async function changeBookmark() {
        setBookmark({
            book: currentReading.book,
            chapter: currentReading.chapter
        });

        try {
            await db.preferences.put({
                option: 'bookmark',
                value: JSON.stringify(bookmark)
            })
        }
        catch(err) {
            console.log(err);
        }

        setIsMenuOpen(false);
    }
}

export default Bookmark;