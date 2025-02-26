import "./NotFoundPage.css"
import { Link } from 'react-router-dom';
import {memo, useEffect} from "react";

interface NotFoundPageProps {
    text?: string;
}

const NotFoundPage = memo(({text = "Uh oh! Looks like you got lost."}: NotFoundPageProps) => {
    useEffect(() => {
        document.body.classList.add('error-page');
        return () => document.body.classList.remove('error-page');
    }, []);
    return (
        <div className="container-404">
            <h1>404 Not Found</h1>
            <p className="zoom-area">{text}</p>
            <p className="zoom-area"> Go back to the homepage if you dare!</p>

            <section className="error-container">
                <span>4</span>
                <span><span className="screen-reader-text">0</span></span>
                <span>4</span>
            </section>
            <div className="link-container">
                <Link to="/"
                   className="custom-link">GO TO MAIN PAGE</Link>
            </div>
        </div>
    )
})

export default NotFoundPage