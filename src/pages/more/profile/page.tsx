import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useMemo } from 'react';
import { observer } from 'mobx-react';
import { yupResolver } from '@hookform/resolvers/yup';
import TopBar from 'components/common/TopBar/TopBar';
import Icon from 'components/common/Icon/Icon';
import Profile from 'pages/more/components/Profile/Profile';
import SideButton from 'pages/more/components/SideButton/SideButton';
import { ProfileFormValues, profileSchema } from 'libs/react-hook-form';
import Modal from 'components/common/Modal/Modal';
import ModalBottomSheet from 'components/common/ModalBottomSheet/ModalBottomSheet';
import BottomSheetMenu from 'components/common/BottomSheetMenu/BottomSheetMenu';
import store from 'stores/RootStore';
import {
  usePatchUserInfoMutation,
  usePutProfilePhotoMutation,
  usePatchCoupleMutation,
  useCreatePhotoMutation,
  useGetUploadUrl,
  useUploadPhotoMutation,
} from 'hooks/queries';
import useToast from 'hooks/common/useToast';
import PhotoScroll from 'pages/gallery/components/PhotoScroll/PhotoScroll';
import defaultProfile from 'assets/image/DefaultProfile.png';
import { MENT_MORE } from 'constants/ments';
import { getVideoDuration } from 'utils/video';
import DataContext from 'pages/gallery/context';
import * as S from './page.styled';
import LoadingContent from './components/LoadingContent';
import InputContainer from './components/InputContainer/InputContainer/InputContainer';

function ProfilePage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const { mutateAsync: patchUserInfo } = usePatchUserInfoMutation({ userId });
  const { mutateAsync: patchCoupleInfo } = usePatchCoupleMutation({ coupleId });
  const { mutateAsync: putProfilePhoto } = usePutProfilePhotoMutation({
    userId,
  });
  const { mutateAsync: getUploadUrl } = useGetUploadUrl({
    coupleId,
  });
  const { mutateAsync: createPhoto } = useCreatePhotoMutation({
    coupleId,
  });
  const { mutateAsync: uploadFileToUrl } = useUploadPhotoMutation();
  const { addToast } = useToast();

  const uploadPhoto = async () => {
    const { files } = profilePhoto;

    if (!files) return;
    const photoUploadPromises = [...files].map(async (file) => {
      const {
        data: { url, s3Path },
      } = await getUploadUrl(file);

      await uploadFileToUrl({ file, url });

      let fileTime = null;
      if (file.type.includes('video')) {
        fileTime = await getVideoDuration(file);
      }

      const photoInfo = await createPhoto({ s3Path, time: fileTime });
      return photoInfo.data.photoId;
    });

    await Promise.all(photoUploadPromises);
    await putProfilePhoto(profilePhoto.id);
  };

  const modifyProfile = async (data: {
    nickname: string;
    birthday: string;
    anniversary: string;
  }) => {
    try {
      setIsLoading(true);
      setOnCompleteModal(true);
      await patchUserInfo({
        nickName: data.nickname,
        birthDay: new Date(data.birthday),
      });
      await patchCoupleInfo({
        anniversaryDay: data.anniversary,
      });

      if (profilePhoto.isChange && profilePhoto.files) {
        await uploadPhoto();
      }
    } catch (e) {
      addToast(MENT_MORE.PROFILE_MODIFY_FAIL);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <DataContext.Provider value={ctxValue}>
      <S.Background />
      <S.StyledForm
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
                <S.StyledInput
                  type="submit"
                  value="완료"
                  className="text-gradient400"
                />
              }
            />
            <S.Container>
              <S.ProfileContainer>
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
              </S.ProfileContainer>
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
                title={
                  isLoading ? (
                    <LoadingContent />
                  ) : (
                    MENT_MORE.PROFILE_MODIFY_SUCCESS_TITLE
                  )
                }
                description={
                  isLoading ? '' : MENT_MORE.PROFILE_MODIFY_SUCCESS_DESC
                }
                mainActionLabel={isLoading ? '' : '확인'}
                onMainAction={isLoading ? () => {} : () => navigate('/more')}
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
                        isChange: true,
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
            </S.Container>
          </>
        )}
      </S.StyledForm>
      {onPhotoScroll && (
        <S.Container className="page-container">
          <S.Layer />
          <PhotoScroll
            leftLabel="취소"
            onLeftClick={() => setOnPhotoScroll(false)}
          />
        </S.Container>
      )}
    </DataContext.Provider>
  );
}
export default observer(ProfilePage);
