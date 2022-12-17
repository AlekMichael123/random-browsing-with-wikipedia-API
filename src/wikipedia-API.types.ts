// Wikipedia API Gateway Link: https://en.wikipedia.org/w/api.php?action=parse&page={PAGE_TITLE}&format=json

export default interface WikipediaAPIParse {
    parse?: {
        title: string;
        pageid: string;
        revid: number;
        text: {
            "*": string;
        };
        langlinks: LangLink[];
        categories: Category[];
        links: Link[];
        templates: Link[];
        images: string[];
        externallinks: string[];
        sections: Section[];
        showtoc: string;
        parsewarnings: string[];
        displaytitle: string;
        iwlinks: IWLinks[];
        properties: Property[];
    };
    error?: {
        "*": string;
        code: string;
        info: string;
    };
    servedBy?: string;
}

interface LangLink {
    lang: string;
    url: string;
    langname: string;
    autonym: string;
    "*": string;
}

interface Category {
    sortkey: string;
    hidden: string;
    "*": string;
}

interface Link {
    ns: number;
    exists: string;
    "*": string;
}

interface Section {
    toclevel: number;
    level: string;
    line: string;
    number: string;
    index: string;
    fromtitle: string;
    byteoffset: number;
    anchor: string;
    linkAnchor: string;
}

interface IWLinks {
    prefix: string;
    url: string;
    "*": string;
}

interface Property {
    name: string;
    "*": string;
}
