import {Link} from "react-router-dom";
import {useState} from "react";
import {Photo} from "../interfaces/photo.ts";
import Skeleton from "./Skeleton.tsx"; //

interface MasonryItemProps {
    photo: Photo;
}

const MasonryItem = ({ photo }: MasonryItemProps) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="masonry-item">
            <Link to={`/photos/${photo.id}`}>
                {isLoading && (
                    <Skeleton />
                )}
                <img
                    loading="lazy"
                    src={photo.src.original}
                    alt={photo.alt}
                    onLoad={handleImageLoad}
                    style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.3s" }}
                />
            </Link>
        </div>
    );
};

export default MasonryItem;