import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import changeEmojiToSpan from 'utils/Text';
import preventScroll from 'utils/utils';
import queryKeys from 'libs/react-query/queryKeys';
import MENT_HOME from 'constants/ments';
import { PetDto } from 'models/pet';
import TopBar from 'components/common/TopBar/TopBar';
import Modal from 'components/common/Modal/Modal/Modal';
import Pet3D from 'pages/home/components/Pet3D';
import Waves from 'assets/image/HomeWaves.png';
import congratsAnimation from 'assets/lottie/congratsAnimation.json';
import * as S from './PetGraduatePage.styled';

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
    <S.PetRenameContainer className="page-container with-topbar">
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

      <S.SubTitle
        className="text-gradient400"
        dangerouslySetInnerHTML={changeEmojiToSpan(MENT_HOME.PET_GRADUATE)}
      />

      <Pet3D url={pet.imageUrl} size={240} />

      <S.WaveWrapper>
        <S.Wave src={Waves} />
      </S.WaveWrapper>

      <Modal
        onModal={onModal}
        setOnModal={setOnModal}
        description={MENT_HOME.PET_GRADUATE_NEW_PET}
        mainActionLabel="확인"
        onMainAction={() => {
          window.location.replace('/');
        }}
      />
    </S.PetRenameContainer>
  );
}

export default PetGraduatePage;
