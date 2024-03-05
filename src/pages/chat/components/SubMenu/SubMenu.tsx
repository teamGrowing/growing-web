import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/common/Icon/Icon';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import * as S from './SubMenu.styled';
import QuestionAlarm from './QuestionAlarm';

function SubMenu({ open }: { open: boolean }) {
  const navigation = useNavigate();

  return (
    <S.SubMenuContainer openEnvelope={open}>
      <S.Item onClick={() => navigation('/chat/question-box')}>
        <Icon icon="IconEnvelope" size={28} />
        <BlockErrorBoundary fallbackComponent={() => null}>
          <Suspense>
            <QuestionAlarm />
          </Suspense>
        </BlockErrorBoundary>
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

export default SubMenu;
