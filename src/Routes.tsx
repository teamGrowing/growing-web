import { Routes, Route } from 'react-router-dom';
import NoticePage from 'pages/more/NoticePage/NoticePage';
import NoticeDetailPage from 'pages/more/NoticeDetailPage/NoticeDetailPage';
import PageLayout from 'components/layout/PageLayout';
import GalleryMainPage from './pages/gallery/gallery-main/page';
import PhotoPage from './pages/gallery/photo/page';
import Layout from './components/layout/Layout';
import AlbumPage from './pages/gallery/album/page';
import AlbumDetailPage from './pages/gallery/album-detail/page';
import NewAlbumPage from './pages/gallery/new-album/page';
import MoreMainPage from './pages/more/MoreMainPage/MoreMainPage';
import ProfilePage from './pages/more/ProfilePage/ProfilePage';
import SettingPage from './pages/more/SettingPage/SettingPage';
import PhotoDetailPage from './pages/gallery/photo-detail/PhotoDetailPage';
import PetPage from './pages/more/PetPage/PetPage';
import AuthRoute from './components/layout/AuthRoute';
import AlbumPhotoDetailPage from './pages/gallery/album-photo-detail/page';
import CalendarPage from './pages/calendar/CalendarPage/CalendarPage';
import Home from './pages/home/main/page';
import PetNamingPage from './pages/home/pet-naming/page';
import PetFeedPage from './pages/home/pet-raising/page';
import PetGraduatePage from './pages/home/pet-graduate/page';
import ChattingPage from './pages/chat/main/page';
import LongChattingPage from './pages/chat/long-chat/page';
import QuestionBoxPage from './pages/chat/question-box/page';
import ChatNoticePage from './pages/chat/notice/page';
import ChatArchivePage from './pages/chat/archive/page';
import ChatPhotoBoxPage from './pages/chat/photo-box/page';
import ChatPhotoDetailPage from './pages/chat/photo-detail/page';
import LoginKakaoPage from './pages/login/LoginKakaoPage/LoginKakaoPage';
import LoginSelectPage from './pages/login/LoginSelectPage/LoginSelectPage';
import LoginInvitedPage from './pages/login/LoginInvitedPage/LoginInvitedPage';
import LoginCreatePage from './pages/login/LoginCreatePage/LoginCreatePage';
import LoginPetBornPage from './pages/login/LoginPetBornPage/LoginPetBornPage';
import LoginWaitingPage from './pages/login/LoginWaitingPage/LoginWaitingPage';

function GrowingRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
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
          <Route path="/pet/raising/feed" element={<PetFeedPage />} />
          <Route path="/pet/raising/play" element={<PetFeedPage />} />
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
          <Route path="/more/notice" element={<NoticePage />} />
          <Route path="/more/notice/:id" element={<NoticeDetailPage />} />
          <Route path="/more/setting" element={<SettingPage />} />
          <Route path="/more/pet" element={<PetPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default GrowingRoutes;
