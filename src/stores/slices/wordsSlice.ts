import { CharsMyItem } from '@types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface WordListState {
    likeComments: number[];
    unlikeComments: number[];
    myWords: CharsMyItem[];
}

const initialState: WordListState = {
    likeComments: [],
    unlikeComments: [],
    myWords: [],
};

export const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        resetWords: () => {
            return initialState;
        },
        likeComment: (state, action) => {
            const id = action.payload;
            state.likeComments = [...state.likeComments, id];
        },
        unlikeComment: (state, action) => {
            const id = action.payload;
            state.unlikeComments = [...state.unlikeComments, id];
        },
        noteMyWord: (state, action: PayloadAction<CharsMyItem>) => {
            const item = action.payload;
            const myWords = state?.myWords || [];

            const exitedItem = myWords.findIndex(word => word.id === item.id);
            if (exitedItem >= 0) {
                state.myWords = [
                    ...myWords.slice(0, exitedItem),
                    { ...item },
                    ...myWords.slice(exitedItem),
                ];
            } else {
                state.myWords = [...myWords, { ...item }];
            }
        },
    },
});

export const { resetWords, unlikeComment, likeComment, noteMyWord } =
    wordsSlice.actions;

export const selectWords = (state: RootState) => state.words;

export default wordsSlice.reducer;
