import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import MainPage from '../pages/MainPage.tsx'
import photosReducer from '../store/photoSlice.ts'
import { vi } from 'vitest';

vi.mock('../components/masonry/Masonry.tsx', () => ({
    Masonry: () => <div data-testid="masonry-mock" />
}))

vi.mock('../components/navbar/Navbar.tsx', () => ({
    Navbar: () => <div data-testid="navbar-mock" />
}))

vi.mock('lodash.debounce', () => ({
    default: vi.fn((fn) => fn)
}))

vi.mock('lodash.debounce', () => ({
    default: vi.fn(() => {
        const mocked = vi.fn() as unknown as ((...args: never[]) => never) & { cancel: () => void };
        mocked.cancel = vi.fn();
        return mocked;
    })
}));

describe('MainPage', () => {
    const mockStore = configureStore({
        reducer: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            photos: photosReducer
        },
        preloadedState: {
            photos: {
                entities: [
                    { id: 1, src: { original: 'img1.jpg' }, alt: 'Image 1', photographer: 'Photog 1' },
                    { id: 2, src: { original: 'img2.jpg' }, alt: 'Image 2', photographer: 'Photog 2' }
                ],
                loading: false,
                total_results: 2,
                page: 1,
                error: null
            }
        }
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should match snapshot', () => {
        const { container } = render(
            <Provider store={mockStore}>
                <BrowserRouter>
                    <MainPage />
                </BrowserRouter>
            </Provider>
        )

        expect(container).toMatchSnapshot()
    })
})