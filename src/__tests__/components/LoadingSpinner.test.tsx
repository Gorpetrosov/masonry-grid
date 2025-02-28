import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import {LoadingSpinner} from "../../components/loading/LoadingSpinner.tsx";

vi.mock('react-icons/im', () => ({
    ImSpinner8: (props: any) => <div data-testid="spinner-icon" {...props} />,
}));

describe('LoadingSpinner Component', () => {
    test('renders spinner when isLoading is true', () => {
        render(<LoadingSpinner isLoading={true} />);

        const container = screen.getByTestId('spinner-icon').parentElement;
        expect(container).toHaveClass('spinner-container', 'spinner-flex');
    });

    test('does not render spinner when isLoading is false', () => {
        render(<LoadingSpinner isLoading={false} />);

        const container = screen.getByTestId('spinner-icon').parentElement;
        expect(container).toHaveClass('spinner-container');
        expect(container).not.toHaveClass('spinner-flex');
    });

    test('applies custom size and color', () => {
        const testSize = 50;
        const testColor = '#4287f5';

        render(<LoadingSpinner isLoading={true} size={testSize} color={testColor} />);

        const icon = screen.getByTestId('spinner-icon');
        expect(icon).toHaveStyle({
            fontSize: `${testSize}px`,
            color: testColor
        });
    });

    test('uses default props when not provided', () => {
        render(<LoadingSpinner isLoading={true} />);

        const icon = screen.getByTestId('spinner-icon');
        expect(icon).toHaveStyle({
            fontSize: '40px',
            color: '#ed2b2b'
        });
    });

    test('matches snapshot when visible', () => {
        const { container } = render(<LoadingSpinner isLoading={true} />);
        expect(container).toMatchSnapshot();
    });

    test('matches snapshot when hidden', () => {
        const { container } = render(<LoadingSpinner isLoading={false} />);
        expect(container).toMatchSnapshot();
    });
});