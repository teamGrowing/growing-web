import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  usePetFeedMutation,
  usePetPlayMutation,
} from '../../hooks/queries/pet.queries';
import preventScroll from '../../util/utils';
import changeEmojiToSpan from '../../util/Text';
import store from '../../stores/RootStore';
import { PetDto } from '../../types/pet/Pet.dto';
import Icon from '../../components/common/Icon/Icon';
import TopBar from '../../components/common/TopBar/TopBar';
import Modal from '../../components/common/Modal/Modal';
import Pet3DImg from '../../components/pages/home/Pet3D';
import MENT_HOME from '../../constants/ments';
import queryKeys from '../../constants/queryKeys';
import foodAnimation from '../../assets/lottie/foodAnimation.json';
import heartsAnimation from '../../assets/lottie/heartsAnimation.json';
import Waves from '../../assets/image/FeedWaves.png';

const PetFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.color.purple50};
`;
const Main = styled.section`
  width: 100%;
`;
const Title = styled.div`
  margin-top: 34px;
  padding: 20px 0;

  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;
  text-align: center;

  > span {
    -webkit-text-fill-color: initial;
  }
`;
const SubTitle = styled.p`
  padding: 10px 0;

  font-family: 'PretendardLight';
  font-size: 14px;
  line-height: 17px;
  text-align: center;
`;
const Bar = styled.div`
  position: relative;

  margin: 16px 60px 10px 60px;
  height: 23px;
  background-color: ${({ theme }) => theme.color.gray50};
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;
const ActiveBar = styled.div<{ level: number }>`
  position: absolute;

  width: ${(props) => props.level}%;
  height: 23px;
  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.7) 7.3%,
    rgba(234, 96, 96, 0.7) 100%
  );
  border-radius: ${(props) => (props.level === 100 ? '20px' : '20px 0 0 20px')};
`;
const PetContainer = styled.section`
  position: relative;

  display: flex;
  align-items: flex-end;

  padding: 0 30px;
`;
const Pet = styled(Pet3DImg)`
  margin-bottom: 10px;
  z-index: 1;
`;

const Info = styled.section`
  position: relative;

  width: 100%;
`;
const Outer = styled.div`
  background: ${({ theme }) => theme.color.gradient300};
  opacity: 0.9;

  border-radius: 20px 20px 0 0;
  border-top: 15px solid whilte;
  border-left: 15px solid whilte;
`;
const Inner = styled.div`
  z-index: 2;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 20px 20px 0 0;
  padding: 28px 15px 0 15px;
  margin-left: 10px;
`;
const Letter = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  padding: 18px 10px 55px 10px;
  border-radius: 30px 30px 0 0;
  background-image: linear-gradient(
    130.11deg,
    rgba(252, 227, 138, 0.2) 7.3%,
    rgba(243, 129, 129, 0.2) 100%
  );

  font-size: 14px;
  line-height: 17px;
  text-align: center;
  white-space: pre-wrap;
`;
const Wave = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 45px;
`;

type PetOption = 'feed' | 'play';

export default function PetRaising() {
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const petOption: PetOption = pathname.split('/')[2] as PetOption;

  const queryClient = useQueryClient();
  const { userStore } = store;

  const foodLottieRef = useRef<LottieRefCurrentProps | null>(null);
  const heartsLottieRef = useRef<LottieRefCurrentProps | null>(null);

  const [gauge, setGauge] = useState<number>(0);
  const [onModal, setOnModal] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');
  const [reactionUrl, setReactionUrl] = useState<string | null>(null);

  const { data: pet } = queryClient.getQueryData(
    queryKeys.petKeys.all
  ) as AxiosResponse<PetDto>;

  const { mutateAsync: feedPet } = usePetFeedMutation({
    coupleId: userStore.user?.coupleId,
    petId: userStore.petId,
    options: {
      onSuccess(res) {
        if (res.data.hungryGauge > pet.hungryGauge) {
          heartsLottieRef.current?.goToAndPlay(1);
          setReactionUrl(res.data.petImageUrl);
          setTimeout(() => {
            setModalText(MENT_HOME.PET_FEED_SUCCESS);
            setOnModal(true);
          }, 2000);
        } else {
          setModalText(MENT_HOME.PET_FEED_FAIL_TIME);
          setOnModal(true);
        }
        // setModalText(MENT_HOME.PET_FEED_FAIL_NUMBER); TODO
      },
    },
  });

  const { mutateAsync: playPet } = usePetPlayMutation({
    coupleId: userStore.user?.coupleId,
    petId: userStore.petId,
    options: {
      onSuccess(res) {
        if (res.data.attentionGauge > pet.attentionGauge) {
          heartsLottieRef.current?.goToAndPlay(1);
          setReactionUrl(res.data.petImageUrl);
          setTimeout(() => {
            setModalText(MENT_HOME.PET_PLAY_SUCCESS);
            setOnModal(true);
          }, 2000);
        } else {
          setModalText(MENT_HOME.PET_PLAY_FAIL);
          setOnModal(true);
        }
      },
    },
  });

  useEffect(() => {
    if (gauge === 100) {
      if (petOption === 'feed') {
        feedPet({});
      } else {
        playPet({});
      }
    }
  }, [gauge]);

  useEffect(() => {
    setReactionUrl(pet.imageUrl);
  }, [pet]);

  useEffect(() => {
    foodLottieRef.current?.pause();
    heartsLottieRef.current?.pause();
    preventScroll();
  }, []);

  return (
    <PetFeedContainer className="page-container with-topbar">
      <TopBar
        mode="PURPLE50"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigation(-1)}
        border={false}
      />
      <Main>
        <Title
          className="text-gradient400"
          dangerouslySetInnerHTML={changeEmojiToSpan(
            petOption === 'feed' ? MENT_HOME.PET_FEED : MENT_HOME.PET_PLAY
          )}
        />

        <Bar>
          <ActiveBar level={gauge} />
        </Bar>

        <SubTitle className="text-gradient400">
          {MENT_HOME.PET_FEED_HELP}
        </SubTitle>
      </Main>

      <PetContainer>
        {petOption === 'feed' && (
          <Lottie
            lottieRef={foodLottieRef}
            animationData={foodAnimation}
            style={{
              width: '120px',
              marginRight: '-20px',
            }}
            loop={false}
          />
        )}

        <Pet
          url={reactionUrl ?? pet.imageUrl}
          size={300}
          onClick={() => {
            const increaseMount = petOption === 'feed' ? 100 / 4 : 100 / 5;
            setGauge(gauge + increaseMount);
            foodLottieRef.current?.goToAndPlay(1);
            heartsLottieRef.current?.goToAndPlay(1);
          }}
        />
      </PetContainer>

      <Lottie
        lottieRef={heartsLottieRef}
        animationData={heartsAnimation}
        style={{
          width: '80px',
          position: 'absolute',
          top: '50%',
          left: 'calc(50% + 110px)',
          transform: 'translate3d(-50%, -140px, 0)',
        }}
        loop={false}
      />

      <Info>
        <Outer>
          <Inner>
            <Letter>
              <p className="text-gradient400">
                잠깐만요 !! <span>🚨</span>
              </p>
              <br />
              <div
                className="text-gradient400"
                dangerouslySetInnerHTML={changeEmojiToSpan(
                  petOption === 'feed'
                    ? MENT_HOME.PET_FEED_TIP
                    : MENT_HOME.PET_PLAY_TIP
                )}
              />
            </Letter>
          </Inner>
        </Outer>

        <Wave src={Waves} />
      </Info>

      <Modal
        onModal={onModal}
        setOnModal={setOnModal}
        description={modalText}
        mainActionLabel="확인"
        onMainAction={() => navigation(-1)}
      />
    </PetFeedContainer>
  );
}
