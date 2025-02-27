import config from "../config";

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className="layout-footer">
            <p>© {currentYear} {config.APP_NAME}</p>
        </footer>
    )
}

export default Footer;