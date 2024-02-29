import { useNavigate } from 'react-router-dom';
import TopBar from 'components/common/TopBar/TopBar';
import Icon from 'components/common/Icon/Icon';
import WhiteContainer from 'pages/more/components/WhiteContainer/WhiteContainer';
import MainBackground from 'styles/common/MainBackground';
import * as S from './page.styled';

function SettingPage() {
  const navigate = useNavigate();

  return (
    <S.Container className="page-container">
      <MainBackground />
      <TopBar
        title="설정"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate('/more')}
      />
      <WhiteContainer top="89px">
        {/* <Box>버전 정보</Box>
        <Border />
        <Box>대화내용 내보내기</Box>
        <Border />
        <Box>대화내용 가져오기</Box>
        <Border />
        <Box>암호설정</Box>
        <Border />
        <Box>알림설정</Box>
        <Border /> */}
        <S.Box>
          버전 정보 v1.0.0 <S.VersionMsg>최신 버전</S.VersionMsg>
        </S.Box>
        <S.Border />
      </WhiteContainer>
    </S.Container>
  );
}
export default SettingPage;
