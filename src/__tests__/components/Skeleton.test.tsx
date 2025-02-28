import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Skeleton from "../../components/Skeleton.tsx";

describe('Skeleton Component', () => {
    test('matches snapshot', () => {
        const { container } = render(<Skeleton />);
        expect(container).toMatchSnapshot();
    });
});