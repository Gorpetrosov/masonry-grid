import {describe, test, expect, vi} from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from "../../components/Header.tsx";

describe('Header Component', () => {

    afterEach(() => {
        vi.resetAllMocks()
    });

    test('real Header component memoization', () => {
        const { rerender } = render(<Header headerText="Test" />);

        const initialHtml = screen.getByRole('heading').outerHTML;

        rerender(<Header headerText="Test" />);

        expect(screen.getByRole('heading').outerHTML).toBe(initialHtml);
    });

    test('matches snapshot', () => {
        const { container } = render(<Header headerText="Test Header" />);
        expect(container).toMatchSnapshot();
    });
});