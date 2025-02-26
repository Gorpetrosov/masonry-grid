// src/store/photoSlice.ts

import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PexelsApiResponse, Photo} from "../interfaces/photo.ts";
import {getPexelData, SearchParams} from "../utils/api.ts";
import {Photo_SubDirectory} from "../constants/photo.ts";
import config from "../config";

export interface PhotoState {
    entities: Photo[];
    loading: boolean;
    error: string | null;
    entity: Photo | null;
    searchQuery: string,
    total_results: number,
    page: number,
}

const initialState: PhotoState = {
    entities: [],
    loading: false,
    error: null,
    entity: null,
    searchQuery: "",
    total_results: 0,
    page: 1,
};

export const fetchPhoto = createAsyncThunk(
    'photos/fetchPhoto',
    async (id: number, { rejectWithValue }) => {
        try {
            const subDirUrl = `${Photo_SubDirectory.PHOTOS}/${id}`;
            return  getPexelData<Photo>(subDirUrl);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);


export const searchPhotos = createAsyncThunk(
    'photos/searchPhotos',
    async (params: SearchParams, { rejectWithValue }) => {
        try {
            const searchParams = { per_page: config.PAGINATION, ...params};
            return  getPexelData<PexelsApiResponse>(Photo_SubDirectory.SEARCH, searchParams);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const getMorePhotos = createAsyncThunk(
    'photos/getMorePhotos',
    async (params: SearchParams, { rejectWithValue }) => {
        try {
            const  { query, per_page, page } = params;
            const searchParams = { per_page: per_page || config.PAGINATION, query, page};
            if(params.query){
                return  getPexelData<PexelsApiResponse>(Photo_SubDirectory.SEARCH, searchParams);
            }
            return  getPexelData<PexelsApiResponse>(Photo_SubDirectory.CURATED, searchParams);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhoto.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPhoto.fulfilled, (state, action: PayloadAction<Photo>) => {
                state.loading = false;
                state.entity = action.payload;
            })
            .addCase(fetchPhoto.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
          .addCase(searchPhotos.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(searchPhotos.fulfilled, (state, action: PayloadAction<PexelsApiResponse>) => {
                state.loading = false;
                state.entities = action.payload.photos;
                if(state.total_results !== action.payload.total_results) {
                    state.total_results = action.payload.total_results;
                }
                state.page = action.payload.page;
            })
            .addCase(searchPhotos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
           .addCase(getMorePhotos.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(getMorePhotos.fulfilled, (state, action: PayloadAction<PexelsApiResponse>) => {
                state.loading = false;
                state.entities = action.payload.photos.concat(state.entities);
                if(state.total_results !== action.payload.total_results) {
                    state.total_results = action.payload.total_results;
                }
                state.page = action.payload.page;
            })
            .addCase(getMorePhotos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});
export default photoSlice.reducer;
