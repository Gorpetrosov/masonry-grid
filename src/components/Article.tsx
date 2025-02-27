import {Link} from "react-router-dom";
import {Photo} from "../interfaces/photo.ts";

interface ArticleProps {
    photo: Photo;
}

const Article = ( {photo}: ArticleProps) => {
    return (
        <article className="cart-content">
            <div className="cart-image">
                <img src={photo.src.original} alt={photo.alt} />
            </div>
            <div className="cart-detail">
                <h3 className="text-base font-semi">Photographer {photo.photographer}</h3>
                <Link className="custom-link" target="_blank" to={photo.photographer_url}>
                    Link to {photo.photographer}'s page
                </Link>
                <p>Original Width: {photo.width} px</p>
                <p>Original Height: {photo.height} px</p>
            </div>
        </article>
    )
}

export default Article;