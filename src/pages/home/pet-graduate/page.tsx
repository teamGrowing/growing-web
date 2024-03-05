import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import changeEmojiToSpan from 'utils/Text';
import MENT_HOME from 'constants/ments';
import TopBar from 'components/common/TopBar/TopBar';
import Modal from 'components/common/Modal/Modal';
import Pet3D from 'pages/home/components/Pet3D';
import Waves from 'assets/image/HomeWaves.png';
import congratsAnimation from 'assets/lottie/congratsAnimation.json';
import * as S from './page.styled';

const PetGraduatePage = () => {
  const [onModal, setOnModal] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setOnModal(true);
    }, 6000);
  }, []);

  return (
    <S.PetRenameContainer>
      <TopBar mode="BACKGROUND" border={false} title="growing" />

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

      <Pet3D size={240} />

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
};

export default PetGraduatePage;
