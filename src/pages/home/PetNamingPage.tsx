import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import store from 'stores/RootStore';
import changeEmojiToSpan from 'util/Text';
import preventScroll from 'util/utils';
import useToast from 'hooks/common/useToast';
import { usePetNameMutation } from 'hooks/queries/pet.queries';
import queryKeys from 'constants/queryKeys';
import MENT_HOME from 'constants/ments';
import { PetDto } from 'types/pet/Pet.dto';
import { PetFormValues, petSchema } from 'types/InputSchema';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import Modal from 'components/common/Modal/Modal';
import PetNameInput from 'components/pages/home/PetNameInput';
import Pet3D from 'components/pages/home/Pet3D';
import Waves from 'assets/image/HomeWaves.png';

const PetRenameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.color.purple50};
`;

const SubTitle = styled.div`
  font-family: 'PretendardLight';
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  white-space: pre-wrap;
`;

const WaveWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  width: 100%;
  margin-top: -40px;
`;
const Wave = styled.img`
  width: 100%;
  height: 224px;
`;

export default function PetNamingPage() {
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const { userStore } = store;
  const { addToast } = useToast();

  const [onModal, setOnModal] = useState<boolean>(false);

  const { data: pet } = queryClient.getQueryData(
    queryKeys.petKeys.all
  ) as AxiosResponse<PetDto>;

  const methods = useForm<PetFormValues>({ resolver: yupResolver(petSchema) });

  const { mutate: nameMyPet } = usePetNameMutation({
    coupleId: userStore.user?.coupleId,
    petId: userStore.petId,
    options: {
      onSuccess() {
        // TODO: 동시에 바꿨을 때
        navigation(-1);
        addToast(MENT_HOME.PET_NAMING_SUCCESS);
        queryClient.invalidateQueries(queryKeys.petKeys.all);
      },
      onError() {
        // TODO: api error
        setOnModal(true);
      },
    },
  });

  useEffect(() => {
    preventScroll();
  }, []);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) =>
          nameMyPet({ nickName: data.name })
        )}
      >
        <PetRenameContainer className="page-container with-topbar">
          <TopBar
            mode="PURPLE50"
            leftNode={<Icon icon="IconArrowLeft" />}
            onLeftClick={() => navigation(-1)}
            rightMainNode={<button type="submit">수정</button>}
            border={false}
          />

          <PetNameInput />

          <SubTitle
            className="text-gradient400"
            dangerouslySetInnerHTML={changeEmojiToSpan(
              MENT_HOME.PET_NAMING_HELP
            )}
          />

          <Pet3D url={pet.imageUrl} size={240} />

          <WaveWrapper>
            <Wave src={Waves} />
          </WaveWrapper>

          <Modal
            onModal={onModal}
            setOnModal={setOnModal}
            description={MENT_HOME.PET_NAMIMG_FAIL}
            mainActionLabel="이름 확인하기"
            onMainAction={() => navigation(-1)}
          />
        </PetRenameContainer>
      </form>
    </FormProvider>
  );
}
