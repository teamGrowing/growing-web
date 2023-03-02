import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState, useRef, useMemo, useEffect } from 'react';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactDOM from 'react-dom';
import TopBar from '../../components/common/TopBar/TopBar';
import Icon from '../../components/common/Icon/Icon';
import Profile from '../../components/pages/more/Profile';
import SideButton from '../../components/pages/more/SideButton';
import InputContainer from '../../components/pages/more/InputContainer';
import { ProfileFormValues, profileSchema } from '../../types/InputSchema';
import Modal from '../../components/common/Modal/Modal';
import ModalBottomSheet from '../../components/common/Modal/ModalBottomSheet/ModalBottomSheet';
import BottomSheetMenu from '../../components/common/Modal/ModalBottomSheet/BottomSheetMenu';
import store from '../../stores/RootStore';
import {
  usePatchUserInfoMutation,
  usePutProfilePhotoMutation,
} from '../../hooks/queries/user.queries';
import { usePatchCoupleMutation } from '../../hooks/queries/couple.queries';
import PhotoScroll from '../../components/pages/gallery/PhotoScroll';
import {
  useCreatePhotosMutation,
  useGalleryList,
} from '../../hooks/queries/gallery.queries';
import DataContext from '../gallery/context';
import preventScroll from '../../util/utils';

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
    url: string | null;
    id: string | null;
  }>({
    url: store.userStore.user?.imageUrl ?? '',
    id: '',
  });

  const ctxValue = useMemo(() => {
    return {
      selectingAvailable: true,
      addToList: (photoId: string, photoUrl?: string) => {
        setProfilePhoto({ url: photoUrl ?? '', id: photoId });
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
  const { mutate: addPhoto } = useCreatePhotosMutation({ coupleId });

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
    putPorfilePhoto(profilePhoto.id);
    setOnCompleteModal(true);
  };

  const upLoadFile = async () => {
    const files = inputFileRef.current?.files;
    if (!files) return;

    addPhoto(files, {
      onSuccess: async (data) => {
        const pId = (await data[0]).photoId;
        setProfilePhoto({ url: URL.createObjectURL(files[0]), id: pId });
      },
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
        )}
        <div className="page-container with-topbar">
          <ProfileContainer>
            <Profile imgUrl={profilePhoto.url ?? ''} border={false} />
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
            {...register('nickname', { required: '애칭을 입력해주세요!' })}
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
          {onCompleteModal && (
            <Modal
              onModal={onCompleteModal}
              setOnModal={setOnCompleteModal}
              title="프로필 수정 성공🎉"
              description="프로필이 수정되었습니다."
              mainActionLabel="확인"
              onMainAction={() => navigate('/more')}
            />
          )}
          {onCancelModal && (
            <Modal
              onModal={onCancelModal}
              setOnModal={setOnCanelModal}
              title="프로필 수정 취소"
              description={'변경하신 내용이 취소됩니다.\n정말 나가시겠습니까?'}
              mainActionLabel="확인"
              onMainAction={() => navigate('/more')}
              subActionLabel="취소"
              onSubAction={() => setOnCanelModal(false)}
            />
          )}
          {onBottomSheet && (
            <ModalBottomSheet open={onBottomSheet} setOpen={setOnButtomSheet}>
              <input
                type="file"
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
                <Icon icon="IconGallery" themeColor="gray50" />앱 내 갤러리에서
                선택
              </BottomSheetMenu>
              <BottomSheetMenu
                onClick={() => {
                  setOnButtomSheet(false);
                  setProfilePhoto({ url: null, id: null });
                }}
              >
                <Icon icon="IconTrash" themeColor="gray50" />
                현재 사진 삭제
              </BottomSheetMenu>
            </ModalBottomSheet>
          )}
        </div>
      </StyledForm>
      {onPhotoScroll &&
        ReactDOM.createPortal(
          <>
            <Layer />
            <PhotoScroll
              photos={photos ?? []}
              leftLabel="취소"
              onLeftClick={() => setOnPhotoScroll(false)}
            />
          </>,
          document.getElementById('modal-root') as HTMLElement
        )}
    </DataContext.Provider>
  );
}
export default observer(ProfilePage);
