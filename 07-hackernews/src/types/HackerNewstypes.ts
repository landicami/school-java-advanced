interface HighlightResult {
    matchLevel: string;
    matchedWords: string[];
    value: string;
}

interface HackerHit {
    _highlightResult: {
        author: HighlightResult;
        comment_text: HighlightResult;
        title: HighlightResult;
        url: HighlightResult;
    };
    _tags: string[];
    author: string;
    comment_text: string;
    created_at: string;
    created_at_i: number;
    objectID: string;
    points: number;
    story_id: number;
    title: string;
    url: string;
    updated_at: string;
}

export interface HackerResponse {
    exhaustive: {
        nbHits: boolean;
        typo: boolean;
    };
    exhaustiveNbHits: boolean;
    exhaustiveTypo: boolean;
    hits: HackerHit[];
}
