import { Photo } from "../../interfaces/photo";
import { Link } from "react-router-dom";
import "./Masonry.css";
import {useCallback, useEffect, useRef} from "react";

export interface MasonryProps {
    photos: Photo[];
    loadMore: (isCurated: boolean) => void;
    hasMore: boolean;
    isLoading: boolean;
}

export const Masonry = ({ photos, loadMore, isLoading, hasMore }: MasonryProps) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);


    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && hasMore && !isLoading) {
            loadMore(false);
        }
    }, [hasMore, isLoading, loadMore]);

    useEffect(() => {
        if (!sentinelRef.current) return;

        observerRef.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: "250px",
            threshold: 0.1,
        });

        observerRef.current.observe(sentinelRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleObserver]);

    const getNewImages = useCallback(() => {
        loadMore(true);
    }, [loadMore])

    return (
        <div className="masonry-container">
            {!photos || photos.length < 1 ? (
                <button onClick={getNewImages} className="custom-link">
                    Nothing was found, request new images
                </button>
            ) : (
                <>
                <div className="masonry">
                    {photos.map((item, index) => (
                     <div key={item.id + index} className="masonry-item">
                         <Link to={`/photos/${item.id}`}>
                             <img loading="lazy" src={item.src.original} alt={item.alt}/>
                         </Link>
                     </div>
                    ))}
                </div>
                    <div ref={sentinelRef} className="sentinel" />
                    {isLoading && <div className="loading-indicator">Loading more images...</div>}
                </>
            )}
        </div>
    );
};