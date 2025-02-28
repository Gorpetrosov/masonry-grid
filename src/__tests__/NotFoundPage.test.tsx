import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NotFoundPage from "../pages/404/NotFoundPage.tsx"
import {vi} from "vitest";

describe('NotFoundPage', () => {
    afterEach(() => {
        document.body.className = ''
        vi.resetAllMocks()
    })

    it('should match snapshot', () => {
        const { container } = render(
            <MemoryRouter>
                <NotFoundPage />
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot()
    })
})