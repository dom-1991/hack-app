import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface WordListState {
    likeComments: number[];
    unlikeComments: number[];
}

const initialState: WordListState = { likeComments: [], unlikeComments: [] };

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
    },
});

export const { resetWords, unlikeComment, likeComment } = wordsSlice.actions;

export const selectWords = (state: RootState) => state.words;

export default wordsSlice.reducer;
