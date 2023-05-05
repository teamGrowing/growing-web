import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import changeEmojiToSpan from 'util/Text';
import preventScroll from 'util/utils';
import queryKeys from 'constants/queryKeys';
import MENT_HOME from 'constants/ments';
import { PetDto } from 'types/pet/Pet.dto';
import TopBar from 'components/common/TopBar/TopBar';
import Modal from 'components/common/Modal/Modal';
import Pet3D from 'components/pages/home/Pet3D';
import Waves from 'assets/image/HomeWaves.png';
import congratsAnimation from 'assets/lottie/congratsAnimation.json';

const PetRenameContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;

  padding-bottom: 100px;

  background-color: ${({ theme }) => theme.color.purple50};
`;

const SubTitle = styled.div`
  font-family: 'PretendardLight';
  font-size: 15px;
  text-align: center;
  white-space: pre-wrap;
`;

const WaveWrapper = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  align-items: flex-end;

  width: 100%;
  margin-top: -40px;
`;

const Wave = styled.img`
  width: 100%;
  height: 224px;
`;

function PetGraduatePage() {
  const queryClient = useQueryClient();

  const [onModal, setOnModal] = useState<boolean>(false);

  const { data: pet } = queryClient.getQueryData(
    queryKeys.petKeys.all
  ) as AxiosResponse<PetDto>;

  useEffect(() => {
    preventScroll();

    setTimeout(() => {
      setOnModal(true);
    }, 6000);
  }, []);

  return (
    <PetRenameContainer className="page-container with-topbar">
      <TopBar mode="PURPLE50" border={false} title="growing" />

      <Lottie
        animationData={congratsAnimation}
        style={{
          position: 'absolute',
          width: '76%',
          left: 'calc(50% - 38%)',
          top: 'calc(22%)',
          transition: 'transform3d(-50%, -50%, 0)',
          zIndex: '1',
        }}
        loop
      />

      <SubTitle
        className="text-gradient400"
        dangerouslySetInnerHTML={changeEmojiToSpan(MENT_HOME.PET_GRADUATE)}
      />

      <Pet3D url={pet.imageUrl} size={240} />

      <WaveWrapper>
        <Wave src={Waves} />
      </WaveWrapper>

      <Modal
        onModal={onModal}
        setOnModal={setOnModal}
        description={MENT_HOME.PET_GRADUATE_NEW_PET}
        mainActionLabel="확인"
        onMainAction={() => {
          window.location.replace('/');
        }}
      />
    </PetRenameContainer>
  );
}

export default PetGraduatePage;
