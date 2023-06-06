import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import WhiteContainer from 'components/pages/more/WhiteContainer';
import dayjs from 'dayjs';
import { useNoticeList } from 'hooks/queries/notice.queries';
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

const Title = styled.div`
  font-family: 'PretendardMedium';
  padding: 10px 20px 0px 20px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  font-size: 19px;
  line-height: 23px;
  color: ${({ theme }) => theme.color.black};

  width: 100%;
  flex: none;
`;
const Date = styled.div`
  font-size: 10px;
  padding: 0px 20px 5px 20px;
`;

function NoticePage() {
  const navigate = useNavigate();
  const { data } = useNoticeList();

  return (
    <Container className="page-container">
      <PurpleBackground />
      <TopBar
        title="공지사항"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      <WhiteContainer top="89px">
        {data?.map((notice) => (
          <Box key={notice.id} onClick={() => navigate(`${notice.id}`)}>
            <Title>{notice.title}</Title>
            <Date>{dayjs(notice.createdAt).format('YYYY-MM-DD')}</Date>
            <Border />
          </Box>
        ))}
      </WhiteContainer>
    </Container>
  );
}
export default NoticePage;
