import {memo} from "react";

const Header = ( {headerText} : {headerText: string }) => {
    return (
        <header className="layout-header">
            <h1>{headerText}</h1>
        </header>
    )
}

export default memo(Header);