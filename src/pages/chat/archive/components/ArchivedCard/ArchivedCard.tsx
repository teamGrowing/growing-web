import React, { SetStateAction } from 'react';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import Icon from 'components/common/Icon/Icon';
import { ChattingArchivedDto } from 'models/chat';
import * as S from './ArchivedCard.styled';

type ArchivedCardDto = Pick<
  ChattingArchivedDto,
  'content' | 'writerName' | 'writedAt'
>;

interface ArchivedCardProps extends ArchivedCardDto {
  onClick: () => void;
  isSelected: boolean;
  isPopUp: boolean;
  setPopUpId: React.Dispatch<SetStateAction<string | null>>;
  idx: number;
}

const ArchivedCardLines = ({ n }: { n: number }) => {
  return (
    <S.Lines>
      {Array.from({ length: n < 21 ? 21 : n }, () => 0).map((v, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <S.Line key={i} />
      ))}
    </S.Lines>
  );
};

function ArchivedCard({
  onClick,
  isSelected,
  isPopUp,
  setPopUpId,
  idx,
  content,
  writerName,
  writedAt,
}: ArchivedCardProps) {
  return (
    <S.Outer onClick={onClick} isSelected={isSelected}>
      {isSelected && <S.Overlay />}

      <S.StyledDate className="text-gradient400">
        {dayjs(writedAt).format('YYYY.M.D')}
      </S.StyledDate>
      <S.StyledIcon>
        <Icon icon="IconComment" size={44} />
      </S.StyledIcon>

      <S.Inner isPopUp={false}>
        <ArchivedCardLines n={21} />

        <p>{writerName}이가</p>
        <S.StyledSpan isLong={!(idx % 2)}>{content}</S.StyledSpan>
        <p>라고 했다 🖤</p>
      </S.Inner>

      {isPopUp && (
        <S.PopUp
          onClick={(e) => {
            e.stopPropagation();
            setPopUpId(null);
          }}
        >
          <S.PopUpCardWrapper>
            <S.PopUpCard>
              <S.StyledDate className="text-gradient400">
                {dayjs(writedAt).format('YYYY.M.D')}
              </S.StyledDate>
              <S.StyledIcon>
                <Icon icon="IconComment" size={44} />
              </S.StyledIcon>

              <S.PopUpCardInner
                className="hidden-scrollbar"
                isPopUp={Math.floor(content.length / 12) > 22}
              >
                <ArchivedCardLines n={Math.floor(content.length / 12)} />

                <p>{writerName}이가</p>
                <span>{content}</span>
                <p>라고 했다 🖤</p>
              </S.PopUpCardInner>
            </S.PopUpCard>
          </S.PopUpCardWrapper>
        </S.PopUp>
      )}
    </S.Outer>
  );
}

export default observer(ArchivedCard);
