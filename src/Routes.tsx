import { Routes, Route } from 'react-router-dom';
import GalleryMainPage from './pages/gallery/GalleryMainPage';
import PhotoPage from './pages/gallery/PhotoPage';
import Layout from './components/layout/Layout';
import AlbumPage from './pages/gallery/AlbumPage';
import AlbumDetailPage from './pages/gallery/AlbumDetailPage';
import NewAlbumPage from './pages/gallery/NewAlbumPage';

function GrowingRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/gallery" element={<GalleryMainPage />} />
        <Route path="/gallery/photo" element={<PhotoPage />} />
        <Route path="/gallery/album" element={<AlbumPage />} />
      </Route>
      <Route path="/gallery/photo/:id" element={<PhotoPage />} />
      <Route path="/gallery/album/:id" element={<AlbumDetailPage />} />
      <Route path="/gallery/new-album" element={<NewAlbumPage />} />
    </Routes>
  );
}

export default GrowingRoutes;
