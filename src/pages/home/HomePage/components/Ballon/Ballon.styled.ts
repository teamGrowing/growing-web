import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
`;

export const Ballon = styled.div`
  display: flex;

  max-width: 240px;
  padding: 14px 20px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 0px 28px #00000004;
  border-radius: 20px;

  font-family: 'PretendardMedium';
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
  left: calc(50% - 16px);

  width: 8px;
  height: 8px;
  box-shadow: 1px 4px 10px #00000020;
`;

export const ResetButton = styled.button``;
