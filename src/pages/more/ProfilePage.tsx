import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import TopBar from '../../components/common/TopBar/TopBar';
import Icon from '../../components/common/Icon/Icon';
import Profile from '../../components/pages/more/Profile';
import SideButton from '../../components/pages/more/SideButton';
import InputContainer from '../../components/pages/more/InputContainer';
import { ProfileFormValues, profileSchema } from '../../types/InputSchema';
import PaddingContainer from '../../styles/common/layout';

const StyledForm = styled.form`
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  background-color: transparent;
`;
const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 60px 0;
`;

function ProfilePage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const nickname = '별이';
  const imgUrl = 'https://picsum.photos/id/237/200/300';
  const birthday = '1999-01-10';
  const anniversary = '2020-02-22';

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

  useEffect(() => {});
  return (
    <StyledForm
      onSubmit={handleSubmit((data) => {
        console.log(data);
        // TODO : 수정된 데이터 전송
        alert('수정되었습니다.');
      })}
      ref={formRef}
    >
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate('/more')}
        title="프로필 수정"
        rightMainNode={
          <StyledInput
            type="submit"
            value="완료"
            className="text-gradient400"
          />
        }
      />
      <PaddingContainer>
        <ProfileContainer>
          <Profile imgUrl={imgUrl} border={false} />
          <SideButton
            value="사진 수정"
            abLeft="calc(50% + 19px)"
            abTop="179px"
            onClick={() => {}} // TODO : 프로필 사진 수정
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
      </PaddingContainer>
    </StyledForm>
  );
}
export default ProfilePage;
