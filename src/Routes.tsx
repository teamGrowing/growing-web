import { Routes, Route } from 'react-router-dom';
import NoticePage from 'pages/more/NoticePage/NoticePage';
import NoticeDetailPage from 'pages/more/NoticeDetailPage/NoticeDetailPage';
import GalleryMainPage from './pages/gallery/GalleryMainPage/GalleryMainPage';
import PhotoPage from './pages/gallery/PhotoPage/PhotoPage';
import Layout from './components/layout/Layout';
import AlbumPage from './pages/gallery/AlbumPage/AlbumPage';
import AlbumDetailPage from './pages/gallery/AlbumDetailPage/AlbumDetailPage';
import NewAlbumPage from './pages/gallery/NewAlbumPage/NewAlbumPage';
import MoreMainPage from './pages/more/MoreMainPage/MoreMainPage';
import ProfilePage from './pages/more/ProfilePage/ProfilePage';
import InfoPage from './pages/more/InfoPage/InfoPage';
import SettingPage from './pages/more/SettingPage/SettingPage';
import PhotoDetailPage from './pages/gallery/PhotoDetailPage/PhotoDetailPage';
import PetPage from './pages/more/PetPage/PetPage';
import AuthRoute from './components/layout/AuthRoute';
import AlbumPhotoDetailPage from './pages/gallery/AlbumPhotoDetailPage/AlbumPhotoDetailPage';
import CalendarPage from './pages/calendar/CalendarPage/CalendarPage';
import Home from './pages/home/HomePage/HomePage';
import PetNamingPage from './pages/home/PetNamingPage/PetNamingPage';
import PetFeedPage from './pages/home/PetRaisingPage/PetRaisingPage';
import PetGraduatePage from './pages/home/PetGraduatePage/PetGraduatePage';
import ChattingPage from './pages/chat/ChattingPage/ChattingPage';
import LongChattingPage from './pages/chat/LongChattingPage/LongChattingPage';
import QuestionBoxPage from './pages/chat/QuestionBoxPage/QuestionBoxPage';
import ChatNoticePage from './pages/chat/ChatNoticePage/ChatNoticePage';
import ChatArchivePage from './pages/chat/ChatArchivePage/ChatArchivePage';
import ChatPhotoBoxPage from './pages/chat/ChatPhotoBoxPage/ChatPhotoBoxPage';
import ChatPhotoDetailPage from './pages/chat/ChatPhotoDetailPage/ChatPhotoDetailPage';
import LoginKakaoPage from './pages/login/LoginKakaoPage/LoginKakaoPage';
import LoginSelectPage from './pages/login/LoginSelectPage/LoginSelectPage';
import LoginInvitedPage from './pages/login/LoginInvitedPage/LoginInvitedPage';
import LoginCreatePage from './pages/login/LoginCreatePage/LoginCreatePage';
import LoginPetBornPage from './pages/login/LoginPetBornPage/LoginPetBornPage';
import LoginWaitingPage from './pages/login/LoginWaitingPage/LoginWaitingPage';

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
          <Route path="/gallery/album/:aId" element={<AlbumDetailPage />} />
        </Route>
        <Route path="/gallery/photo/:pId" element={<PhotoDetailPage />} />
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
        <Route path="/more/info/notice" element={<NoticePage />} />
        <Route path="/more/info/notice/:id" element={<NoticeDetailPage />} />
        <Route path="/more/setting" element={<SettingPage />} />
        <Route path="/more/pet" element={<PetPage />} />
      </Route>
    </Routes>
  );
}

export default GrowingRoutes;
