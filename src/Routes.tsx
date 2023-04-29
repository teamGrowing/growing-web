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
import Home from './pages/home/Home';
import PetNamingPage from './pages/home/PetNamingPage';
import PetFeedPage from './pages/home/PetRaisingPage';
import AlbumPhotoDetailPage from './pages/gallery/AlbumPhotoDetailPage';
import CalendarPage from './pages/calendar/CalendarPage';
import PetGraduatePage from './pages/home/PetGraudatePage';
import ChattingPage from './pages/chat/ChattingPage';
import LongChattingPage from './pages/chat/LongChattingPage';
import QuestionBoxPage from './pages/chat/QuestionBoxPage';
import ChatNoticePage from './pages/chat/ChatNoticePage';
import ChatArchivePage from './pages/chat/ChatArchivePage';
import ChatPhotoBoxPage from './pages/chat/ChatPhotoBoxPage';
import ChatPhotoDetailPage from './pages/chat/ChatPhotoDetailPage';
import LoginKakaoPage from './pages/login/LoginKakaoPage';
import LoginSelectPage from './pages/login/LoginSelectPage';
import LoginInvitedPage from './pages/login/LoginInvitedPage';
import LoginCreatePage from './pages/login/LoginCreatePage';
import LoginPetBornPage from './pages/login/LoginPetBornPage';
import LoginWaitingPage from './pages/login/LoginWaitingPage';

function GrowingRoutes() {
  return (
    <Routes>
      <Route path="/login/kakao" element={<LoginKakaoPage />} />

      <Route element={<AuthRoute />}>
        {/* login */}
        <Route path="/login/select" element={<LoginSelectPage />} />
        <Route path="/login/invited" element={<LoginInvitedPage />} />
        <Route path="/login/create" element={<LoginCreatePage />} />
        <Route path="/login/waiting" element={<LoginWaitingPage />} />
        <Route path="/login/born" element={<LoginPetBornPage />} />
        {/* home */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/pet/naming" element={<PetNamingPage />} />
        <Route path="/pet/feed" element={<PetFeedPage />} />
        <Route path="/pet/play" element={<PetFeedPage />} />
        <Route path="/pet/graduate" element={<PetGraduatePage />} />

        {/* chat */}
        <Route path="/chat" element={<ChattingPage />} />
        <Route path="/chat/all" element={<LongChattingPage />} />
        <Route path="/chat/notice" element={<ChatNoticePage />} />
        <Route path="/chat/question-box" element={<QuestionBoxPage />} />
        <Route path="/chat/archive" element={<ChatArchivePage />} />
        <Route path="/chat/photo-box" element={<ChatPhotoBoxPage />} />
        <Route path="/chat/photo-box/:id" element={<ChatPhotoDetailPage />} />

        {/* gallery */}
        <Route element={<Layout />}>
          <Route path="/gallery" element={<GalleryMainPage />} />
          <Route path="/gallery/photo" element={<PhotoPage />} />
          <Route path="/gallery/album" element={<AlbumPage />} />
        </Route>
        <Route path="/gallery/photo/:pId" element={<PhotoDetailPage />} />
        <Route path="/gallery/album/:aId" element={<AlbumDetailPage />} />
        <Route
          path="/gallery/album/:aId/photo/:pId"
          element={<AlbumPhotoDetailPage />}
        />
        <Route path="/gallery/new-album" element={<NewAlbumPage />} />

        {/* calendar */}
        <Route element={<Layout />}>
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>

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
