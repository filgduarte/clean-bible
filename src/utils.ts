import { AppDefs, BibleInfo } from "./types";

export const appDefs: AppDefs = {
    pages: [ 'read', 'summary', 'history', 'options' ],
    languages: [ 'pt' ],
    bibleVersions: [ 'blivre', 'nvi' ],
    fontSizeLimit: { min: 1, max: 2 },
    historySize: 50,
};

export const bibleInfo: BibleInfo = [
    { testament: 0, abbrev: "gn", name: "Gênesis", chapters: 50 },
    { testament: 0, abbrev: "êx", name: "Êxodo", chapters: 40 },
    { testament: 0, abbrev: "lv", name: "Levítico", chapters: 27 },
    { testament: 0, abbrev: "nm", name: "Números", chapters: 36 },
    { testament: 0, abbrev: "dt", name: "Deuteronômio", chapters: 34 },
    { testament: 0, abbrev: "js", name: "Josué", chapters: 24 },
    { testament: 0, abbrev: "jz", name: "Juízes", chapters: 21 },
    { testament: 0, abbrev: "rt", name: "Rute", chapters: 4 },
    { testament: 0, abbrev: "1 sm", name: "1 Samuel", chapters: 31 },
    { testament: 0, abbrev: "2 sm", name: "2 Samuel", chapters: 24 },
    { testament: 0, abbrev: "1 Rs", name: "1 Reis", chapters: 22 },
    { testament: 0, abbrev: "2 rs", name: "2 Reis", chapters: 25 },
    { testament: 0, abbrev: "1 cr", name: "1 Crônicas", chapters: 29 },
    { testament: 0, abbrev: "2 cr", name: "2 Crônicas", chapters: 36 },
    { testament: 0, abbrev: "ed", name: "Esdras", chapters: 10 },
    { testament: 0, abbrev: "ne", name: "Neemias", chapters: 13 },
    { testament: 0, abbrev: "et", name: "Ester", chapters: 10 },
    { testament: 0, abbrev: "jó", name: "Jó", chapters: 42 },
    { testament: 0, abbrev: "sl", name: "Salmos", chapters: 150 },
    { testament: 0, abbrev: "pv", name: "Provérbios", chapters: 31 },
    { testament: 0, abbrev: "ec", name: "Eclesiastes", chapters: 12 },
    { testament: 0, abbrev: "ct", name: "Cantares", chapters: 8 },
    { testament: 0, abbrev: "is", name: "Isaías", chapters: 66 },
    { testament: 0, abbrev: "jr", name: "Jeremias", chapters: 52 },
    { testament: 0, abbrev: "lm", name: "Lamentações", chapters: 5 },
    { testament: 0, abbrev: "ez", name: "Ezequiel", chapters: 48 },
    { testament: 0, abbrev: "dn", name: "Daniel", chapters: 12 },
    { testament: 0, abbrev: "os", name: "Oséias", chapters: 14 },
    { testament: 0, abbrev: "jl", name: "Joel", chapters: 3 },
    { testament: 0, abbrev: "am", name: "Amós", chapters: 9 },
    { testament: 0, abbrev: "ob", name: "Obadias", chapters: 1 },
    { testament: 0, abbrev: "jn", name: "Jonas", chapters: 4 },
    { testament: 0, abbrev: "mq", name: "Miqueias", chapters: 7 },
    { testament: 0, abbrev: "na", name: "Naum", chapters: 3 },
    { testament: 0, abbrev: "hc", name: "Habacuque", chapters: 3 },
    { testament: 0, abbrev: "sf", name: "Sofonias", chapters: 3 },
    { testament: 0, abbrev: "ag", name: "Ageu", chapters: 2 },
    { testament: 0, abbrev: "zc", name: "Zacarias", chapters: 14 },
    { testament: 0, abbrev: "ml", name: "Malaquias", chapters: 4 },
    { testament: 1, abbrev: "mt", name: "Mateus", chapters: 28 },
    { testament: 1, abbrev: "mc", name: "Marcos", chapters: 16 },
    { testament: 1, abbrev: "lc", name: "Lucas", chapters: 24 },
    { testament: 1, abbrev: "jo", name: "João", chapters: 21 },
    { testament: 1, abbrev: "at", name: "Atos", chapters: 28 },
    { testament: 1, abbrev: "rm", name: "Romanos", chapters: 16 },
    { testament: 1, abbrev: "1 co", name: "1 Coríntios", chapters: 16 },
    { testament: 1, abbrev: "2 co", name: "2 Coríntios", chapters: 13 },
    { testament: 1, abbrev: "gl", name: "Gálatas", chapters: 6 },
    { testament: 1, abbrev: "ef", name: "Efésios", chapters: 6 },
    { testament: 1, abbrev: "fp", name: "Filipenses", chapters: 4 },
    { testament: 1, abbrev: "Cl", name: "Colossenses", chapters: 4 },
    { testament: 1, abbrev: "1 ts", name: "1 Tessalonicenses", chapters: 5 },
    { testament: 1, abbrev: "2 ts", name: "2 Tessalonicenses", chapters: 3 },
    { testament: 1, abbrev: "1 tm", name: "1 Timóteo", chapters: 6 },
    { testament: 1, abbrev: "2 tm", name: "2 Timóteo", chapters: 4 },
    { testament: 1, abbrev: "tt", name: "Tito", chapters: 3 },
    { testament: 1, abbrev: "fm", name: "Filemom", chapters: 1 },
    { testament: 1, abbrev: "hb", name: "Hebreus", chapters: 13 },
    { testament: 1, abbrev: "tg", name: "Tiago", chapters: 5 },
    { testament: 1, abbrev: "1 pe", name: "1 Pedro", chapters: 5 },
    { testament: 1, abbrev: "2 pe", name: "2 Pedro", chapters: 3 },
    { testament: 1, abbrev: "1 jo", name: "1 João", chapters: 5 },
    { testament: 1, abbrev: "2 jo", name: "2 João", chapters: 1 },
    { testament: 1, abbrev: "3 jo", name: "3 João", chapters: 1 },
    { testament: 1, abbrev: "jd", name: "Judas", chapters: 1 },
    { testament: 1, abbrev: "ap", name: "Apocalipse", chapters: 22}
];

export function scrollToTop() {
    window.scrollTo({ top: 0 });
}

export function scrollTo(targetId: string, parentId?: string, smooth?: ScrollBehavior) {
    const parent = parentId ? document.getElementById(parentId) : window;    
    
    if ( ! parent)
        throw 'Elemento container não encontrado no DOM: ' + parentId;

    if (targetId == 'top') {
        parent.scrollTo({
            top: 0,
            behavior: smooth ?? 'auto'
        });
        return;
    }

    const target = document.getElementById(targetId);

    if ( ! target )
        throw 'Elemento alvo não encontrado no DOM: ' + targetId;
    target.scrollIntoView({
        behavior: smooth ?? 'auto'
    });
}