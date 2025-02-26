import { Photo } from "../../interfaces/photo";
import { Link } from "react-router-dom";
import "./Masonry.css";
import config from "../../config";
import {useCallback, useEffect, useRef} from "react";

export interface MasonryProps {
    photos: Photo[];
    loadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
}

export const Masonry = ({ photos, loadMore, isLoading, hasMore }: MasonryProps) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);


    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [target] = entries;
        if (target.isIntersecting && hasMore && !isLoading) {
            loadMore();
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
        if (hasMore) {
            loadMore();
        }
    }, [hasMore, loadMore])

    return (
        <div className="masonry-container">
            {!photos || photos.length < 1 ? (
                <button onClick={getNewImages} className="custom-link">
                    Nothing was found, request new images
                </button>
            ) : (
                <>
                <div className="masonry-grid">
                    {photos.map((item, index) => (
                        <Link
                            className="masonry-link"
                            key={`${item.id}-${index}`}
                            to={`/photos/${item.id}`}
                        >
                            <div
                                className="grid-item"
                                style={{ gridRowEnd: `span ${config.PAGINATION}` }}
                            >
                                <img
                                    src={item.src.original}
                                    alt={item.alt}
                                    className="grid-image"
                                    loading="lazy"
                                />
                                <div className="grid-content">
                                    {item.photographer && (
                                        <p className="grid-description">
                                            Photo by {item.photographer}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                    <div ref={sentinelRef} className="sentinel" />
                    {isLoading && <div className="loading-indicator">Loading more images...</div>}
                </>
            )}
        </div>
    );
};