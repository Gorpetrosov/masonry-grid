import { lazy, Suspense } from 'react'
import './App.css'
import { LoadingSpinner } from "./components/loading/LoadingSpinner.tsx";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/404/NotFoundPage.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./store/store.ts";
import MainPage from "./pages/MainPage.tsx";

// Lazy-loaded components
const PhotoPage = lazy(() => import('./pages/PhotoPage'));

function App() {
    const { loading } = useSelector((state: RootState) => state.photos);

    return (
        <>
            <LoadingSpinner isLoading={loading} />

            <Suspense fallback={<div />}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/photos/:id" element={<PhotoPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </>
    )
}

export default App