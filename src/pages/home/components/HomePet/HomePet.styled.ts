import styled from 'styled-components';
import EMOJI_SIZE from './HomePetConstants';

export const Ballon = styled.div`
  position: relative;

  display: flex;

  width: max-content;
  max-width: 240px;
  padding: 14px 20px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 1px 4px 28px #00000020;
  border-radius: 20px;

  font-family: 'PretendardRegular';
  color: ${({ theme }) => theme.color.gray700};
  font-size: 16px;
  text-align: center;
`;

export const BallonTail = styled.div`
  position: absolute;
  bottom: calc(-50% + 10px);

  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 1px 4px 14px #00000020;
  border-radius: 50%;
  opacity: 0.9;
`;

export const BallonTail2 = styled(BallonTail)`
  bottom: calc(-50% - 6px);
  left: 16px;

  width: 8px;
  height: 8px;
  box-shadow: 1px 4px 10px #00000020;
`;

export const PetContainer = styled.div`
  flex: 1.5;

  position: relative;
  left: 50%;
  transform: translate(-50%, 0);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  height: 50vh;
  padding: 0px 36px;
`;

export const PetLabel = styled.div`
  position: relative;
`;

export const PetName = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 14px;
  gap: 10px;

  width: max-content;
  max-width: calc(${EMOJI_SIZE}px - 30px);
  min-height: 33px;
  padding: 5px 14px;
  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.7) 7.3%,
    rgba(234, 96, 96, 0.7) 100%
  );
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  font-family: 'PretendardMedium';
  font-size: 19px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray50};
`;

export const Pin = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 50%;
`;

export const Row = styled.div`
  display: flex;
  gap: 24px;
`;

export const PetInfo = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
