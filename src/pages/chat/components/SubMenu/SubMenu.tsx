import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import store from 'stores/RootStore';
import { useHasQuestionData } from 'hooks/queries';
import Icon from 'components/common/Icon/Icon';
import * as S from './SubMenu.styled';

function SubMenu({ open }: { open: boolean }) {
  const navigation = useNavigate();

  const { userStore } = store;
  const { data: isTodo } = useHasQuestionData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  return (
    <S.SubMenuContainer openEnvelope={open}>
      <S.Item onClick={() => navigation('/chat/question-box')}>
        <Icon icon="IconEnvelope" size={28} />
        {isTodo?.result && <S.Alarm />}
        질문 우편함
      </S.Item>
      <S.Item onClick={() => navigation('/chat/archive')}>
        <Icon icon="IconEnvelopePaper" size={28} />
        대화 보관함
      </S.Item>
      <S.Item onClick={() => navigation('/chat/photo-box')}>
        <Icon icon="IconGallery" size={28} />
        사진 모아보기
      </S.Item>
      {/* TODO */}
      {/* <S.Item onClick={() => navigation('/chat/voice-box')}>
        <Icon icon="IconVoice" size={28} />
        음성 모아보기
      </S.Item> */}
    </S.SubMenuContainer>
  );
}

export default observer(SubMenu);
