import React, { SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import Icon from '../../common/Icon/Icon';
import ArchivedCardLines from './ArchivedCardLines';
import { ChattingArchivedDto } from '../../../types/chat/ChattingArchived.dto';
import { clickPulse, pulse } from '../../../styles/common/keyframs';

const Outer = styled.div<{ isSelected: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;

  padding: 24px 12px 0;

  width: 100%;
  max-width: 220px;

  overflow: hidden;

  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  animation: ${(props) =>
    props.isSelected &&
    css`
      ${clickPulse} .2s linear
    `};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.3) 7.3%,
    rgba(234, 96, 96, 0.3) 100%
  );
  border-radius: 10px;
`;

const StyledDate = styled.p`
  font-family: 'PretendardLight';
  font-size: 12px;
`;

const StyledIcon = styled.div`
  z-index: 1;

  position: absolute;
  top: 14px;
  right: -11px;
`;

const Inner = styled.div<{ isPopUp: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (!props.isPopUp ? 'center' : 'flex-start')};
  align-items: center;

  padding: 12px 8px;

  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);
  font-size: 14px;

  p {
    z-index: 1;
    padding: 0 12px;
  }

  span {
    z-index: 1;
  }
`;

const StyledSpan = styled.span<{ isLong: boolean }>`
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.isLong ? 10 : 2)};
  -webkit-box-orient: vertical;
`;

const PopUp = styled.section`
  z-index: 11;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #00000040;
`;

const PopUpCardWrapper = styled.div`
  position: relative;
  z-index: 12;

  width: 66%;
  max-width: 300px;
  overflow-x: hidden;
  height: 46%;
  max-height: 400px;

  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  animation: 0.5s ${pulse};
`;

const PopUpCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;

  padding: 36px 20px 0;

  height: 100%;
  overflow-y: hidden;

  background: linear-gradient(
    130.11deg,
    rgba(252, 227, 138, 0.3) 7.3%,
    rgba(243, 129, 129, 0.3) 100%
  );
`;

const PopUpCardInner = styled(Inner)`
  padding: 18px 12px 50px;

  height: 100%;
  overflow-y: scroll;
`;

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
    <Outer onClick={onClick} isSelected={isSelected}>
      {isSelected && <Overlay />}

      <StyledDate className="text-gradient400">
        {dayjs(writedAt).format('YYYY.M.D')}
      </StyledDate>
      <StyledIcon>
        <Icon icon="IconComment" size={44} />
      </StyledIcon>

      <Inner isPopUp={false}>
        <ArchivedCardLines n={21} />

        <p>{writerName}이가</p>
        <StyledSpan isLong={!(idx % 2)}>{content}</StyledSpan>
        <p>라고 했다 🖤</p>
      </Inner>

      {isPopUp && (
        <PopUp
          onClick={(e) => {
            e.stopPropagation();
            setPopUpId(null);
          }}
        >
          <PopUpCardWrapper>
            <PopUpCard>
              <StyledDate className="text-gradient400">
                {dayjs(writedAt).format('YYYY.M.D')}
              </StyledDate>
              <StyledIcon>
                <Icon icon="IconComment" size={44} />
              </StyledIcon>

              <PopUpCardInner isPopUp={Math.floor(content.length / 12) > 22}>
                <ArchivedCardLines n={Math.floor(content.length / 12)} />

                <p>{writerName}이가</p>
                <span>{content}</span>
                <p>라고 했다 🖤</p>
              </PopUpCardInner>
            </PopUpCard>
          </PopUpCardWrapper>
        </PopUp>
      )}
    </Outer>
  );
}

export default observer(ArchivedCard);
