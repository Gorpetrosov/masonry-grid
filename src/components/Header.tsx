
const Header = ( {headerText} : {headerText: string }) => {
    return (
        <header className="layout-header">
            <h1>{headerText}</h1>
        </header>
    )
}

export default Header;