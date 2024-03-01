import Skeleton from 'react-loading-skeleton';
import { ImgEmojiBear, ImgEmojiCat, ImgEmojiRabbit } from 'assets/image';
import { useEmojiData } from 'hooks/queries';
import store from 'stores/RootStore';
import * as S from './EmojiContolBar.styled';

interface Props {
  selectedIdx: number;
  onClick: (idx: number) => void;
}

const EmojiControlBar = ({ selectedIdx, onClick }: Props) => {
  const { userStore } = store;

  const { data: emojiPacks } = useEmojiData({
    userId: userStore.user?.id ?? '',
  });

  const getThumbnail = (name: string) => {
    switch (name) {
      case 'growing-bear':
        return ImgEmojiBear;
      case 'growing-cat':
        return ImgEmojiCat;
      case 'growing-rabbit':
        return ImgEmojiRabbit;
      default:
        return ImgEmojiBear;
    }
  };

  return (
    <>
      {emojiPacks?.map((emojiPack, idx) => (
        <S.StyledImg
          key={emojiPack.id}
          src={getThumbnail(emojiPack.name)}
          isActive={selectedIdx === idx}
          onClick={() => onClick(idx)}
        />
      ))}
    </>
  );
};

EmojiControlBar.Loading = () => {
  const skeletonArr = new Array(3).fill(null);

  return (
    <>
      {skeletonArr.map((_, idx) => (
        <Skeleton
          key={idx}
          width={32}
          height={32}
          baseColor="rgba(252, 227, 138, 0.2)"
          highlightColor=" rgba(243, 129, 129, 0.2)"
        />
      ))}
    </>
  );
};

EmojiControlBar.Error = () => {
  return <div style={{ height: '32px' }} />;
};

export default EmojiControlBar;
