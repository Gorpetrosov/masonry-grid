import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import {BrowserRouter, useParams} from 'react-router-dom'
import PhotoPage from '../pages/PhotoPage.tsx'
import photosReducer, { fetchPhoto } from '../store/photoSlice.ts' // Added fetchPhoto import
import type { Photo } from '../interfaces/photo.ts'
import { vi } from 'vitest'
import {ReactNode} from "react";

vi.mock('../components/layout/Layout.tsx', () => ({
    default: ({ children }: { children: ReactNode }) => (
        <div data-testid="layout-mock">{children}</div>
    )
}))

vi.mock('./404/NotFoundPage.tsx', () => ({
    default: ({ text }: { text: string }) => (
        <div data-testid="not-found-mock">{text}</div>
    )
}))

vi.mock('react-router-dom', async (importOriginal) => ({
    ...(await importOriginal<typeof import('react-router-dom')>()),
    useParams: vi.fn(() => ({ id: '123' })),
}))

vi.mock('../store/photoSlice', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../store/photoSlice.ts')>();
    return {
        ...actual,
        fetchPhoto: vi.fn((id: number) => ({
            type: 'MOCK_FETCH_PHOTO',
            payload: id,
        })),
    };
});

const mockPhoto: Photo = {
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
}

const createTestStore = (preloadedState: any) => {
    const store = configureStore({
        reducer: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            photos: photosReducer
        },
        preloadedState
    })
    const dispatchSpy = vi.spyOn(store, 'dispatch')
    return { store, dispatchSpy }
}

const renderComponent = (store: any) => {
    return render(
        <Provider store={store}>
            <BrowserRouter>
                <PhotoPage />
            </BrowserRouter>
        </Provider>
    )
}

describe('PhotoPage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(useParams).mockReturnValue({ id: '123' })
    })

    it('should match snapshot when photo exists', () => {
        const { store } = createTestStore({
            photos: {
                entities: [mockPhoto],
                entity: null,
                loading: false,
                error: null
            }
        })

        const { container } = renderComponent(store)
        expect(container).toMatchSnapshot()
    })

    it('should match snapshot when photo not found', () => {
        const { store } = createTestStore({
            photos: {
                entities: [],
                entity: null,
                loading: false,
                error: null
            }
        })

        const { container } = renderComponent(store)
        expect(container).toMatchSnapshot()
    })

    it('should dispatch fetchPhoto when photo not in cache', () => {
        const { store, dispatchSpy } = createTestStore({
            photos: {
                entities: [],
                entity: null,
                loading: false,
                error: null
            }
        })

        renderComponent(store)
        expect(dispatchSpy).toHaveBeenCalledWith(fetchPhoto(123))
    })
})