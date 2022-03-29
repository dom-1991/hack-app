declare namespace Home {
    export interface Comment {
        author_name: string;
        content: string;
        id: number;
        like: number;
        unlike: number;
    }
    export interface Word {
        id: number;
        word: string;
        read: string;
        note: string;
        image: string;
        book: string;
        meaning: string;
        comment: Comment[];
    }
}
