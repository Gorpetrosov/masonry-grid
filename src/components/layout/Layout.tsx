import {ReactNode} from 'react';
import "./Layout.css"
import Footer from "../Footer.tsx";
import Header from "../Header.tsx";

interface LayoutProps {
    children: ReactNode;
    headerText?: string;
}


export const Layout = ({ children, headerText = "Welcome Masonry Grid"}: LayoutProps) => {
    return (
        <div className="layout">
            <Header headerText={headerText} />
            <div className="layout-main">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;
