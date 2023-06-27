import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useRef, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import TopBar from 'components/common/TopBar/TopBar';
import Icon from 'components/common/Icon/Icon';
import Profile from 'components/pages/more/Profile';
import SideButton from 'components/pages/more/SideButton';
import InputContainer from 'components/pages/more/InputContainer';
import { ProfileFormValues, profileSchema } from 'types/InputSchema';
import Modal from 'components/common/Modal/Modal';
import ModalBottomSheet from 'components/common/Modal/ModalBottomSheet/ModalBottomSheet';
import BottomSheetMenu from 'components/common/Modal/ModalBottomSheet/BottomSheetMenu';
import store from 'stores/RootStore';
import {
  usePatchUserInfoMutation,
  usePutProfilePhotoMutation,
} from 'hooks/queries/user.queries';
import { usePatchCoupleMutation } from 'hooks/queries/couple.queries';
import PhotoScroll from 'components/pages/gallery/PhotoScroll';
import {
  useCreatePhotosMutation,
  useGalleryList,
} from 'hooks/queries/gallery.queries';
import preventScroll from 'util/utils';
import defaultProfile from 'assets/image/DefaultProfile.png';
import { MENT_MORE } from 'constants/ments';
import DataContext from '../gallery/context';

const Container = styled.div`
  position: relative;
`;

const StyledForm = styled.form`
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  font-family: 'PretendardRegular';
  background-color: transparent;
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 60px 0;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: -1;
  background-color: ${({ theme }) => theme.color.gray50};
`;

const Layer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
`;

function ProfilePage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [onCompleteModal, setOnCompleteModal] = useState(false);
  const [onCancelModal, setOnCanelModal] = useState(false);
  const [onBottomSheet, setOnButtomSheet] = useState(false);
  const [onPhotoScroll, setOnPhotoScroll] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<{
    isChange: boolean;
    files: FileList | null;
    url: string | null;
    id: string | null;
  }>({
    isChange: false,
    files: null,
    url: store.userStore.user?.imageUrl ?? null,
    id: null,
  });

  const ctxValue = useMemo(() => {
    return {
      selectingAvailable: true,
      addToList: (photoId: string, photoUrl?: string) => {
        setProfilePhoto({
          isChange: true,
          files: null,
          url: photoUrl ?? null,
          id: photoId,
        });
        setOnPhotoScroll(false);
      },
      removeFromList: () => {},
    };
  }, []);

  const nickname = store.userStore.user?.nickName ?? '';
  const birthday =
    new Date(store.userStore.user?.birthDay!).toISOString().substring(0, 10) ??
    '';
  const anniversary =
    new Date(store.userStore.user?.anniversaryDay!)
      .toISOString()
      .substring(0, 10) ?? '';
  const userId = store.userStore.user?.id ?? '';
  const coupleId = store.userStore.user?.coupleId ?? '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      nickname,
      birthday,
      anniversary,
    },
  });

  const { data: photos } = useGalleryList({ coupleId });
  const { mutateAsync: patchUserInfo } = usePatchUserInfoMutation({ userId });
  const { mutateAsync: patchCoupleInfo } = usePatchCoupleMutation({ coupleId });
  const { mutateAsync: putPorfilePhoto } = usePutProfilePhotoMutation({
    userId,
  });
  const { mutateAsync: addPhoto } = useCreatePhotosMutation({ coupleId });

  const modifyProfile = async (data: {
    nickname: string;
    birthday: string;
    anniversary: string;
  }) => {
    await patchUserInfo({
      nickName: data.nickname,
      birthDay: new Date(data.birthday),
    });
    await patchCoupleInfo({
      anniversaryDay: data.anniversary,
    });

    if (!profilePhoto.isChange) {
      setOnCompleteModal(true);
      return;
    }

    if (profilePhoto.files) {
      await addPhoto(profilePhoto.files, {
        onSuccess: async (info) => {
          const pId = (await info[0]).photoId;
          putPorfilePhoto(pId, {
            onSuccess: () => setOnCompleteModal(true),
          });
        },
      });
      return;
    }

    putPorfilePhoto(profilePhoto.id, {
      onSuccess: () => setOnCompleteModal(true),
    });
  };

  const upLoadFile = async () => {
    const files = inputFileRef.current?.files;
    if (!files) return;
    setProfilePhoto({
      isChange: true,
      files,
      url: URL.createObjectURL(files[0]),
      id: null,
    });
    setOnButtomSheet(false);
  };

  useEffect(() => {
    preventScroll();
  }, []);

  return (
    <DataContext.Provider value={ctxValue}>
      <Background />
      <StyledForm
        onSubmit={handleSubmit((data) => modifyProfile(data))}
        ref={formRef}
      >
        {!onPhotoScroll && (
          <>
            <TopBar
              leftNode={<Icon icon="IconArrowLeft" />}
              onLeftClick={() => setOnCanelModal(true)}
              title="프로필 수정"
              rightMainNode={
                <StyledInput
                  type="submit"
                  value="완료"
                  className="text-gradient400"
                />
              }
            />
            <Container className="page-container with-topbar">
              <ProfileContainer>
                <Profile
                  imgUrl={profilePhoto.url ?? defaultProfile}
                  border={false}
                />
                <SideButton
                  value="사진 수정"
                  abLeft="calc(50% + 19px)"
                  abTop="179px"
                  onClick={() => setOnButtomSheet(true)}
                />
              </ProfileContainer>
              <InputContainer
                title="애칭"
                type="text"
                value={nickname}
                {...register('nickname')}
                error={errors.nickname}
              />
              <InputContainer
                title="생년월일"
                type="date"
                value={birthday}
                {...register('birthday')}
                error={errors.birthday}
              />
              <InputContainer
                title="기념일"
                type="date"
                value={anniversary}
                {...register('anniversary')}
                error={errors.anniversary}
              />
              <Modal
                onModal={onCompleteModal}
                setOnModal={setOnCompleteModal}
                title={MENT_MORE.PROFILE_MODIFY_SUCCESS_TITLE}
                description={MENT_MORE.PROFILE_MODIFY_SUCCESS_DESC}
                mainActionLabel="확인"
                onMainAction={() => navigate('/more')}
              />
              <Modal
                onModal={onCancelModal}
                setOnModal={setOnCanelModal}
                title={MENT_MORE.PROFILE_MODIFY_CANCEL_TITLE}
                description={MENT_MORE.PROFILE_MODIFY_CANCEL_DESC}
                mainActionLabel="확인"
                onMainAction={() => navigate('/more')}
                subActionLabel="취소"
                onSubAction={() => setOnCanelModal(false)}
              />
              {onBottomSheet && (
                <ModalBottomSheet
                  open={onBottomSheet}
                  setOpen={setOnButtomSheet}
                >
                  <input
                    type="file"
                    accept=".jpg, .png"
                    ref={inputFileRef}
                    style={{ display: 'none' }}
                    onChange={upLoadFile}
                  />
                  <BottomSheetMenu
                    onClick={() => {
                      inputFileRef.current?.click();
                    }}
                  >
                    <Icon icon="IconShare" themeColor="gray50" />
                    라이브러리에서 선택
                  </BottomSheetMenu>
                  <BottomSheetMenu
                    onClick={() => {
                      setOnButtomSheet(false);
                      setOnPhotoScroll(true);
                    }}
                  >
                    <Icon icon="IconGallery" themeColor="gray50" />앱 내
                    갤러리에서 선택
                  </BottomSheetMenu>
                  <BottomSheetMenu
                    onClick={() => {
                      setOnButtomSheet(false);
                      setProfilePhoto({
                        isChange: false,
                        files: null,
                        url: null,
                        id: null,
                      });
                    }}
                  >
                    <Icon icon="IconTrash" themeColor="gray50" />
                    현재 사진 삭제
                  </BottomSheetMenu>
                </ModalBottomSheet>
              )}
            </Container>
          </>
        )}
      </StyledForm>
      {onPhotoScroll && (
        <Container className="page-container">
          <Layer />
          <PhotoScroll
            photos={photos ?? []}
            leftLabel="취소"
            onLeftClick={() => setOnPhotoScroll(false)}
          />
        </Container>
      )}
    </DataContext.Provider>
  );
}
export default observer(ProfilePage);
