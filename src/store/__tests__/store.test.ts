import { configureStore } from '@reduxjs/toolkit';
import photoReducer, {
    initialState as photoInitialState,
    getMorePhotos,
} from '../photoSlice';
import {AppDispatch, RootState} from "../store.ts";
import {PexelsApiResponse} from "../../interfaces/photo.ts";

vi.mock('../../api/photoApi', () => ({
    fetchPhotos: jest.fn(),
}));

const setupStore = () => configureStore({
    reducer: {
        photos: photoReducer,
    },
});

describe('Redux Store Configuration', () => {
    afterEach(() => {
        vi.resetAllMocks();
    })
    test('should initialize with correct reducers', () => {
        const store = setupStore();

        expect(store.getState()).toEqual({
            photos: photoInitialState
        });
    });

    test('should have proper type definitions', () => {
        const store = setupStore();

        const rootState: RootState = store.getState();
        expect(rootState.photos).toBeDefined();

        const dispatch: AppDispatch = store.dispatch;
        expect(typeof dispatch).toBe('function');
    });

    test('should handle photoReducer actions', async () => {
        const store = setupStore();

        expect(store.getState().photos).toEqual(photoInitialState);

        store.dispatch(getMorePhotos.pending('requestId', { query: 'nature', page: 1 }));
        expect(store.getState().photos).toEqual({
            ...photoInitialState,
            loading: true,
            total_results: 0,
        });

        const mockPayload: PexelsApiResponse = {
            page: 1,
            total_results: 1,
            next_page: "url",
            per_page: 1,
            photos: [{
                id: 123,
                alt: 'Brown Rocks During Golden Hour',
                photographer: 'John Doe',
                src: {
                    tiny: 'test.jpg',
                    original: 'test-original.jpg',
                    small: '',
                    medium: '',
                    large: '',
                    portrait: '',
                    landscape: '',
                    large2x: ''
                },
                photographer_url: 'https://example.com',
                width: 1920,
                height: 1080,
                url: '',
                liked: false,
                photographer_id: 1,
                avg_color: 'jjj'
            }]
        };
        store.dispatch(getMorePhotos.fulfilled(mockPayload, 'requestId', { query: 'nature', page: 1 }));
        expect(store.getState().photos).toEqual({
            ...photoInitialState,
            entities: mockPayload.photos,
            total_results: 1,
        });
    });
});