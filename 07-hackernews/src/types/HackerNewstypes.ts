export interface HackerHit {
    author: string;
    created_at: string;
    created_at_i: number;
    objectID: string;
    points: number;
	story_text?: string;
    title: string;
    url: string;
}

export interface HackerResponse {
    hits: HackerHit[];
	hitsPerPage: number;
	nbHits: number;
	nbPages: number;
	page: number;
}
