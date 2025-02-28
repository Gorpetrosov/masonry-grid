import { render, screen } from '@testing-library/react';
import { describe, test, expect , vi} from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Layout from "../../components/layout/Layout.tsx";


vi.mock('../../components/Header.tsx', () => ({
    default: ({ headerText }: { headerText: string }) => (
        <header data-testid="header">{headerText}</header>
    )
}));

vi.mock('../../components/Footer.tsx', () => ({
    default: () => <footer data-testid="footer" />
}));

describe('Layout Component', () => {

    afterEach(() => {
        vi.resetAllMocks()
    });

    const TestChild = () => <div data-testid="test-child">Content</div>;

    test('renders header, main content, and footer', () => {
        render(
            <MemoryRouter>
                <Layout>
                    <TestChild />
                </Layout>
            </MemoryRouter>
        );

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('test-child')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('uses default header text when not provided', () => {
        render(
            <MemoryRouter>
                <Layout children={undefined} />
            </MemoryRouter>
        );

        const header = screen.getByTestId('header');
        expect(header).toHaveTextContent('Welcome Masonry Grid');
    });

    test('uses custom header text when provided', () => {
        const customText = 'Custom Header Text';
        render(
            <MemoryRouter>
                <Layout headerText={customText} children={undefined} />
            </MemoryRouter>
        );

        const header = screen.getByTestId('header');
        expect(header).toHaveTextContent(customText);
    });

    test('applies correct layout structure', () => {
        const { container } = render(
            <MemoryRouter>
                <Layout children={undefined} />
            </MemoryRouter>
        );

        const layoutDiv = container.querySelector('.layout');
        expect(layoutDiv).toBeInTheDocument();
        expect(layoutDiv?.querySelector('.layout-main')).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        const { container } = render(
            <MemoryRouter>
                <Layout headerText="Test Header">
                    <TestChild />
                </Layout>
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });
});