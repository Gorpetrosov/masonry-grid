import Layout from "../components/layout/Layout.tsx";
import { Navbar } from "../components/navbar/Navbar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store.ts";
import {useCallback, useEffect, useMemo, useState} from "react";
import debounce from "lodash.debounce";
import {getMorePhotos, searchPhotos} from "../store/photoSlice.ts";
import {Masonry} from "../components/masonry/Masonry.tsx";

const MainPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, entities, total_results, page } = useSelector((state: RootState) => state.photos);
    const [currentQuery, setCurrentQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if(!entities.length){
            dispatch(getMorePhotos({ page }));
        }
    }, []);

    useEffect(() => {
        setHasMore(total_results - entities.length > 0);
    }, [total_results, entities.length, setHasMore]);

    const debouncedSearch = useMemo(
        () => debounce(async (query: string) => {
            try {
                await dispatch(searchPhotos({
                    query,
                    page,
                }));
            } finally {
                setIsSearching(false);
            }
        }, 300),
        [dispatch, page]
    );

    const getNewImages = useCallback(() => {

        if(currentQuery){
            dispatch(getMorePhotos({query: currentQuery,page: page + 1 }));
        }else {
            dispatch(getMorePhotos({ page: page + 1 }));
        }
    }, [currentQuery, dispatch, page])

    const handleImagesSearch = useCallback((query: string) => {
        setCurrentQuery(query);
        if (query.trim()) {
            setIsSearching(true);
            debouncedSearch(query.trim());
        }
    }, [debouncedSearch]);

    const updateInputValue = useCallback((query: string) => {
       setCurrentQuery(query.trim());
    },[])

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
            setIsSearching(false);
        };
    }, [debouncedSearch]);

    return (
        <Layout>
                <Navbar
                    onSearch={handleImagesSearch}
                    isDisabled={loading || isSearching}
                    onInputUpdate={updateInputValue}
                />
                {!loading && !isSearching && entities && (
                   <Masonry photos={entities} loadMore={getNewImages} isLoading={loading} hasMore={hasMore} />
                )}
        </Layout>
    );
};

export default MainPage;