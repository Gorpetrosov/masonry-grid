import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Article from "../../components/Article.tsx";
import {Photo} from "../../interfaces/photo.ts";

describe('Article Component', () => {
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

    test('renders all photo information correctly', () => {
        render(
            <MemoryRouter>
                <Article photo={mockPhoto} />
            </MemoryRouter>
        );

        const image = screen.getByRole('img', { name: mockPhoto.alt });
        expect(image).toHaveAttribute('src', mockPhoto.src.original);

        const heading = screen.getByRole('heading', { level: 3 });
        expect(heading).toHaveTextContent(`Photographer ${mockPhoto.photographer}`);

        expect(screen.getByText(`Original Width: ${mockPhoto.width} px`)).toBeInTheDocument();
        expect(screen.getByText(`Original Height: ${mockPhoto.height} px`)).toBeInTheDocument();
    });

    test('contains correct photographer link', () => {
        render(
            <MemoryRouter>
                <Article photo={mockPhoto} />
            </MemoryRouter>
        );

        const link = screen.getByRole('link', {
            name: `Link to ${mockPhoto.photographer}'s page`
        });

        expect(link).toHaveAttribute('href', mockPhoto.photographer_url);
        expect(link).toHaveAttribute('target', '_blank');
    });

    test('matches snapshot', () => {
        const { container } = render(
            <MemoryRouter>
                <Article photo={mockPhoto} />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('renders proper article structure', () => {
        const { container } = render(
            <MemoryRouter>
                <Article photo={mockPhoto} />
            </MemoryRouter>
        );

        const article = container.querySelector('article.cart-content');
        expect(article).toBeInTheDocument();
        expect(article?.querySelector('.cart-image')).toBeInTheDocument();
        expect(article?.querySelector('.cart-detail')).toBeInTheDocument();
    });
});