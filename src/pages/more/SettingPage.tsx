import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TopBar from '../../components/common/TopBar/TopBar';
import Icon from '../../components/common/Icon/Icon';
import WhiteContainer from '../../components/pages/more/WhiteContainer';
import PurpleBackground from '../../styles/common/PurpleBackground';
import preventScroll from '../../util/utils';

const Container = styled.div`
  position: relative;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 20px;
  gap: 10px;

  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;
  color: ${({ theme }) => theme.color.black};

  width: 100%;
  height: 43px;

  flex: none;
`;

const Border = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.color.gradient400};
  flex: none;
`;

function SettingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    preventScroll();
  }, []);
  return (
    <Container className="page-container">
      <PurpleBackground />
      <TopBar
        title="설정"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate('/more')}
      />
      <WhiteContainer top="89px">
        <Box>버전 정보</Box>
        <Border />
        <Box>대화내용 내보내기</Box>
        <Border />
        <Box>대화내용 가져오기</Box>
        <Border />
        <Box>암호설정</Box>
        <Border />
        <Box>알림설정</Box>
        <Border />
      </WhiteContainer>
    </Container>
  );
}
export default SettingPage;
