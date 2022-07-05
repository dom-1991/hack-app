import { StatusEnum, WordTypeEnum } from '@enum';

export interface CharsSearch {
    search?: string;
    book?: string;
    search_kanji?: string;
    page?: number;
    type?: WordTypeEnum;
}

export interface CharsComment {
    id: number;
    author_name: string;
    content: string;
    like?: number;
    unlike?: number;
}
export interface CharsItem {
    id: number;
    word: string;
    reading: string;
    read: string;
    note: string;
    image: string;
    book: string;
    meaning: string;
    type: number;
    kun: string;
    on: string;
    example: string;
    status: number;
    comment: CharsComment[];
}

export interface CharsMyItem extends CharsItem {
    myNote?: string;
    isLearn?: boolean;
}

export interface CharsCommentInteract {
    id: number;
    status: StatusEnum;
    device_fcm: string;
}

export interface BookMenu {
    title: string;
    book?: string;
    child?: BookMenu[];
}

export interface NewChars {
    word: string;
    reading: string;
    note: string;
    meaning: string;
}
