import {ReactNode} from 'react';
import config from "../../config";
import "./Layout.css"

interface LayoutProps {
    children: ReactNode;
    headerText?: string;
}

const currentYear = new Date().getFullYear();

export const Layout = ({ children, headerText = "Welcome Masonry Grid"}: LayoutProps) => {
    return (
        <div className="layout">
            <header className="layout-header">
                <h1>{headerText}</h1>
            </header>
            <div className="layout-main">{children}</div>
            <footer className="layout-footer">
                <p>© {currentYear} {config.APP_NAME}</p>
            </footer>
        </div>
    );
};

export default Layout;
