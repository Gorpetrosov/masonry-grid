import { Link } from 'react-router-dom';
import { useState } from 'react';
import config from '../../config';
import './Navbar.css';
import SearchForm from "../SearchForm.tsx";

interface NavbarProps {
    onSearch: (query: string) => void;
    isDisabled: boolean;
    onInputUpdate: (query: string) => void;
}

export const Navbar = ({ onSearch, isDisabled, onInputUpdate }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

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
                <SearchForm
                    onSearch={onSearch}
                    isDisabled={isDisabled}
                    onInputUpdate={onInputUpdate}
                />
            </div>
        </nav>
    );
};