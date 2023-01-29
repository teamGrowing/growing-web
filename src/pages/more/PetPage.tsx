import styled from 'styled-components';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/common/Icon/Icon';
import TopBar from '../../components/common/TopBar/TopBar';
import PetCard from '../../components/pages/more/PetCard';
import PetDetailCard from '../../components/pages/more/PetDetailCard';
import PaddingContainer from '../../styles/common/layout';
import PurpleBackground from '../../styles/common/PurpleBackground';
import PostPetLineDto from '../../types/more/PostPetLine.dto';
import PostPetDto from '../../types/more/PostPet.dto';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 41px 0;
`;
const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); ;
`;
function PetPage() {
  const [detailInfo, setDetailInfo] = useState<PostPetDto | null>(null);
  const navigate = useNavigate();

  const data: PostPetLineDto[] = [
    { name: '젋은 계빈이', imageUrl: '', id: '1', endedAt: '2020-02-02' },
    { name: '귀여운 계빈이', imageUrl: '', id: '2', endedAt: '2020-03-04' },
    { name: '늙은 계빈이', imageUrl: '', id: '3', endedAt: '2020-05-06' },
    { name: '어린이 계빈이', imageUrl: '', id: '4', endedAt: '2020-07-08' },
  ];

  const clickCardHandler = () => {
    // TODO detail 요청
    const receivedData = {
      id: '1',
      imageUrl: '',
      name: '젋은 계빈이',
      createdAt: '2020-02-02',
      endedAt: '2020-02-02',
      description:
        '계빈이는 행복하게 머고 자고 즐기다가 갔습니다~ 고맙다고 전해달래요',
    };
    setDetailInfo(receivedData);
  };

  return (
    <PurpleBackground>
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate('/more')}
        title="동물도감"
      />
      <PaddingContainer>
        <Wrapper>
          {data.map((pet) => (
            <PetCard key={pet.id} petInfo={pet} onClick={clickCardHandler} />
          ))}
        </Wrapper>
        {detailInfo &&
          ReactDOM.createPortal(
            <>
              <Layer />
              <PetDetailCard
                petInfo={detailInfo}
                onClick={() => setDetailInfo(null)}
              />
            </>,
            document.getElementById('modal-root') as Element
          )}
      </PaddingContainer>
    </PurpleBackground>
  );
}
export default PetPage;
