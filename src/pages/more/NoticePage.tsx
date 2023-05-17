import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import WhiteContainer from 'components/pages/more/WhiteContainer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PurpleBackground from 'styles/common/PurpleBackground';

const Container = styled.div`
  position: relative;
`;
const Border = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.color.gradient400};
  flex: none;
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

function NoticePage() {
  const navigate = useNavigate();

  return (
    <Container className="page-container">
      <PurpleBackground />
      <TopBar
        title="공지사항"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      <WhiteContainer top="89px">
        <Box onClick={() => navigate('detail')}>v1.0.0 출시</Box>
        <Border />
      </WhiteContainer>
    </Container>
  );
}
export default NoticePage;
