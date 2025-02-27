import {Photo} from "../interfaces/photo.ts";
import {Link} from "react-router-dom";


interface  MasonryItemProps {
    photo: Photo
}

const MasonryItem = ({photo}: MasonryItemProps) => {
    return (
        <div id={`masonry_${photo.id}`} className="masonry-item">
            <Link to={`/photos/${photo.id}`}>
                <img loading="lazy" src={photo.src.large} alt={photo.alt}/>
            </Link>
        </div>
    )
}

export default MasonryItem;