import { ChangeEvent, FormEvent, useState, useCallback } from 'react';

interface SearchFormProps {
    onSearch: (query: string) => void;
    isDisabled: boolean;
    onInputUpdate: (query: string) => void;
}

export const SearchForm = ({ onSearch, isDisabled, onInputUpdate }: SearchFormProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onInputUpdate(value);
    }, [onInputUpdate]);

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const trimmedQuery = searchTerm.trim();
        if (trimmedQuery) {
            onSearch(trimmedQuery);
        }
    }, [onSearch, searchTerm]);

    return (
        <form
            className="navbar-search-form"
            onSubmit={handleSubmit}
            role="search"
            noValidate
        >
            <input
                className="search-input"
                type="search"
                placeholder="Search for images"
                value={searchTerm}
                onChange={handleInputChange}
                aria-label="Search"
                aria-describedby="search-button"
                disabled={isDisabled}
            />
            <button
                className="search-button"
                type="submit"
                id="search-button"
                aria-label="Perform search"
                disabled={isDisabled}
            >
                {isDisabled ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
};