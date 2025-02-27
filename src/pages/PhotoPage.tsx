import Layout from "../components/layout/Layout.tsx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store.ts";
import { fetchPhoto } from "../store/photoSlice.ts";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import "./PhotoPage.css";
import NotFoundPage from "./404/NotFoundPage.tsx";
import { Photo } from "../interfaces/photo.ts";

const PhotoPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { entities, entity } = useSelector((state: RootState) => state.photos);
    const { id } = useParams<{ id: string }>();
    const photoId = id ? Number(id) : 0;

    const photo = useMemo<Photo | null>(
        () => entities.find((p) => p.id === photoId) || entity,
        [entities, entity, photoId]
    );

    useEffect(() => {
        if (!photo && photoId) {
            dispatch(fetchPhoto(photoId));
        }
    }, [dispatch, photo, photoId]);

    return (
        <Layout>
            {photo ? (
                <main className="cart main">
                    <section className="cart container" id="cart">
                        <h3 className="text-medium font-medium center">{photo.alt}</h3>
                        <div className="cart-wrapper">
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
                        </div>
                        <div className="cart-checkout">
                            <Link className="custom-link" to="/">Main Page</Link>
                        </div>
                    </section>
                </main>
            ) : (
                <NotFoundPage text={`There is no image with id ${id}`} />
            )}
        </Layout>
    );
};

export default PhotoPage;
