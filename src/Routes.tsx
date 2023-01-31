import { Routes, Route } from 'react-router-dom';
import GalleryMainPage from './pages/gallery/GalleryMainPage';
import PhotoPage from './pages/gallery/PhotoPage';
import Layout from './components/layout/Layout';
import AlbumPage from './pages/gallery/AlbumPage';
import AlbumDetailPage from './pages/gallery/AlbumDetailPage';
import NewAlbumPage from './pages/gallery/NewAlbumPage';
import MoreMainPage from './pages/more/MoreMainPage';
import ProfilePage from './pages/more/ProfilePage';
import InfoPage from './pages/more/InfoPage';
import SettingPage from './pages/more/SettingPage';
import PhotoDetailPage from './pages/gallery/PhotoDetailPage';
import PetPage from './pages/more/PetPage';

function GrowingRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/gallery" element={<GalleryMainPage />} />
        <Route path="/gallery/photo" element={<PhotoPage />} />
        <Route path="/gallery/album" element={<AlbumPage />} />
      </Route>
      <Route path="/gallery/photo/:id" element={<PhotoDetailPage />} />
      <Route path="/gallery/album/:id" element={<AlbumDetailPage />} />
      <Route path="/gallery/new-album" element={<NewAlbumPage />} />
      <Route element={<Layout />}>
        <Route path="/more" element={<MoreMainPage />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/more" element={<MoreMainPage />} />
      </Route>
      <Route path="/more/profile" element={<ProfilePage />} />
      <Route path="/more/info" element={<InfoPage />} />
      <Route path="/more/setting" element={<SettingPage />} />
      <Route path="/more/pet" element={<PetPage />} />
    </Routes>
  );
}

export default GrowingRoutes;
