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
import AuthRoute from './util/AuthRoute';
import Login from './pages/Login';
import Home from './pages/home/Home';
import PetNamingPage from './pages/home/PetNamingPage';
import PetFeedPage from './pages/home/PetFeedPage';

function GrowingRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AuthRoute />}>
        {/* home */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/pet/naming" element={<PetNamingPage />} />
        <Route path="/pet/feed" element={<PetFeedPage />} />
        <Route path="/pet/play" element={<PetFeedPage />} />

        {/* gallery */}
        <Route element={<Layout />}>
          <Route path="/gallery" element={<GalleryMainPage />} />
          <Route path="/gallery/photo" element={<PhotoPage />} />
          <Route path="/gallery/album" element={<AlbumPage />} />
        </Route>
        <Route path="/gallery/photo/:id" element={<PhotoDetailPage />} />
        <Route path="/gallery/album/:id" element={<AlbumDetailPage />} />
        <Route path="/gallery/new-album" element={<NewAlbumPage />} />

        {/* more */}
        <Route element={<Layout />}>
          <Route path="/more" element={<MoreMainPage />} />
        </Route>
        <Route path="/more/profile" element={<ProfilePage />} />
        <Route path="/more/info" element={<InfoPage />} />
        <Route path="/more/setting" element={<SettingPage />} />
        <Route path="/more/pet" element={<PetPage />} />
      </Route>
    </Routes>
  );
}

export default GrowingRoutes;
