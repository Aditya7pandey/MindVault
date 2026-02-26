export interface Note {
    id: string;
    type: 'tweet' | 'video' | 'document' | 'link';
    title: string;
    content: string;
    tags: string[];
    date: string;
}
