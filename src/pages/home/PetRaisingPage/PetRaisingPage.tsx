import React, { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePetFeedMutation, usePetPlayMutation } from 'hooks/queries';
import preventScroll from 'util/utils';
import changeEmojiToSpan from 'util/Text';
import store from 'stores/RootStore';
import { PetDto } from 'models/pet';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import Modal from 'components/common/Modal/Modal/Modal';
import MENT_HOME from 'constants/ments';
import queryKeys from 'constants/queryKeys';
import foodAnimation from 'assets/lottie/foodAnimation.json';
import heartsAnimation from 'assets/lottie/heartsAnimation.json';
import Waves from 'assets/image/FeedWaves.png';
import PET_GAUGE_MAX from 'constants/constants';
import * as S from './PetRaisingPage.styled';

type PetOption = 'feed' | 'play';

export default function PetRaisingPage() {
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
          }, 3000);
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
    <S.PetFeedContainer className="page-container with-topbar">
      <TopBar
        mode="PURPLE50"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigation(-1)}
        border={false}
      />
      <S.Main>
        <S.Title
          className="text-gradient400"
          dangerouslySetInnerHTML={changeEmojiToSpan(
            petOption === 'feed' ? MENT_HOME.PET_FEED : MENT_HOME.PET_PLAY
          )}
        />

        <S.Bar>
          <S.ActiveBar level={gauge} />
        </S.Bar>

        <S.SubTitle className="text-gradient400">
          {MENT_HOME.PET_FEED_HELP}
        </S.SubTitle>
      </S.Main>

      <S.PetContainer>
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

        <S.Pet
          url={reactionUrl ?? pet.imageUrl}
          size={300}
          onClick={() => {
            if (gauge >= PET_GAUGE_MAX) return;
            const increaseMount =
              petOption === 'feed' ? PET_GAUGE_MAX / 4 : PET_GAUGE_MAX / 5;
            setGauge(gauge + increaseMount);
            foodLottieRef.current?.goToAndPlay(1);
            heartsLottieRef.current?.goToAndPlay(1);
          }}
        />
      </S.PetContainer>

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

      <S.Info>
        <S.Outer>
          <S.Inner>
            <S.Letter>
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
            </S.Letter>
          </S.Inner>
        </S.Outer>

        <S.Wave src={Waves} />
      </S.Info>

      <Modal
        onModal={onModal}
        setOnModal={setOnModal}
        description={modalText}
        mainActionLabel="확인"
        onMainAction={() => navigation(-1)}
      />
    </S.PetFeedContainer>
  );
}
