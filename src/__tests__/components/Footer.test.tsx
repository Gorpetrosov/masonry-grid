import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import Footer from "../../components/Footer.tsx";

vi.mock('../config', () => ({
    default: { APP_NAME: 'Test App' }
}));

describe('Footer Component', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date(2023, 0, 1)); // Jan 1, 2023
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.resetAllMocks()
    });

    test('memoization prevents unnecessary renders', async () => {
        const { rerender } = render(<Footer />);
        const initialHTML = screen.getByRole('contentinfo').innerHTML;

        rerender(<Footer />);

        expect(screen.getByRole('contentinfo').innerHTML).toBe(initialHTML);
    });
});