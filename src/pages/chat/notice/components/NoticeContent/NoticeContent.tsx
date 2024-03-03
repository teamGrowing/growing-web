import { observer } from 'mobx-react';
import Skeleton from 'react-loading-skeleton';
import { FallbackProps } from 'react-error-boundary';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import store from 'stores/RootStore';
import { useChatNoticeData } from 'hooks/queries';
import * as S from './NoticeContent.styled';

const NoticeContent = () => {
  const { userStore } = store;

  const { data: notice } = useChatNoticeData({
    coupleId: userStore.user?.coupleId ?? '',
    options: {
      enabled: !!userStore.user?.coupleId,
    },
  });

  return (
    <>
      <S.Profile>
        <p className="text-gradient400">{notice?.announcer}</p>
      </S.Profile>
      <S.ChatWrapper>{notice?.content}</S.ChatWrapper>
    </>
  );
};

NoticeContent.Loading = () => {
  return (
    <>
      <S.Profile>
        <Skeleton width={50} height={16} />
      </S.Profile>
      <S.ChatWrapper>
        <Skeleton width={100} height={18} />
      </S.ChatWrapper>
    </>
  );
};

NoticeContent.Error = (props: FallbackProps) => {
  return (
    <BlockErrorFallback.Common containerStyle={{ height: '100%' }} {...props} />
  );
};

export default observer(NoticeContent);
