import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState, useCallback } from 'react';
import config from '../../config';
import './Navbar.css';

interface NavbarProps {
    onSearch: (query: string) => void;
    isDisabled: boolean;
    onInputUpdate: (query: string) => void;
}

export const Navbar = ({ onSearch, isDisabled, onInputUpdate }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        onInputUpdate(e.target.value);
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
        <nav className="navbar" role="navigation">
            <Link className="navbar-brand" to="/">
                {config.APP_NAME}
            </Link>

            <button
                className={`menu-button ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={isOpen}
            >
                ☰
            </button>

            <div className={`navbar-collapse ${isOpen ? 'active' : ''}`}>
                <form
                    className="navbar-search-form"
                    onSubmit={handleSubmit}
                    role="search"
                    noValidate // Prevent browser validation
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
            </div>
        </nav>
    );
};