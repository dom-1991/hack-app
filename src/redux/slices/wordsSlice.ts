import { getWords } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface WordListState {
    nextPage: number;
    loading: boolean;
    words: Home.Word[];
    wordsPerPage: Home.Word[];
    wordInit: Home.Word[];
}

const initialState: WordListState = {
    wordInit: [],
    nextPage: 1,
    loading: false,
    words: [],
    wordsPerPage: [],
};

export const fetchWordsAsync = createAsyncThunk(
    'words/fetchWords',
    async () => {
        const response = await getWords();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    },
);

export const wordsSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {
        getWordsPage1: state => {
            state.wordsPerPage = state.words.slice(0, 10);
        },

        getWordsPagination: (state, action) => {
            let pagination = 10;
            state.wordsPerPage = [
                ...state.wordsPerPage,
                ...state.words.slice(
                    pagination * action.payload,
                    pagination * action.payload + pagination,
                ),
            ];
        },

        searchWords: (state, action) => {
            let searchData = action.payload.trim().length
                ? state.words.filter((word: Home.Word) =>
                      word.meaning.includes(action.payload),
                  )
                : state.wordInit;
            state.words = searchData;
        },
    },

    extraReducers: builder => {
        builder.addCase(fetchWordsAsync.fulfilled, (state, action) => {
            state.words = action.payload;
            state.wordInit = action.payload;
            state.wordsPerPage = action.payload.slice(0, 10);
        });
    },
});

export const { getWordsPagination, searchWords, getWordsPage1 } =
    wordsSlice.actions;

export const selectWords = (state: RootState) => state.words.wordsPerPage;

export default wordsSlice.reducer;
