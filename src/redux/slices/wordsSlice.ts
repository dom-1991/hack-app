import { getWords } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface WordListState {
    likeComments: number[];
    dislikeComments: number[];
}

const initialState: WordListState = { likeComments: [], dislikeComments: [] };

export const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        resetWords: () => {
            return initialState;
        },
        likeComment: (state, action) => {
            const id = action.payload;
        },
    },
});

export const { resetWords } = wordsSlice.actions;

export const selectWords = (state: RootState) => state.words;

export default wordsSlice.reducer;
