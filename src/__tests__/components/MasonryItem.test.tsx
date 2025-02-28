import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import {Photo} from "../../interfaces/photo.ts";
import MasonryItem from "../../components/MasonryItem.tsx";

vi.mock('../../components/Skeleton.tsx', () => ({
    default: () => <div data-testid="skeleton_id" />,
}));

describe('MasonryItem Component', () => {

    afterEach(() => {
        vi.resetAllMocks()
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
    };

    test('renders link with correct photo ID in URL', () => {
        render(
            <MemoryRouter>
                <MasonryItem photo={mockPhoto} />
            </MemoryRouter>
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', `/photos/${mockPhoto.id}`);
    });

    test('shows skeleton loader while image is loading', () => {
        render(
            <MemoryRouter>
                <MasonryItem photo={mockPhoto} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('skeleton_id')).toBeInTheDocument();
    });

    test('displays image with correct attributes when loaded', () => {
        render(
            <MemoryRouter>
                <MasonryItem photo={mockPhoto} />
            </MemoryRouter>
        );

        const image = screen.getByRole('img', { name: mockPhoto.alt });
        fireEvent.load(image);

        expect(image).toHaveAttribute('src', mockPhoto.src.original);
        expect(image).toHaveAttribute('alt', mockPhoto.alt);
        expect(image).toHaveAttribute('loading', 'lazy');
    });

    test('hides skeleton and shows image after load event', () => {
        render(
            <MemoryRouter>
                <MasonryItem photo={mockPhoto} />
            </MemoryRouter>
        );

        const image = screen.getByRole('img', { name: mockPhoto.alt });
        fireEvent.load(image);

        expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument();
        expect(image).toHaveStyle({ opacity: '1' });
    });

    test('has proper fade-in transition styles', () => {
        render(
            <MemoryRouter>
                <MasonryItem photo={mockPhoto} />
            </MemoryRouter>
        );

        const image = screen.getByRole('img', { name: mockPhoto.alt });

        expect(image).toHaveStyle({
            opacity: '0',
            transition: 'opacity 0.3s'
        });

        fireEvent.load(image);
        expect(image).toHaveStyle({ opacity: '1' });
    });
});