import { Routes, Route } from 'react-router-dom';
import AlbumDetailPage from './pages/gallery/AlbumDetailPage';
import AlbumPage from './pages/gallery/AlbumPage';
import GalleryMainPage from './pages/gallery/GalleryMainPage';
import NewAlbumPage from './pages/gallery/NewAlbumPage';
import PhotoDetailPage from './pages/gallery/PhotoDetailPage';
import PhotoPage from './pages/gallery/PhotoPage';

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="gallery">
        <Route index element={<GalleryMainPage />} />
        <Route path="photo">
          <Route index element={<PhotoPage />} />
          <Route path=":id" element={<PhotoDetailPage />} />
        </Route>
        <Route path="album" element={<AlbumPage />} />
        <Route path="album/:id" element={<AlbumDetailPage />} />

        <Route path="new-album" element={<NewAlbumPage />} />
      </Route>
      <Route path="/chatting" />
      <Route path="/calendar" />
      <Route path="/more" />
    </Routes>
  );
}

export default App;
