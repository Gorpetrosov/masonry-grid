import { configureStore } from '@reduxjs/toolkit'
import photoReducer, { fetchPhoto, searchPhotos, getMorePhotos } from '../photoSlice'
import { vi, type Mock } from 'vitest'
import type { PexelsApiResponse, Photo } from "../../interfaces/photo.ts"
import { getPexelData } from "../../utils/api.ts"

// Mock setup with proper typing
vi.mock('../../utils/api.ts', () => ({
    getPexelData: vi.fn() as Mock<typeof getPexelData>,
}))

const mockPhoto: Photo = {
    id: 1,
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
}

const mockApiResponse: PexelsApiResponse = {
    photos: [mockPhoto],
    page: 1,
    per_page: 10,
    total_results: 100,
    next_page: 'next',
}

describe('photoSlice', () => {
    let store: ReturnType<typeof configureStore>

    beforeEach(() => {
        store = configureStore({ reducer: { photos: photoReducer } })
        vi.clearAllMocks()
    })

    describe('initial state', () => {
        it('should initialize with correct defaults', () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const state = store.getState().photos
            expect(state).toEqual({
                entities: [],
                loading: false,
                error: null,
                entity: null,
                searchQuery: "",
                total_results: 0,
                page: 1,
            })
        })
    })

    describe('fetchPhoto', () => {
        it('handles pending state', () => {
            store.dispatch(fetchPhoto.pending('', 1))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const state = store.getState().photos
            expect(state.loading).toBe(true)
            expect(state.error).toBeNull()
        })

        it('handles fulfilled state', async () => {
            (getPexelData as Mock).mockResolvedValue(mockPhoto)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            await store.dispatch(fetchPhoto(1))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const state = store.getState().photos
            expect(state.loading).toBe(false)
            expect(state.entity).toEqual(mockPhoto)
        })
    })

    describe('searchPhotos', () => {
        it('handles pending state', () => {
            store.dispatch(searchPhotos.pending('', { query: 'test', page: 1 }))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const state = store.getState().photos
            expect(state.loading).toBe(true)
            expect(state.error).toBeNull()
        })

        it('handles fulfilled state', async () => {
            (getPexelData as Mock).mockResolvedValue(mockApiResponse)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            await store.dispatch(searchPhotos({ query: 'test', page: 1 }))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const state = store.getState().photos
            expect(state.entities).toEqual(mockApiResponse.photos)
            expect(state.total_results).toBe(mockApiResponse.total_results)
            expect(state.loading).toBe(false)
        })

    })

    describe('getMorePhotos', () => {
        it('handles pending state', () => {
            store.dispatch(getMorePhotos.pending('', { page: 2 }))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const state = store.getState().photos
            expect(state.loading).toBe(true)
            expect(state.error).toBeNull()
        })
    })
})